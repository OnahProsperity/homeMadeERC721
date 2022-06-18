// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
// HomeMadeERC721: balance query for the zero address
error zeroAddress();
// HomeMadeERC721: token already minted
error alreadyMinted();
// HomeMadeERC721: owner query for nonexistent token
error nonexistent();
// HomeMadeERC721: URI query for nonexistent token
error URINonexistent();
// HomeMadeERC721: approval to current owner
error selfApproval();
// HomeMadeERC721: approve caller is not owner nor approved for all
error notAllow();
// HomeMadeERC721: approved query for nonexistent token
error nonexistentToken();
// HomeMadeERC721: transfer caller is not owner nor approved
error notApproved();
// HomeMadeERC721: transfer to non ERC721Receiver implementer
error NonReceiver_Implementer();
// HomeMadeERC721: transfer from incorrect owner
error incorrectOwner();
