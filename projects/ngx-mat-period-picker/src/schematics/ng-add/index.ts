import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Schema } from './schema';

/**
 * Adds the @felixdulfer/ngx-mat-period-picker package to the project.
 * This schematic will:
 * 1. Schedule package installation (ng add handles peer dependencies automatically)
 * 2. Display a success message with next steps
 */
export function ngAdd(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Schedule peer dependencies installation if not skipped
    if (!options.skipInstall) {
      context.addTask(new NodePackageInstallTask());
      context.logger.info('📦 Installing peer dependencies...');
    }

    // Log success message with usage instructions
    context.logger.info('✅ @felixdulfer/ngx-mat-period-picker has been added to your project!');
    context.logger.info('');
    context.logger.info('📚 Next steps:');
    context.logger.info('   1. Import the component in your standalone component or module:');
    context.logger.info('      import { PeriodPickerComponent } from "@felixdulfer/ngx-mat-period-picker";');
    context.logger.info('');
    context.logger.info('   2. Add it to your imports array:');
    context.logger.info('      @Component({');
    context.logger.info('        standalone: true,');
    context.logger.info('        imports: [PeriodPickerComponent],');
    context.logger.info('        ...');
    context.logger.info('      })');
    context.logger.info('');
    context.logger.info('   3. Use the component in your template:');
    context.logger.info('      <ngx-mat-period-picker [(ngModel)]="period" />');
    context.logger.info('');
    context.logger.info('📖 For more information, visit:');
    context.logger.info('   https://github.com/felixdulfer/ngx-mat-period-picker#readme');
    context.logger.info('');

    return tree;
  };
}
