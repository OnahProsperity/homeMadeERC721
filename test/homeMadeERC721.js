const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploying HomeMadeERC721 Contract...", function () {

  let homeMade, owner, from, to, operator, pol;
  const polygon = "POLYGON NETWORK";
  beforeEach(async function () {
    const HomeMadeERC721 = await ethers.getContractFactory("mintHomeMadeERC721");
    homeMade = await HomeMadeERC721.deploy("Home Made ERC721", "HMERC721");
    await homeMade.deployed();
    [owner, from, to, operator, _] = await ethers.getSigners();
    pol = ethers.utils.formatBytes32String(polygon)
  });

  describe("It should read necessary functions from Home Made ERC721 Contract", function () {

    it("Should return name and symbol correctly", async function () {    
      console.log(homeMade.address, "Address")
      expect(await homeMade.name()).to.equal("Home Made ERC721");
      expect(await homeMade.symbol()).to.equal("HMERC721");
    });

    it("Should Mint successfully and Get Actual Balance", async function () {    
      await homeMade.mint(1);
      await homeMade.mint(2);
      const ownerBalance = await homeMade.balanceOf(owner.address);
      console.log( "Balance of owner increased", ownerBalance.toString(),"HMERC721")
      expect(ownerBalance).to.equal(2);
    });

    it("Should get the Owner of token ID", async function () {    
      await homeMade.mint(1);
      const tokenIDOwner = await homeMade.ownerOf(1);
      console.log( "tokenID owner is", tokenIDOwner.toString(),"HMERC721")
      expect(tokenIDOwner).to.equal(owner.address);
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

    it("Should burn token successfully", async function () {   
      console.log(to.address, "Minting......") 
      await homeMade.connect(to).mint(1);
      await homeMade.burn(1);
      const ownerBalance = await homeMade.balanceOf(to.address);
      console.log("balance of owner after burn is: ", ownerBalance.toString())
      expect(ownerBalance).to.equal(0);
    });


    it("Should be able to transferFrom `to` when approve", async function () {   
      console.log(to.address, "Minting......") 
      await homeMade.connect(to).mint(1);
      console.log("to address:", to.address, "approving", from.address);

      await homeMade.connect(to).approve(from.address, 1);
      const whoIsApproved = await homeMade.getApproved(1);

      expect(whoIsApproved).to.equal(from.address);
      const toBalanceBeforeTransfer = await homeMade.balanceOf(to.address);
      const fromInitialBalance = await homeMade.balanceOf(from.address);
      console.log( "Balance of to before transfer: ", toBalanceBeforeTransfer.toString(),"HMERC721")
      console.log("from initial balance is, ", fromInitialBalance.toString(), "before transferring from", to.address )
      console.log("From Address", from.address, "initiated a trasferFrom to", to.address)
      expect(fromInitialBalance).to.equal(0);

      await homeMade.connect(from).transferFrom(to.address, from.address,  1);

      const fromNewBalance = await homeMade.balanceOf(from.address);
      console.log("after from address, ", from.address, "transfer from", to.address, "new balance of from is: ",fromNewBalance.toString() )
      
      const toBalance = await homeMade.balanceOf(to.address);
      console.log( "Balance of to decrease to", toBalance.toString(),"HMERC721")
      expect(fromNewBalance).to.equal(1);
      expect(toBalance).to.equal(0);
    });

    it("Should be able to approve a token ID using permit", async function () {   
      const signature =
        "0x4782287f4d9c8da7b06c087ebebf48533255640246aed4422323bfa53df8262b1d0171f0ce105858d0595477a3fa6bf9b265de6d5db33cd97189254ee8eb81081b";
        var sig = ethers.utils.splitSignature(signature)
        await homeMade.connect(owner).mint(1);
        await homeMade.connect(to).permit(
          owner.address, 
          to.address, 
          1,
          sig.v, 
          sig.r, 
          sig.s
        )
        const getApprove = await homeMade.getApproved(1)
        expect(getApprove).to.equal(to.address);
    });

    it("Should be able to safeApprove for All using permit", async function () {   
      const signature =
        "0x658b96de5b51100dce70e8bde811d3bfdc75f4e924740ece41c96da5a47bdbe957b72511dc2461a1c9be61f6d041d45d326af5510d3ec70335f52ef149ff08911b";
        var sig = ethers.utils.splitSignature(signature)
        await homeMade.connect(owner).mint(1);
        await homeMade.connect(to).permitForAll(
          owner.address, 
          to.address, 
          true,
          sig.v, 
          sig.r, 
          sig.s
        )
        const getApprove = await homeMade.isApprovedForAll(owner.address, to.address)
        expect(getApprove).to.eq(true);
    });
  });

  describe('exists', async function () {
    it('verifies valid tokens', async function () {
      await homeMade.mint(1);
      const validToken = await homeMade.tokenURI(1);      
      expect(validToken.toString()).to.equal("ipfs://bafkreih6n5re2qqqwzvdl5jrgzhfmq6lm3qb7ska2vdwmub5sbgehmgpvm/1");
    });
  });

});
