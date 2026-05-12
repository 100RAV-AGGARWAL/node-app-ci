import fs from 'node:fs';
import path from 'node:path';

const targetEnvironment = process.argv[2];

const envFileByEnvironment = {
  development: 'config/.env.development',
  test: 'config/.env.test',
  production: 'config/.env.production',
};

if (!targetEnvironment || !envFileByEnvironment[targetEnvironment]) {
  console.error(
    'Usage: node scripts/create-env-file.mjs <development|test|production>',
  );
  process.exit(1);
}

const templatePath = path.resolve('config/env.template.json');
const outputPath = path.resolve(envFileByEnvironment[targetEnvironment]);

const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
const githubVars = JSON.parse(process.env.GITHUB_VARS_JSON ?? '{}');

const placeholderRegex = /^\$\{([A-Z0-9_]+)(?::-(.*))?\}$/;

const environmentNodeEnv = {
  development: 'development',
  test: 'test',
  production: 'production',
};

const getVariableValue = (variableName) => {
  if (variableName === 'NODE_ENV') {
    return environmentNodeEnv[targetEnvironment];
  }

  return githubVars[variableName] ?? process.env[variableName];
};

const resolveTemplateValue = (templateValue, envKey) => {
  if (typeof templateValue !== 'string') {
    throw new Error(`Invalid template value for ${envKey}. Expected string.`);
  }

  const match = placeholderRegex.exec(templateValue);

  if (!match) {
    return templateValue;
  }

  const [, variableName, defaultValue] = match;
  const variableValue = getVariableValue(variableName);

  if (variableValue !== undefined && variableValue !== '') {
    return variableValue;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Missing required environment variable: ${variableName}`);
};

const envLines = Object.entries(template).map(([envKey, templateValue]) => {
  const value = resolveTemplateValue(templateValue, envKey);
  return `${envKey}=${value}`;
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${envLines.join('\n')}\n`);

console.log(`Created ${path.relative(process.cwd(), outputPath)}`);
