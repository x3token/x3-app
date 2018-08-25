const X3Token = artifacts.require('./X3Token.sol')

module.exports = async deployer => {
  deployer.deploy(X3Token)
}
