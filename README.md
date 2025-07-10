# `@felixdulfer/ngx-mat-period-picker`

> Material Period Picker for Angular

A modern Angular Material period picker component built with standalone components.

## 📦 Installation

```bash
npm install @felixdulfer/ngx-mat-period-picker
```

## 🚀 Quick Start

```typescript
import { PeriodPickerComponent } from "@felixdulfer/ngx-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [PeriodPickerComponent],
  template: `<ngx-mat-period-picker />`,
})
export class MyComponent {}
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, make sure you have a build of the lib:

```bash
npx -p @angular/cli@20 ng build @felixdulfer/ngx-mat-period-picker --watch
```

To run the demo app, run:

```bash
npx -p @angular/cli@20 ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
npx -p @angular/cli@20 ng build @felixdulfer/ngx-mat-period-picker
```

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npx ng test @felixdulfer/ngx-mat-period-picker --karma-config=karma.conf.js --browsers=Firefox
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
npx ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This ensures consistent commit history and enables automatic changelog generation.

### Making Commits

Use the interactive commit tool for guided commit creation:

```bash
npm run commit
```

Or commit manually following the conventional format:

```bash
git commit -m "feat(period-picker): add new feature"
```

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📚 Documentation

For detailed documentation, API reference, and examples, see the [library README](projects/ngx-mat-period-picker/README.md).

## 🚀 Live Demo

Try the component in your browser:

- [GitHub Pages Demo](https://felixdulfer.github.io/ngx-mat-period-picker/) (Coming Soon)
- [StackBlitz Demo](https://stackblitz.com/edit/angular-ngx-mat-period-picker-demo) (Coming Soon)
- [CodeSandbox Demo](https://codesandbox.io/s/angular-ngx-mat-period-picker-demo) (Coming Soon)

## 🚀 Deployment

For deployment instructions, see:

- [Quick Deployment Guide](QUICK_DEPLOY.md) - Fast deployment steps
- [Full Deployment Guide](DEPLOYMENT.md) - Comprehensive deployment instructions

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
