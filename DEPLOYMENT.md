# Deployment Guide for ng-mat-period-picker

This guide provides step-by-step instructions for deploying the `ng-mat-period-picker` package to NPM.

## Prerequisites

1. **NPM Account**: You need an NPM account with publish permissions
2. **Node.js**: Ensure you have Node.js installed (version 18 or higher recommended)
3. **Git**: Make sure your repository is properly set up and all changes are committed

## Pre-Deployment Checklist

### 1. Verify Package Configuration

Ensure the package is properly configured:

```bash
# Check the package.json in the library directory
cat projects/ng-mat-period-picker/package.json
```

Key things to verify:

- ✅ Version is set to `1.0.0` (or appropriate version)
- ✅ Name is `ng-mat-period-picker`
- ✅ Description and keywords are set
- ✅ Author and license are specified
- ✅ Repository URL is correct
- ✅ Peer dependencies include Angular Material and CDK

### 2. Build the Package

Build the library for production:

```bash
# Build the library
ng build ng-mat-period-picker --configuration production

# Verify the build output
ls -la dist/ng-mat-period-picker/
```

Expected output should include:

- `bundles/` - UMD bundles
- `esm2022/` - ES modules
- `fesm2022/` - Flat ES modules
- `index.d.ts` - TypeScript definitions
- `package.json` - Package manifest

### 3. Test the Build

Test that the built package works correctly:

```bash
# Run tests to ensure everything works
npm test

# Build the demo app to verify integration
ng build demo-app
```

### 4. Check NPM Login Status

Ensure you're logged into NPM:

```bash
# Check if you're logged in
npm whoami

# If not logged in, login
npm login
```

## Deployment Steps

### Option 1: Using `np` (Recommended)

The easiest way to deploy is using `np`, which handles versioning, git tags, and publishing:

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

### Option 2: Manual Steps

#### Step 1: Navigate to the Built Package

```bash
# Navigate to the built package directory
cd dist/ng-mat-period-picker
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
npm view ng-mat-period-picker

# Or visit: https://www.npmjs.com/package/ng-mat-period-picker
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
npm install ng-mat-period-picker

# Verify it's listed in package.json
cat package.json
```

### 2. Update Documentation

Update the README.md in the main repository to reflect the published version:

````markdown
## Installation

```bash
npm install ng-mat-period-picker
```
````

## Usage

```typescript
import { PeriodPickerComponent } from "ng-mat-period-picker";
```

````

### 3. Create a Release Tag

Create a Git tag for the release:

```bash
# From the project root
git tag v1.0.0
git push origin v1.0.0
````

## Troubleshooting

### Common Issues

1. **"Package name already exists"**
   - Check if the package name is available: `npm search ng-mat-period-picker`
   - Consider using a scoped package: `@your-org/ng-mat-period-picker`

2. **"You must be logged in"**
   - Run `npm login` and follow the prompts

3. **"Invalid package.json"**
   - Verify the package.json structure
   - Check for required fields (name, version, etc.)

4. **"Build failed"**
   - Run `npm test` to check for errors
   - Ensure all dependencies are installed: `npm install`

### Version Management

For future releases, update the version in `projects/ng-mat-period-picker/package.json`:

```json
{
  "version": "1.0.1" // or "1.1.0" for minor, "2.0.0" for major
}
```

## Automated Deployment (Optional)

For future deployments, you can create a deployment script:

```bash
#!/bin/bash
# deploy.sh

set -e

echo "Building package..."
ng build ng-mat-period-picker --configuration production

echo "Navigating to built package..."
cd dist/ng-mat-period-picker

echo "Publishing to NPM..."
npm publish

echo "Deployment complete!"
```

Make it executable:

```bash
chmod +x deploy.sh
```

## Package Information

- **Package Name**: `ng-mat-period-picker`
- **Current Version**: `0.1.0`
- **License**: MIT
- **Repository**: https://github.com/felixdulfer/ng-mat-period-picker
- **NPM URL**: https://www.npmjs.com/package/ng-mat-period-picker

## Support

If you encounter issues during deployment:

1. Check the [NPM documentation](https://docs.npmjs.com/)
2. Review the [Angular Package Format](https://angular.io/guide/angular-package-format)
3. Open an issue in the GitHub repository

---

**Note**: This is the initial release (v1.0.0). Future releases should include proper changelog management and semantic versioning.
