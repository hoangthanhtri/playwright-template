import fs from 'fs';
import path from 'path';

const baseFolder = path.resolve(process.argv[2] ?? './src');
const extensions = ['.ts', '.tsx'];
const targetDirs = new Set(['data', 'factories', 'helpers', 'utils', 'endpoints']);

function toNamespaceName(filename: string) {
  return filename.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, (c) => c.toLowerCase());
}

function generateIndex(dir: string) {
  const files = fs.readdirSync(dir);

  const exportLines = files
    .filter((file) => {
      const ext = path.extname(file);
      const fullPath = path.join(dir, file);
      const isFile = fs.statSync(fullPath).isFile();
      const isValidExt = extensions.includes(ext);
      const isIndex = file.startsWith('index.');
      const isTestFile = file.includes('.test.') || file.includes('.spec.') || file.includes('.setup.');
      return isFile && isValidExt && !isIndex && !isTestFile;
    })
    .map((file) => {
      const name = path.basename(file, path.extname(file));
      const alias = toNamespaceName(name);
      return `export * as ${alias} from './${name}';`;
    });

  if (exportLines.length) {
    const content = exportLines.join('\n') + '\n';
    fs.writeFileSync(path.join(dir, 'index.ts'), content);
    console.log(`- index.ts generated in ${dir}`);
  }
}

function walkAndFindTargetDirs(current: string) {
  const entries = fs.readdirSync(current);

  for (const entry of entries) {
    const fullPath = path.join(current, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      if (targetDirs.has(entry)) {
        generateIndex(fullPath);
      }
      walkAndFindTargetDirs(fullPath); // continue walking
    }
  }
}

walkAndFindTargetDirs(baseFolder);
