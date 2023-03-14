// @ts-check
import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const blueprint = {
  symbol: "symbol",
  tokenId: 0,
  name: "name",
  host: "https://sbt-demo.vercel.app/api/metadata",
  rpcUrl: "https://rpc-mumbai.maticvigil.com",
  description: "Deployed using Shopify minting app",
  ownerAddress: "0xed76201FA41288942F986a144106E7Ba5a71CF47",
  privateKey:
    "76aa03e9864fe9c423849ad69bc583bb347ded388dd537b7eceb0332be5c7f6f",
};

const main = async () => {
  const provider = ethers.getDefaultProvider(blueprint.rpcUrl);
  const wallet = new ethers.Wallet(blueprint.privateKey, provider);
  const thirdWebSDK = ThirdwebSDK.fromPrivateKey(
    blueprint.privateKey,
    blueprint.rpcUrl
  );

  /**
   * Deploy ERC1155 contract to polygon Testnet
   */
  console.log(`🕘 Deploying contract to polygon testnet...`);
  const deployedContractAddress = await thirdWebSDK.deployer.deployEditionDrop({
    description: blueprint.description,
    primary_sale_recipient: blueprint.ownerAddress,
    symbol: blueprint.symbol,
    name: blueprint.name,
  });
  console.log(
    `✅ Successfully deployed contract with address ${deployedContractAddress}!`
  );

  /**
   * Instantiate the deployed contract
   */
  console.log(`🕘 Instantiating the deployed contract...`);
  const thirdWebContract = await thirdWebSDK.getContract(
    deployedContractAddress,
    "edition-drop"
  );
  const etherContract = new ethers.Contract(
    deployedContractAddress,
    thirdWebContract.abi,
    wallet
  );
  console.log(`✅ Successfully instantiated the deployed contract!`);

  /**
   * Set the contract URI
   */
  console.log(`🕘 Setting custom contract URI to ${blueprint.host}...`);
  const setContractUriResponse = await etherContract.setContractURI(
    `${blueprint.host}/${deployedContractAddress}`
  );
  await provider.getTransaction(setContractUriResponse.hash);
  console.log(`✅ Successfully set custom contract URI!`);

  /**
   * Lazy mint the token
   */
  console.log(`🕘 Lazy minting token #${blueprint.tokenId}...`);
  const lazyMintResponse = await etherContract.lazyMint(
    1,
    `${blueprint.host}/${deployedContractAddress}/`,
    []
  );
  const lazyMintTransactionResponse = await provider.getTransaction(
    lazyMintResponse.hash
  );
  console.log(`✅ Successfully lazy minted ${blueprint.tokenId}!`);

  /**
   * Set claim condition
   */
  console.log(`🕘 Setting claim condition...`);
  const publicSaleStartTime = new Date();
  const setClaimConditionsResponse = await thirdWebContract.claimConditions.set(
    blueprint.tokenId,
    [
      {
        price: 0,
        maxClaimablePerWallet: 1,
        startTime: publicSaleStartTime,
      },
    ]
  );

  await provider.getTransaction(
    setClaimConditionsResponse.receipt.transactionHash
  );
  console.log(`✅ Successfully set claim condition!`);

  /**
   * Claim genesis token
   */
  console.log(`🕘 Claiming genesis token...`);
  const claimGenesisTokenResponse = await thirdWebContract.claimTo(
    blueprint.ownerAddress,
    blueprint.tokenId,
    1
  );

  const claimGenesisTokenTransactionResponse = await provider.getTransaction(
    claimGenesisTokenResponse.receipt.transactionHash
  );
  const openseaUrl = `https://testnets.opensea.io/assets/mumbai/${deployedContractAddress}/${blueprint.tokenId}`;
  console.log(
    `✅ Successfully claimed genesis token! here is the URL: ${openseaUrl}`
  );
};

main();
