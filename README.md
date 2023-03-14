# SBT Demo

This repo shows how to create off-chain SBT (soul bound token) using thirdWeb SDK.

There are two endpoints to serve to the chain:

1. DOMAIN_NAME/api/metadata/:contractId
2. DOMAIN_NAME/api/metadata/:contractId/:tokenId

There is a `scripts/deploy.js` that does the following:

1. Deploys the smart contract
2. Sets custom URI of the contract to `DOMAIN_NAME/api/metadata/:contractId`
3. Lazy minting token with custom URI `DOMAIN_NAME/api/metadata/:contractId/:tokenId`
4. Sets claim condition to start claiming of NFTs
5. Disable transfer of NFTs to make them soul bound
6. Claims genesis token and shows the opensea link


## Getting Started

In order to run the script locally:

1. Add `type: "module"` to the `package.json`
2. Run `yarn deploy` in the terminal

Sample output looks like this

```shell
$ node ./scripts/deploy.js
🕘 Deploying contract to polygon testnet...
✅ Successfully deployed contract with address 0x30d4639A8FEE3b286c91F007632FB2F20E5243fF!
🕘 Instantiating the deployed contract...
✅ Successfully instantiated the deployed contract!
🕘 Setting custom contract URI to https://sbt-demo.vercel.app/api/metadata...
✅ Successfully set custom contract URI!
🕘 Lazy minting token #0...
✅ Successfully lazy minted 0!
🕘 Setting claim condition...
✅ Successfully set claim condition!
🕘 Disabling transfer role for all...
✅ Successfully disabled transfer role for all!
🕘 Claiming genesis token...
✅ Successfully claimed genesis token! here is the URL: https://testnets.opensea.io/assets/mumbai/0x30d4639A8FEE3b286c91F007632FB2F20E5243fF/0
✨  Done in 37.47s.
```