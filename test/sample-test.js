const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("CuteLilTurtles", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Turtle = await ethers.getContractFactory("CuteLilTurtle");
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
    console.log(receipt.events);
    const tokenId = parseInt(receipt.events[0].topics[3]);
    assert.equal(tokenId, 1);
    console.log(`You've made your NFT! This is number ${tokenId}`);

    const tokenURI = await turtle.tokenURI(1);
    assert.equal(tokenURI, baseURL + "1.json");
    console.log(`Token URI is ${tokenURI}`);
  });
});
