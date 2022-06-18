// SPDX-License-Identifier: MIT
import "./HomeMadeERC721.sol";

pragma solidity ^0.8.0;
contract mintHomeMadeERC721 is HomeMadeERC721{

    string public setBaseURI = "ipfs://bafkreih6n5re2qqqwzvdl5jrgzhfmq6lm3qb7ska2vdwmub5sbgehmgpvm/";

    constructor(string memory name_, string memory symbol_) HomeMadeERC721(name_, symbol_) {
        _setBaseURI(setBaseURI);
    }

    function mint(uint256 tokenID) external {
        _safeMint(_msgSender(), tokenID);
    }

    function burn(uint256 tokenID) external {
        _burn(tokenID);
    }
}