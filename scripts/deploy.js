// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Turtle = await hre.ethers.getContractFactory("CuteLilTurtle");
  const turtle = await Turtle.deploy();

  await turtle.deployed();

  console.log("Turtle deployed to:", turtle.address);

  const baseURL =
    "https://ipfs.io/ipfs/QmQWZM7t9MM9XpLb3hzJrMvmBVWaobZBjWXtPeEp124T79/";
  console.log("Setting base url: ", baseURL);
  await turtle.setBaseURI(baseURL);
  console.log("Base url set to: ", await turtle.baseURI());

  console.log("Let's create an NFT now!");
  const tx = await turtle.create({ gasLimit: 300000 });
  const receipt = await tx.wait(1);
  const tokenId = receipt.events[3].topics[2];
  console.log(`You've made your NFT! This is number ${tokenId}`);

  const hello = await turtle.tokenURI(1);
  console.log(hello);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
