const { addPackageAccessRules } = require('./tools/dependency-cruiser');

const dependencyRules = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'warn',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-orphans',
      severity: 'warn',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$',
          '\\.d\\.ts$',
          '(^|/)tsconfig\\.json$',
          '(^|/)(babel|webpack)\\.config\\.(js|cjs|mjs|ts|json)$',
        ],
      },
      to: {},
    },
    {
      name: 'no-deprecated-core',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'core',
        ],
        path: [
          '^(v8\/tools\/codemap)$',
          '^(v8\/tools\/consarray)$',
          '^(v8\/tools\/csvparser)$',
          '^(v8\/tools\/logreader)$',
          '^(v8\/tools\/profile_view)$',
          '^(v8\/tools\/profile)$',
          '^(v8\/tools\/SourceMap)$',
          '^(v8\/tools\/splaytree)$',
          '^(v8\/tools\/tickprocessor-driver)$',
          '^(v8\/tools\/tickprocessor)$',
          '^(node-inspect\/lib\/_inspect)$',
          '^(node-inspect\/lib\/internal\/inspect_client)$',
          '^(node-inspect\/lib\/internal\/inspect_repl)$',
          '^(async_hooks)$',
          '^(punycode)$',
          '^(domain)$',
          '^(constants)$',
          '^(sys)$',
          '^(_linklist)$',
          '^(_stream_wrap)$',
        ],
      },
    },
    {
      name: 'not-to-deprecated',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'deprecated',
        ],
      },
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      from: {},
      to: {
        dependencyTypes: [
          'npm-no-pkg',
          'npm-unknown',
        ],
      },
    },
    {
      name: 'not-to-unresolvable',
      severity: 'error',
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: 'no-duplicate-dep-types',
      severity: 'warn',
      from: {},
      to: {
        moreThanOneDependencyType: true,
      },
    },
    {
      name: 'not-to-spec',
      severity: 'error',
      from: {},
      to: {
        path: '\\.(spec|test)\\.(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee\\.md)$',
      },
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      from: {
        path: '^(packages)',
        pathNot: '\\.(spec|test)\\.(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee\\.md)$',
      },
      to: {
        dependencyTypes: [
          'npm-dev',
        ],
      },
    },
    {
      name: 'optional-deps-used',
      severity: 'info',
      from: {},
      to: {
        dependencyTypes: [
          'npm-optional',
        ],
      },
    },
    {
      name: 'peer-deps-used',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'npm-peer',
        ],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
      dependencyTypes: [
        'npm',
        'npm-dev',
        'npm-optional',
        'npm-peer',
        'npm-bundled',
        'npm-no-pkg',
      ],
    },
    combinedDependencies: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
      },
      archi: {
        collapsePattern: '^(packages|src|lib|app|bin|test(s?)|spec(s?))/[^/]+|node_modules/[^/]+',
      },
    },
  },
};

module.exports = addPackageAccessRules(dependencyRules);
