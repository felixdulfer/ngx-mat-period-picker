# Deployment Guide for ngx-mat-period-picker

This guide provides step-by-step instructions for deploying the `ngx-mat-period-picker` package to NPM.

## Prerequisites

1. **NPM Account**: You need an NPM account with publish permissions
2. **Node.js**: Ensure you have Node.js installed (version 18 or higher recommended)
3. **Git**: Make sure your repository is properly set up and all changes are committed

## Pre-Deployment Checklist

### 1. Verify Package Configuration

Ensure the package is properly configured:

```bash
# Check the package.json in the library directory
cat projects/ngx-mat-period-picker/package.json
```

Key things to verify:

- ✅ Version is set to the current version
- ✅ Name is `ngx-mat-period-picker`
- ✅ Description and keywords are set
- ✅ Author and license are specified
- ✅ Repository URL is correct
- ✅ Peer dependencies include Angular Material and CDK

### 2. Check Git Status

Ensure all changes are committed:

```bash
# Check for uncommitted changes
git status

# If there are uncommitted changes, commit them first
git add .
git commit -m "feat: your changes description"
```

### 3. Check NPM Login Status

Ensure you're logged into NPM:

```bash
# Check if you're logged in
npm whoami

# If not logged in, login
npm login
```

## Deployment Steps

### Option 1: Using the Automated Deploy Script (Recommended)

The easiest way to deploy is using the automated deploy script:

```bash
# From the project root
./deploy.sh [patch|minor|major]
```

**Parameters:**

- `patch` (default): For bug fixes and small changes
- `minor`: For new features (backward compatible)
- `major`: For breaking changes

**What the script does:**

1. ✅ Checks for uncommitted changes
2. ✅ Runs all tests
3. ✅ Builds the package for production
4. ✅ Updates version in package.json
5. ✅ Commits the version change
6. ✅ Publishes to NPM
7. ✅ Creates and pushes git tag
8. ✅ Pushes all changes to main branch

**Example usage:**

```bash
# Auto-detect bump type based on conventional commits
./deploy.sh

# Force a specific bump type
./deploy.sh minor
```

### Option 2: Using `np` (Alternative)

You can also use `np` for deployment:

```bash
# From the project root
npm run publish:lib
```

This will:

1. Build the package
2. Navigate to the built package
3. Run `np` which will:
   - Ask for the version bump (patch/minor/major)
   - Update version in package.json
   - Create git tag
   - Publish to NPM
   - Push git tag

### Option 3: Manual Steps

#### Step 1: Navigate to the Built Package

```bash
# Navigate to the built package directory
cd dist/ngx-mat-period-picker
```

#### Step 2: Verify Package Contents

```bash
# Check the package.json in the built directory
cat package.json

# List all files that will be published
ls -la
```

#### Step 3: Dry Run (Optional but Recommended)

Before publishing, you can do a dry run to see what would be published:

```bash
# Dry run to see what would be published
npm pack --dry-run
```

#### Step 4: Publish to NPM

```bash
# Publish the package
npm publish

# If this is a scoped package (e.g., @your-org/package-name), use:
# npm publish --access public
```

### Step 5: Verify Publication

After publishing, verify the package is available:

```bash
# Check the package on NPM
npm view ngx-mat-period-picker

# Or visit: https://www.npmjs.com/package/ngx-mat-period-picker
```

## Post-Deployment

### 1. Test Installation

Test that the package can be installed and used:

```bash
# Create a test directory
mkdir test-install
cd test-install

# Initialize a new Angular project
ng new test-app --standalone --routing=false --style=css --skip-git

# Install the published package
npm install ngx-mat-period-picker

# Verify it's listed in package.json
cat package.json
```

### 2. Update Documentation

Update the README.md in the main repository to reflect the published version:

````markdown
## Installation

```bash
npm install ngx-mat-period-picker
```
````

## Usage

```typescript
import { PeriodPickerComponent } from "ngx-mat-period-picker";
```

````

## Troubleshooting

### Common Issues

**1. Uncommitted Changes**
If the deploy script fails due to uncommitted changes:
```bash
# Commit your changes first
git add .
git commit -m "feat: your changes"
# Then run the deploy script again
./deploy.sh
```

**2. NPM Login Issues**
If you're not logged into NPM:
```bash
npm login
# Enter your username, password, and email
```

**3. Permission Issues**
If you get permission errors:
```bash
# Make sure the deploy script is executable
chmod +x deploy.sh
```

**4. Version Conflicts**
If the version already exists on NPM:
```bash
# Check current version
npm view ngx-mat-period-picker version
# Use a different bump type or manually update version
```

### Version Bumping Logic

The deploy script automatically determines the bump type based on conventional commits:

- **Major** (`!:` or `BREAKING CHANGE`): Breaking changes
- **Minor** (`feat:`): New features
- **Patch** (default): Bug fixes and other changes

You can also manually specify the bump type:
```bash
./deploy.sh major  # Force major version bump
./deploy.sh minor  # Force minor version bump
./deploy.sh patch  # Force patch version bump
```
````
