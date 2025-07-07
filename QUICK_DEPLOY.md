# Quick Deployment Guide

## 🚀 Deploy to NPM with `np`

### Option 1: Using `np` (Recommended)

```bash
# Make sure you're logged into NPM
npm login

# Publish using np (handles versioning, git tags, and publishing)
npm run publish:lib
```

### Option 2: Manual with np

```bash
# 1. Build the package
ng build ng-mat-period-picker --configuration production

# 2. Navigate to the built package
cd dist/ng-mat-period-picker

# 3. Publish with np
np
```

## ✅ Pre-Deployment Checklist

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `ng build ng-mat-period-picker --configuration production`
- [ ] You're logged into NPM: `npm whoami`
- [ ] Package name is available: `npm search ng-mat-period-picker`

## 📦 Package Information

- **Name**: `ng-mat-period-picker`
- **Version**: `0.1.0`
- **License**: MIT
- **Angular Version**: ^19.2.0 || ^20.0.0

## 🔗 After Deployment

1. **Test Installation**:

   ```bash
   npm install ng-mat-period-picker
   ```

2. **Create Git Tag**:

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **Verify on NPM**: https://www.npmjs.com/package/ng-mat-period-picker

## 🆘 Troubleshooting

- **"Package name exists"**: Use a scoped package like `@your-org/ng-mat-period-picker`
- **"Not logged in"**: Run `npm login`
- **"Build failed"**: Check for TypeScript errors with `npm test`

---

**Note**: This is the initial release. Future releases should follow semantic versioning.
