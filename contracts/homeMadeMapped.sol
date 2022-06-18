// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev silently declare mapping for the products on Rigel's Protocol Decentralized P2P network
 */
library homeMadeMapped {
    struct libStorage {
        // Token name
    string _name;

    // Token symbol
    string _symbol;

    // base URI;
    string _baseURI;

    // Mapping from token ID to owner address
    mapping(uint256 => address) _owners;

    // Mapping owner address to token count
    mapping(address => uint256) _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) _operatorApprovals;
    }

    function diamondStorage() internal pure returns(libStorage storage ds) {
        bytes32 storagePosition = keccak256("HOME MADE ERC721");
        assembly {ds.slot := storagePosition}
    }
}
