const { version } = require('../package.json');
const { writeFileSync } = require('fs');

const content = `export const APP_VERSION = '${version}';\n`;

writeFileSync('src/environments/version.ts', content);
console.log(`Versión ${version} escrita en src/environments/version.ts`);