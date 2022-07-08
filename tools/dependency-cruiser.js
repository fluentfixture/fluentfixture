const FORBIDDEN_ACCESS_LIST = [
  ['shared', 'core'],
  ['shared', 'format'],
  ['format', 'core']
];

const createPackageAccessRule = (forbiddenAccessList) => {
  const rules = [];

  for (const accessList of forbiddenAccessList) {
    const from = accessList[0];
    const to = accessList[1];

    const rule = {
      name: `no-package-access-from-${from}-to-${to}`,
      severity: 'error',
      from: {
        path: `packages/${from}`,
      },
      to: {
        path: [`packages/${to}`]
      },
    };

    rules.push(rule);
  }

  return rules;
};

const addPackageAccessRules = (rules) => {
  rules.forbidden = [...rules.forbidden, ...createPackageAccessRule(FORBIDDEN_ACCESS_LIST)];
  return rules;
};

module.exports = {
  addPackageAccessRules
};
