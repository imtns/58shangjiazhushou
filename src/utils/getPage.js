const pages = require('./pages');

module.exports = function getPage(route, options) {
    return pages[route] || options.page || 'index';
};

