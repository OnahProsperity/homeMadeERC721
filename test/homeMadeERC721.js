const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploying HomeMadeERC721 Contract...", function () {

    let homeMade;
    beforeEach(async function () {
        const HomeMadeERC721 = await ethers.getContractFactory("HomeMadeERC721");
        homeMade = await HomeMadeERC721.deploy("Home Made ERC721", "HMERC721");
        await homeMade.deployed();
    });

  it("Should return name and symbol correctly", async function () {    
    console.log(homeMade.address, "Address")
    expect(await homeMade.name()).to.equal("Home Made ERC721");
    expect(await homeMade.symbol()).to.equal("HMERC721");
  });
  
});
