const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
    // Configure Angular `environment.ts` file path
    const targetPath = './src/environments/environment.ts';
    // Load node modules
    const colors = require('colors');
    const appVersion = require('../../package.json').version;
    require('dotenv').config({
        path: 'src/environments/.env'
    });
    // `environment.ts` file structure
    const envConfigFile = `export const environment = {
    TMDB_API_URL: '${process.env['TMDB_API_URL']}',
    TMDB_TOKEN: '${process.env['TMDB_TOKEN']}',
    API_URL: '${process.env['API_URL']}',
    production: true,
  };
  `;
    console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
    writeFile(targetPath, envConfigFile, (err: any) => {
        if (err) {
            console.error(err);
            throw err;
        } else {
            console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
        }
    });
};

setEnv();
// https://pazel.dev/how-to-keep-your-secrets-from-your-source-code-in-an-angular-project