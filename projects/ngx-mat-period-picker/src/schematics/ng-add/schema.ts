export interface Schema {
  /** Name of the project to add the library to */
  project?: string;
  /** Skip installing peer dependencies */
  skipInstall?: boolean;
}
