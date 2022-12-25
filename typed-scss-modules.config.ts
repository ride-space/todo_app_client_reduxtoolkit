export const config = {
  additionalData: `@use "src/styles/variables.scss" as *;`,
  exportType: 'default',
  ignore: ['**/variables.scss', '**/variables/**'],
  implementation: 'sass',
  nameFormat: 'none',
};
