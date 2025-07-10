#!/bin/bash

# Simple deployment script for @felixdulfer/ngx-mat-period-picker
# Usage: ./deploy.sh [patch|minor|major] (optional - will auto-detect if not provided)

set -e

PACKAGE_DIR="projects/ngx-mat-period-picker"

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

# Run tests
echo "Running tests..."
npm run test:ci

# Build package
echo "Building package..."
ng build ngx-mat-period-picker --configuration production

# Update version in package.json
echo "Updating version to $NEW_VERSION..."
sed -i.bak "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" "$PACKAGE_DIR/package.json"
rm -f "$PACKAGE_DIR/package.json.bak"

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

echo "Deployment complete!"
echo "Version $NEW_VERSION has been published to NPM and tagged as v$NEW_VERSION"
