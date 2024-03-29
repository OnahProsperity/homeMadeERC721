// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./interface/IHomeMadeERC721.sol";
abstract contract ERC165 is IHomeMadeERC721 {
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }

}