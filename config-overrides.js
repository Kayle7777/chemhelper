const rewireYAML = require('react-app-rewire-yaml');

module.exports = function(config, env) {
    config = rewireYAML(config, env);
    return config;
};
