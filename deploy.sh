#!/bin/bash

# Simple deployment script for @felixdulfer/ngx-mat-period-picker
# Usage: ./deploy.sh [patch|minor|major] (optional - will auto-detect if not provided)

set -e

PACKAGE_DIR="projects/ngx-mat-period-picker"

# Function to determine bump type from conventional commits
determine_bump_type() {
  # Use conventional-recommended-bump to determine the recommended bump type
  RECOMMENDED_BUMP=$(npx conventional-recommended-bump --preset angular)

  if [ -z "$RECOMMENDED_BUMP" ]; then
    echo "No conventional commits found, using patch bump"
    echo "patch"
    return
  fi

  echo "$RECOMMENDED_BUMP"
}

# Get bump type (auto-detect if not provided)
BUMP_TYPE=${1:-$(determine_bump_type)}

echo "Deploying @felixdulfer/ngx-mat-period-picker with $BUMP_TYPE bump..."

# Get current version and calculate new version
CURRENT_VERSION=$(grep '"version"' "$PACKAGE_DIR/package.json" | sed 's/.*"version": "\([^"]*\)".*/\1/')

if [ "$BUMP_TYPE" = "major" ]; then
  NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{print $1+1 ".0.0"}')
elif [ "$BUMP_TYPE" = "minor" ]; then
  NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{print $1 "." $2+1 ".0"}')
else
  NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{print $1 "." $2 "." $3+1}')
fi

echo "Current version: $CURRENT_VERSION"
echo "New version: $NEW_VERSION"

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo "Warning: There are uncommitted changes. Please commit them before deploying."
  echo "Uncommitted changes:"
  git status --porcelain
  read -p "Continue anyway? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
  fi
fi

# Run lint
echo "Running lint..."
npm run lint:lib
npm run lint:app

# Run unittests
echo "Running tests..."
npm run test:ci

# Update version in package.json first
echo "Updating version to $NEW_VERSION..."
sed -i.bak "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" "$PACKAGE_DIR/package.json"
rm -f "$PACKAGE_DIR/package.json.bak"

# Clean and rebuild package with new version
echo "Cleaning and rebuilding package..."
rm -rf dist
ng build ngx-mat-period-picker --configuration production

# Run e2e tests
echo "Running e2e tests..."
npm run test:e2e

# Commit the version change
echo "Committing version change..."
git add "$PACKAGE_DIR/package.json"
git commit -m "chore: bump version to $NEW_VERSION"

# Publish
echo "Publishing to NPM..."
cd dist/ngx-mat-period-picker
npm publish --access public

# Create git tag
cd ../..
echo "Creating git tag v$NEW_VERSION..."
git tag "v$NEW_VERSION"

# Push changes and tag
echo "Pushing changes and tag to origin..."
git push origin main
git push origin "v$NEW_VERSION"

# Generate changelog for current release only
echo "Generating changelog for current release..."
CHANGELOG=$(npx conventional-changelog --preset angular --release-count 1)

# Create GitHub release draft
echo "Creating GitHub release draft..."
RELEASE_TITLE="v$NEW_VERSION"

# Build release body with changelog
RELEASE_BODY="## 📦 Installation

\`\`\`bash
npm install @felixdulfer/ngx-mat-period-picker@$NEW_VERSION
\`\`\`

## 🚀 Usage

\`\`\`typescript
import { PeriodPickerComponent } from '@felixdulfer/ngx-mat-period-picker';
\`\`\`

## 📋 Changelog

$CHANGELOG"

# Create draft release using GitHub CLI
if command -v gh &>/dev/null; then
  echo "Using GitHub CLI to create release draft..."
  gh release create "v$NEW_VERSION" --draft --title "$RELEASE_TITLE" --notes "$RELEASE_BODY"
  echo "GitHub release draft created: https://github.com/felixdulfer/ngx-mat-period-picker/releases"
else
  echo "GitHub CLI not found. Please install it to create releases automatically."
  echo "You can create a release manually at: https://github.com/felixdulfer/ngx-mat-period-picker/releases/new"
  echo "Tag: v$NEW_VERSION"
  echo "Title: $RELEASE_TITLE"
  echo "Body: $RELEASE_BODY"
fi

echo "Deployment complete!"
echo "Version $NEW_VERSION has been published to NPM and tagged as v$NEW_VERSION"
