const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploying HomeMadeERC721 Contract...", function () {

  let homeMade, owner, from, to, operator;
  beforeEach(async function () {
    const HomeMadeERC721 = await ethers.getContractFactory("mintHomeMadeERC721");
    homeMade = await HomeMadeERC721.deploy("Home Made ERC721", "HMERC721");
    await homeMade.deployed();
    [owner, from, to, operator, _] = await ethers.getSigners();
  });

  describe("It should read necessary functions from Home Made ERC721 Contract", function () {

    it("Should return name and symbol correctly", async function () {    
      console.log(homeMade.address, "Address")
      expect(await homeMade.name()).to.equal("Home Made ERC721");
      expect(await homeMade.symbol()).to.equal("HMERC721");
    });

    it("Should Mint successfully and Get Actual Balance", async function () {    
      await homeMade.mint(1);
      const ownerBalance = await homeMade.balanceOf(owner.address);
      console.log( "Balance of owner increased", ownerBalance.toString(),"HMERC721")
      expect(ownerBalance).to.equal(1);
    });

    it("Should get correct owner of token ID", async function () {    
      await homeMade.mint(1);
      const ownerOfTokenID = await homeMade.ownerOf(1);
      console.log( "Owner of Token ID is: ", ownerOfTokenID.toString())
      expect(ownerOfTokenID).to.equal(owner.address);
    });

    it("Should get correct token URI of an ID", async function () {    
      await homeMade.mint(1);
      const hashOfID = await homeMade.tokenURI(1);
      const setURI = await homeMade.setBaseURI();
      const hash = setURI.toString()
      console.log( "Owner of Token ID is: ", hashOfID.toString())
      console.log( "set URI: ", hash)
    });
  });

  describe('EIP-165 support', async function () {
    it('supports ERC165', async function () {
      expect(await homeMade.supportsInterface('0x01ffc9a7')).to.eq(true);
    });

    it('supports IERC721', async function () {
      expect(await homeMade.supportsInterface('0x80ac58cd')).to.eq(true);
    });

    it('supports ERC721Metadata', async function () {
      expect(await homeMade.supportsInterface('0x5b5e139f')).to.eq(true);
    });

    it('does not support ERC721Enumerable', async function () {
      expect(await homeMade.supportsInterface('0x780e9d63')).to.eq(false);
    });

    it('does not support random interface', async function () {
      expect(await homeMade.supportsInterface('0x00000042')).to.eq(false);
    });
  });

  describe("Write functionality to Home Made ERC721 Contract", function () {

    it("Should be able to transfer HMERC721 from one acount to the other", async function () {    
      await homeMade.connect(from).mint(1);
      const fromBalance = await homeMade.balanceOf(from.address);
      console.log( "Balance of from increased", fromBalance.toString(),"HMERC721")
      console.log("From Address", from.address, "initiated a trasfer to", to.address)
      expect(fromBalance).to.equal(1);
      await homeMade.connect(from).safeTransfer(to.address, 1);
      const fromNewBalance = await homeMade.balanceOf(from.address);
      console.log("after from address, ", from.address, "transfer", fromBalance.toString(), "to to address:", to.address, "new balance of from is: ",fromNewBalance.toString() )
      const toBalance = await homeMade.balanceOf(to.address);
      console.log( "Balance of to increased", toBalance.toString(),"HMERC721")
      expect(fromNewBalance).to.equal(0);
      expect(toBalance).to.equal(1);
    });

    // it("Should revert when owner doesn't have enough balance", async function () {    
    //   // await homeMade.connect(from).mint(1);
    //   const fromBalance = await homeMade.balanceOf(from.address);
    //   console.log( "Balance of from increased", fromBalance.toString(),"HMERC721")

    //   console.log("From Address", from.address, "initiated a trasfer to", to.address)
    //   expect(fromBalance).to.equal(1);
    //   await homeMade.connect(from).safeTransfer(to.address, 1);
    //   const fromNewBalance = await homeMade.balanceOf(from.address);
    //   console.log("after from address, ", from.address, "transfer", fromBalance.toString(), "to to address:", to.address, "new balance of from is: ",fromNewBalance.toString() )
    //   const toBalance = await homeMade.balanceOf(to.address);
    //   console.log( "Balance of to increased", toBalance.toString(),"HMERC721")
    //   expect(fromNewBalance).to.equal(0);
    //   expect(toBalance).to.equal(1);
    // });

  });

});
