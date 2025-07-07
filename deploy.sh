#!/bin/bash

# Simple deployment script for ng-mat-period-picker
# Usage: ./deploy.sh [patch|minor|major] (optional - will auto-detect if not provided)

set -e

PACKAGE_DIR="projects/ng-mat-period-picker"

# Function to determine bump type from conventional commits
determine_bump_type() {
  # Get the last tag
  LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")

  if [ -z "$LAST_TAG" ]; then
    echo "No previous tags found, using patch bump"
    echo "patch"
    return
  fi

  # Get commits since last tag
  COMMITS=$(git log --pretty=format:"%s" ${LAST_TAG}..HEAD)

  if [ -z "$COMMITS" ]; then
    echo "No commits since last tag, using patch bump"
    echo "patch"
    return
  fi

  # Check for breaking changes (major)
  if echo "$COMMITS" | grep -q "BREAKING CHANGE\|!:"; then
    echo "Found breaking changes, using major bump"
    echo "major"
    return
  fi

  # Check for features (minor)
  if echo "$COMMITS" | grep -q "^feat:"; then
    echo "Found features, using minor bump"
    echo "minor"
    return
  fi

  # Default to patch
  echo "Using patch bump"
  echo "patch"
}

# Get bump type (auto-detect if not provided)
BUMP_TYPE=${1:-$(determine_bump_type)}

echo "Deploying ng-mat-period-picker with $BUMP_TYPE bump..."

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

# Run tests
echo "Running tests..."
npm run test:ci

# Build package
echo "Building package..."
ng build ng-mat-period-picker --configuration production

# Update version
echo "Updating version to $NEW_VERSION..."
sed -i.bak "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" "$PACKAGE_DIR/package.json"
rm -f "$PACKAGE_DIR/package.json.bak"

# Publish
echo "Publishing to NPM..."
cd dist/ng-mat-period-picker
npm publish

# Create git tag
cd ../..
git tag "v$NEW_VERSION"

echo "Deployment complete! Don't forget to push the tag: git push origin v$NEW_VERSION"
