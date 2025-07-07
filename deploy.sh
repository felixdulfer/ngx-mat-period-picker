#!/bin/bash

# Deployment script for ng-mat-period-picker
# Usage: ./deploy.sh [version]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Check if version is provided
VERSION=${1:-1.0.0}
PACKAGE_DIR="projects/ng-mat-period-picker"
BUILD_DIR="dist/ng-mat-period-picker"

print_status "Starting deployment for ng-mat-period-picker v$VERSION"

# Step 1: Check prerequisites
print_status "Checking prerequisites..."

# Check if npm is installed
if ! command -v npm &>/dev/null; then
  print_error "npm is not installed. Please install Node.js and npm first."
  exit 1
fi

# Check if ng CLI is installed
if ! command -v ng &>/dev/null; then
  print_error "Angular CLI is not installed. Please install it first: npm install -g @angular/cli"
  exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "$PACKAGE_DIR" ]; then
  print_error "Please run this script from the project root directory."
  exit 1
fi

print_success "Prerequisites check passed"

# Step 2: Update version in package.json
print_status "Updating version to $VERSION..."
sed -i.bak "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" "$PACKAGE_DIR/package.json"
rm -f "$PACKAGE_DIR/package.json.bak"
print_success "Version updated to $VERSION"

# Step 3: Run tests
print_status "Running tests..."
if npm test; then
  print_success "Tests passed"
else
  print_error "Tests failed. Please fix the issues before deploying."
  exit 1
fi

# Step 4: Build the package
print_status "Building package..."
if ng build ng-mat-period-picker --configuration production; then
  print_success "Package built successfully"
else
  print_error "Build failed. Please check the errors above."
  exit 1
fi

# Step 5: Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
  print_error "Build directory not found. Build may have failed."
  exit 1
fi

# Step 6: Check NPM login status
print_status "Checking NPM login status..."
if npm whoami &>/dev/null; then
  print_success "Logged in as $(npm whoami)"
else
  print_warning "Not logged into NPM. Please run 'npm login' first."
  read -p "Do you want to login now? (y/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm login
  else
    print_error "Please login to NPM before continuing."
    exit 1
  fi
fi

# Step 7: Navigate to build directory and publish
print_status "Navigating to build directory..."
cd "$BUILD_DIR"

print_status "Verifying package contents..."
if [ ! -f "package.json" ]; then
  print_error "package.json not found in build directory"
  exit 1
fi

print_status "Package contents:"
ls -la

print_status "Performing dry run..."
if npm pack --dry-run; then
  print_success "Dry run successful"
else
  print_error "Dry run failed. Please check the package configuration."
  exit 1
fi

# Step 8: Confirm before publishing
echo
print_warning "About to publish ng-mat-period-picker v$VERSION to NPM"
read -p "Do you want to continue? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  print_status "Deployment cancelled"
  exit 0
fi

# Step 9: Publish to NPM
print_status "Publishing to NPM..."
if npm publish; then
  print_success "Package published successfully!"
  print_success "Package URL: https://www.npmjs.com/package/ng-mat-period-picker"
else
  print_error "Failed to publish package. Please check the error messages above."
  exit 1
fi

# Step 10: Return to project root and create git tag
cd - >/dev/null
print_status "Creating git tag v$VERSION..."
if git tag "v$VERSION"; then
  print_success "Git tag created: v$VERSION"
  print_status "Don't forget to push the tag: git push origin v$VERSION"
else
  print_warning "Failed to create git tag. You may need to create it manually."
fi

print_success "Deployment completed successfully!"
print_status "Next steps:"
echo "1. Push the git tag: git push origin v$VERSION"
echo "2. Test the installation: npm install ng-mat-period-picker"
echo "3. Update documentation if needed"
