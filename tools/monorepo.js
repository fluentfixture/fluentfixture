const fs = require('fs');
const path = require('path');

const getPackages = (root) => {
  return fs.readdirSync(path.join(root, 'packages'));
}

module.exports = {
  getPackages
};
