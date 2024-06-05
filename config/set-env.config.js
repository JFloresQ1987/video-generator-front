const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
const dotenv = require('dotenv');

dotenv.config();
const environment = argv.environment;

const writeFileUsingFs = (targetPath, environmentFileContent) => {
  writeFile(targetPath, environmentFileContent, (err) => {
    if (err) console.log(err);
    if (environmentFileContent !== '')
      console.log(`Wrote variables to ${targetPath}`);
  });
};

const envDirectory = './src/environments';
// CREATES THE `environments` DIRECTORY IF IT DOESN'T EXIST
if (!existsSync(envDirectory)) mkdirSync(envDirectory);
// CREATES THE `environment.prod.ts` AND `environment.ts` FILE IF IT DOESN'T EXIST
const envProductionPath = `${envDirectory}/environment.prod.ts`;
const envDevelopmentPath = `${envDirectory}/environment.ts`;
// const envProductionPath = `${envDirectory}/environment.ts`;
// const envDevelopmentPath = `${envDirectory}/environment.development.ts`;
writeFileUsingFs(envProductionPath, '');
writeFileUsingFs(envDevelopmentPath, '');

// CHECKS WHETHER COMMAND LINE ARGUMENT OF 'prod' WAS PROVIDED SIGNIFYING PRODUCTION MODE
const isProduction = environment === 'prod';
const environmentFileContent = `// This file was autogenerated by dynamically running setEnv.ts and using dotenv for managing API key secrecy
export const environment = {
  production: ${isProduction},
  apiURL: '${process.env.apiURL}',
  SUPABASE_URL: '${process.env.SUPABASE_URL}',
  SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY}',
  SUPABASE_SERVICE_ROLE_KEY: '${process.env.SUPABASE_SERVICE_ROLE_KEY}',
  RECAPTCHA_V3_STACKBLITZ_KEY: '${process.env.RECAPTCHA_V3_STACKBLITZ_KEY}',
  RECAPTCHA_V2_DUMMY_KEY: '${process.env.RECAPTCHA_V2_DUMMY_KEY}',
};
`;

// IT IS COPIED INTO BOTH FILES TO PREVENT THE COMPILER COMPLAINS
writeFileUsingFs(envProductionPath, environmentFileContent);
writeFileUsingFs(envDevelopmentPath, environmentFileContent);