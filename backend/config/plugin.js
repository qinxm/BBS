'use strict';

// had enabled by egg
// exports.static = true;
module.exports.mysql = {
    enable: true,
    package: 'egg-mysql',
  };

module.exports.cors = {
    enable: true,
    package: 'egg-cors',
};
module.exports.passport = {
    enable: true,
    package: 'egg-passport',
};
  
module.exports.passportGithub = {
    enable: true,
    package: 'egg-passport-github',
};