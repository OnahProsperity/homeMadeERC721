const { expect } = require("chai");
const { ethers } = require("hardhat");
const { constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

describe("Deploying HomeMadeERC721 Contract and Emiting Events...", function () {

  let homeMade, owner, from, to, operator;
  beforeEach(async function () {
    const HomeMadeERC721 = await ethers.getContractFactory("mintHomeMadeERC721");
    homeMade = await HomeMadeERC721.deploy("Home Made ERC721", "HMERC721");
    await homeMade.deployed();
    [owner, from, to, operator, _] = await ethers.getSigners();
  });

  describe("Emitting Events rightly", function () {

    it('emits a Transfer event', async function () {
      const trxEvent = await homeMade.connect(from).mint(1);
      await expect(trxEvent)
        .to.emit(homeMade, 'Transfer')
        .withArgs(ZERO_ADDRESS, from.address, 1);
    });

    it('emits Approval event', async function () {
      await homeMade.connect(to).mint(1);
      const approveTRX = await homeMade.connect(to).approve(from.address, 1);
      await expect(approveTRX)
        .to.emit(homeMade, 'Approval')
        .withArgs(to.address, from.address, 1);
    });

    it('emits Approval for all event', async function () {
      await homeMade.connect(to).mint(1);
      const approveForAllTRX = await homeMade.connect(to).setApprovalForAll(from.address, true);
      await expect(approveForAllTRX)
        .to.emit(homeMade, 'ApprovalForAll')
        .withArgs(to.address, from.address, true);
    });

  });
});