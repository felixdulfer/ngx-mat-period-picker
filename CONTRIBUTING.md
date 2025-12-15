# Contributing

## Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scopes

For this Angular library project, common scopes include:

- `period-picker`: Changes to the main period picker component
- `service`: Changes to the period picker service
- `deps`: Dependency updates
- `docs`: Documentation changes

### Examples

**Feature:**

```
feat(period-picker): add year/month grid UI
```

**Bug Fix:**

```
fix(period-picker): correct month deselection logic
```

**Documentation:**

```
docs: update README with usage examples
```

**Breaking Change:**

```
feat(period-picker): change API to use Date objects

BREAKING CHANGE: The period picker now expects Date objects instead of strings
```

**With Body:**

```
feat(period-picker): add custom date range validation

Add validation to ensure start date is before end date
and provide user-friendly error messages.
```

### Making Commits

You can use the interactive commit tool:

```bash
pnpm run commit
```

Or commit manually following the conventional format:

```bash
git commit -m "feat(period-picker): add new feature"
```

### Validation

All commit messages are automatically validated using commitlint. Invalid commit messages will be rejected.

### Breaking Changes

When introducing breaking changes, include `BREAKING CHANGE:` in the commit body or footer, followed by a description of the change.
