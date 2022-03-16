const { getPackages } = require('./monorepo');

const createPackageAccessRule = (target, packages) => {
  const rule = {
    name: `no-package-access-from-${target}`,
    severity: 'error',
    from: {
      path: `^(packages)/${target}`,
    },
    to: {
      path: [],
      pathNot: [],
    },
  };

  for (const name of packages) {
    if (name !== target) {
      rule.to.path.push(`^(packages)/${name}`);
      rule.to.pathNot.push(`^(packages)/${name}/index.ts`);
    }
  }

  return rule;
};

const addPackageAccessRules = (root, rules) => {
  const packages = getPackages(root);
  const packageAccessRules = packages.map((p) => createPackageAccessRule(p, packages));
  rules.forbidden = [...rules.forbidden, ...packageAccessRules];
  return rules;
};

module.exports = {
  addPackageAccessRules
};
