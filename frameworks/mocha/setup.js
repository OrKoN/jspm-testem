/* globals mocha */

export default (opts) => {
  mocha.setup(opts);
  return Promise.resolve();
};
