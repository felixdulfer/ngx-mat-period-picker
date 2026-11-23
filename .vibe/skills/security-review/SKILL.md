---
name: security-review
description: Load this skill when reviewing dependency and supply-chain security in this repo — auditing changes to package.json, pnpm-lock.yaml, .npmrc, or .github/workflows (including Dependabot PRs), running pnpm audit, assessing newly added or bumped packages, checking pnpm overrides for stale or unsafe pins, and evaluating the published package's peer dependency ranges. Produces a severity-rated findings report (Critical/High/Medium/Low) with file:line references and suggested fixes.
---

# Security Review — Dependency Audit

This repo is an Angular component library (`@felixdulfer/ngx-mat-period-picker`) managed with **pnpm 9** (`packageManager: pnpm@9.0.0`). Use `pnpm`, never `npm`/`npx`, for registry queries and audits. The review is **read-only**: never run `pnpm add`/`update`/`install --no-frozen-lockfile` to "fix" something — report the fix instead.

## Repo facts that shape the review

- Root `package.json` holds all deps plus two override blocks: top-level `overrides` (npm-style) and `pnpm.overrides` (pnpm-native). Both are security-relevant.
- The **published** package is `projects/ngx-mat-period-picker/package.json`. Its only runtime `dependency` is `tslib`; the Angular packages are `peerDependencies`, so their semver ranges decide which Angular versions consumers can install.
- `.npmrc` sets `shamefully-hoist=false` (good — blocks phantom dependencies). Flag any added registry URL or auth token.
- Dependabot is enabled for npm and GitHub Actions (`.github/dependabot.yml`), so expect many dependency-bump PRs — verify each one.
- Workflows under review: `ci.yml`, `deploy-demo.yml`, `pr-preview.yml`, `release.yml`.

## Workflow

1. **Scope the change.** PR/diff under review:
   `git diff <base>...HEAD -- package.json pnpm-lock.yaml .npmrc .github/ projects/ngx-mat-period-picker/package.json`
   For a full audit, review the whole repo state.
2. **Run the audit.** `pnpm audit --json` (add `--prod` to focus on production deps). Exit code 1 just means advisories exist — parse the JSON (`metadata.vulnerabilities`, `advisories`) instead of treating it as a command failure. Use `pnpm why <pkg>` to decide whether a vulnerable package is reachable from the published library or only from dev tooling.
3. **Inspect new or bumped dependencies** (from the diff, or `pnpm outdated` for drift):
   - Typosquatting / lookalike package names.
   - `pnpm view <pkg> time.modified dist-tags.latest` — abandoned packages, or packages published hours ago, deserve extra scrutiny.
   - `pnpm view <pkg> scripts` — flag `preinstall`/`install`/`postinstall`, especially on transitive deps.
   - `pnpm view <pkg> license`.
   - Lockfile hygiene: `pnpm-lock.yaml` changes must match `package.json` changes exactly — no hand-edits, no unexpected `integrity`/`resolution` rewrites, no `link:`/`file:` deps pointing outside the repo.
4. **Audit the overrides.** For each entry in `pnpm.overrides` and top-level `overrides`:
   - Does the pinned range actually include a *fixed* version (cross-check the advisory's patched versions)?
   - Is the override still needed, or is it stale?
   - An override must never pin *below* a fixed version.
5. **Check the published package's peer ranges** (`projects/ngx-mat-period-picker/package.json`): ranges must not admit known-vulnerable Angular/CDK/Material versions, and must not be widened in a diff without justification.
6. **Check CI workflows** for supply-chain issues: third-party actions not pinned to a full commit SHA, `pull_request_target` combined with checking out PR code and access to secrets, installs in PR-triggered workflows without a frozen lockfile.
7. **Check `.npmrc`**: no committed registry redirection or `:_authToken`.

## Severity rubric

| Severity | Meaning |
|---|---|
| Critical | Exploitable vulnerability in a dependency consumers install/run, or in CI with secrets access; leaked credential; malicious package or install script; lockfile tampering |
| High | High-severity advisory in a direct dependency; override pinning below a fixed version; unpinned third-party action in a workflow with write/secrets access |
| Medium | Advisory only in devDependencies/CI tooling; peer range admits vulnerable versions; stale override masking risk; brand-new or abandoned package with install scripts |
| Low | Hygiene: dependency bump without review note, outdated-but-not-vulnerable deps, missing lockfile verification step |

## Report format

Finish with a severity-rated summary table, highest severity first:

| Severity | Finding | Location | Evidence | Suggested fix |
|---|---|---|---|---|
| High | … | `package.json:12` | GHSA-… | bump to x.y.z / add override |

Then 2–4 sentences of overall assessment ("safe to merge" / "block until …").

## Gotchas

- `pnpm audit` exits non-zero whenever advisories exist — always use `--json` and parse.
- Separate consumer-facing risk (published lib `dependencies` + peer ranges) from CI/local-only risk (`devDependencies`).
- Dependabot PRs: confirm the bump lands on a version ≥ the advisory's patched version and that the PR's advisory actually concerns that package.
- If the diff touches `pnpm-lock.yaml` without a matching `package.json` change, treat as High until explained.
