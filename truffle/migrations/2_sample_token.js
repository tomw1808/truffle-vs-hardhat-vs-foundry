const SampleToken = artifacts.require("SampleToken");

module.exports = function (deployer) {
  deployer.deploy(SampleToken, "Sample Token", "TOK", 10000000);
};
