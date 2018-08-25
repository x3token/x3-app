const Migrations = artifacts.require('./Migrations.sol')
const X3Token = artifacts.require('./X3Token.sol')

module.exports = async deployer => {
  deployer.deploy(Migrations)
  deployer.deploy(X3Token)
}
