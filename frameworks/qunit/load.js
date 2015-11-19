/* globals System, QUnit, Promise */

export default () => {
  return System
    .import('qunit')
    .then(() => {
      QUnit.config.autostart = false;
    });
};
