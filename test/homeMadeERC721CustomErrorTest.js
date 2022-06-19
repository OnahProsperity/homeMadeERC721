const { expect } = require("chai");
const { ethers } = require("hardhat");
const { constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

describe("Deploying HomeMadeERC721 Contract Test Custom Error...", function () {

  let homeMade, owner, from, to;
  beforeEach(async function () {
    const HomeMadeERC721 = await ethers.getContractFactory("mintHomeMadeERC721");
    homeMade = await HomeMadeERC721.deploy("Home Made ERC721", "HMERC721");
    await homeMade.deployed();
    [owner, from, to, _] = await ethers.getSigners();
  });

  describe("Write functionality to Home Made ERC721 Contract Revert", function () {

    it("Should revert when owner doesn't have enough balance", async function () {    
      const fromBalance = await homeMade.balanceOf(from.address);
      console.log( "Balance of from is: ", fromBalance.toString(),"HMERC721")
      console.log("From Address", from.address, "initiated a trasfer to", to.address)
      expect(fromBalance).to.equal(0);
      console.log("from: ", from.address, "Initiating a transfer of ID or 1 to: ", to.address, "it expected to revert")

      await expect(homeMade.connect(from).safeTransfer(to.address, 1)).to.be.revertedWith(
        'nonexistent'
      );

      const fromNewBalance = await homeMade.balanceOf(from.address);
      console.log("after from address, ", from.address, "tried transfering 1", "to to address:", to.address, "and it failed", "new balance of from is: ",fromNewBalance.toString() )
      const toBalance = await homeMade.balanceOf(to.address);
      console.log( "Balance of to remains", toBalance.toString(),"HMERC721")
      expect(fromNewBalance).to.equal(0);
      expect(toBalance).to.equal(0);
    });

    it("Should Revert when Token ID that has been minted want to be minted again", async function () {    
      await homeMade.mint(1);
      await expect(homeMade.mint(1)).to.be.revertedWith(
        'alreadyMinted'
      );
      const ownerBalance = await homeMade.balanceOf(owner.address);
      console.log( "Balance of owner increased", ownerBalance.toString(),"HMERC721")
      expect(ownerBalance).to.equal(1);
    });

    it("Should revert when `from` tries to transfer from `to` when not approve", async function () {   
        console.log(to.address, "Minting......") 
        await homeMade.connect(to).mint(1);
        const to_Balance = await homeMade.balanceOf(to.address);
        expect(to_Balance).to.equal(1);
        const fromBalance = await homeMade.balanceOf(from.address);

        console.log( "Balance of to transfer: ", to_Balance.toString(),"HMERC721")
        console.log("from balance is, ", fromBalance.toString(), "before initiating transfer from", to.address )
        console.log("From Address", from.address, "initiated a trasferFrom to", to.address)
        expect(fromBalance).to.equal(0);

        await expect(homeMade.connect(from).transferFrom(to.address, from.address,  1)).to.be.revertedWith(
            'notApproved'
        );

        const fromNewBalance = await homeMade.balanceOf(from.address);
        console.log("after from address, ", from.address, "tried transferring from", to.address, "and it revert, balance remain: ",fromNewBalance.toString() )
        
        const toBalance = await homeMade.balanceOf(to.address);
        console.log( "Balance of to decrease to", toBalance.toString(),"HMERC721")

        expect(fromNewBalance).to.equal(0);
        expect(toBalance).to.equal(1);
    });

    it("Should revert when transferring to contract address", async function () {   
      console.log(to.address, "Minting......") 
      await homeMade.connect(to).mint(1);
      const to_Balance = await homeMade.balanceOf(to.address);
      expect(to_Balance).to.equal(1);
      const contractBalance = await homeMade.balanceOf(homeMade.address);

      console.log( "Balance of to transfer: ", to_Balance.toString(),"HMERC721")
      console.log("contract address balance is, ", contractBalance.toString(), "before", to.address, "tries transfer in to it." )
      console.log("From Address", homeMade.address, "initiated a trasferFrom to", to.address)
      expect(contractBalance).to.equal(0);

      await expect(homeMade.connect(to).safeTransfer(homeMade.address, 1)).to.be.revertedWith(
          'NonReceiver_Implementer'
      );

      const ContractNewBalance = await homeMade.balanceOf(homeMade.address);
      console.log("after to address, ", to.address, "tried transferring to", homeMade.address, "and it revert, balance remain: ",ContractNewBalance.toString() )
      
      const toBalance = await homeMade.balanceOf(to.address);
      console.log( "Balance of to decrease to", toBalance.toString(),"HMERC721")

      expect(ContractNewBalance).to.equal(0);
      expect(toBalance).to.equal(1);
    });

    it("Should revert when checking ZERO_ADDRESS balance", async function () {   
      await expect(homeMade.balanceOf(ZERO_ADDRESS)).to.be.revertedWith(
        'zeroAddress'
    );
    });

    it("Should revert when approving self", async function () {   
      console.log(to.address, "Minting......") 
      await homeMade.connect(to).mint(1);

      await expect(homeMade.connect(to).approve(to.address, 1)).to.be.revertedWith(
          'selfApproval'
      );
    });

    it("Should revert when approving a token ID that is not yours self", async function () {   
      console.log(to.address, "Minting......") 
      await homeMade.connect(to).mint(1);

      await expect(homeMade.connect(to).approve(from.address, 2)).to.be.revertedWith(
          'nonexistent'
      );
    });

    it("Should revert with noneexistence for invalid token", async function () {   
      console.log(to.address, "Minting......") 
      await homeMade.connect(to).mint(1);

      await expect(homeMade.connect(to).getApproved(2)).to.be.revertedWith(
          'nonexistentToken'
      );
    });

    it("Should revert when approving a token ID that is not yours self", async function () {   
      console.log(to.address, "Minting......") 
      await homeMade.connect(to).mint(1);
      await homeMade.connect(to).mint(2);

      await expect(homeMade.connect(owner).approve(from.address, 2)).to.be.revertedWith(
          'notAllow'
      );
    });

    it("Should revert with invalid signature on approving token ID", async function () {   
      const signature =
        "0x5782287f4d9c8da7b06c087ebebf48533255640246aed4422323bfa53df8262b1d0171f0ce105858d0595477a3fa6bf9b265de6d5db33cd97189254ee8eb81081b";
        var sig = ethers.utils.splitSignature(signature)
        await homeMade.connect(owner).mint(1);
        await expect(homeMade.connect(to).permit(
          owner.address, 
          to.address, 
          1,
          sig.v, 
          sig.r, 
          sig.s
        )).to.be.revertedWith(
            'invalidPermit'
        );
        const getApprove = await homeMade.getApproved(1)
        expect(getApprove).to.equal(ZERO_ADDRESS);
    });

    it("Should revert with invalid signature on approving Permit for all", async function () {   
      const signature =
        "0x5782287f4d9c8da7b06c087ebebf48533255640246aed4422323bfa53df8262b1d0171f0ce105858d0595477a3fa6bf9b265de6d5db33cd97189254ee8eb81081b";
        var sig = ethers.utils.splitSignature(signature)
        await homeMade.connect(owner).mint(1);
        await expect(homeMade.connect(to).permitForAll(
          owner.address, 
          to.address, 
          true,
          sig.v, 
          sig.r, 
          sig.s
        )).to.be.revertedWith(
            'invalidPermit'
        );
        const getApprove = await homeMade.isApprovedForAll(owner.address, to.address)
        expect(getApprove).to.eq(false);
    });

    it("Should revert when try to burn an invalid token", async function () {   
      await homeMade.connect(to).mint(1);

      await expect(homeMade.connect(owner).burn(2)).to.be.revertedWith(
          'nonexistent'
      );
    });
  });

  describe('Does Not exists', async function () {
    it('verifies Invalid tokens', async function () {
      await expect(homeMade.tokenURI(1)).to.be.revertedWith(
        'URINonexistent'
      );
    });
  });

});
