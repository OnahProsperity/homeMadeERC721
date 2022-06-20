[![Docs][docs-shield]][docs-url]
[![MIT License][license-shield]][license-url]
<!-- ANNOUNCEMENT -->

> **📢 Version 0.0.1x. [Please refer to the documentation for more details.](https://github.com/OnahProsperity/homeMadeERC721)**

<!-- ABOUT THE PROJECT -->

## INTRODUCING Homemade ERC721, AN IMPROVED ERC721 IMPLEMENTATION

The goal of Homemade ERC721 is to provide an update on the implementation of IERC721 with significant gas savings for minting NFTs  an added [EIP721 Permit](https://eips.ethereum.org/EIPS/eip-712) functionality. This project and implementation is likely going to be updated regularly and will continue to stay up to date with best practices.

![Gas Savings](https://miro.medium.com/max/700/1*eOAx7Ai0EH6BYc87I1Mdrg.png)

[Onah Prosper](https://onahprosperity.github.io/) created the improved version of ERC721 (Home Made ERC721) for a reason. [EIP721 standard](https://eips.ethereum.org/EIPS/eip-721) was created in 2018-01-24 and has not been updated for a while. There are some new improved functions like transfer(), permit(), permitForAll() that has been added to the Home Made ERC721. Special Thanks to [Polygon Network](https://polygon.technology/) as this won't have been done without them.


![New Functionality](https://miro.medium.com/max/700/1*Gm2AcosUOfmzO-n-Z1JhWA.png)
## New Implementations
## Custom Error in place of Require
Starting from [Solidity v0.8.4](https://github.com/ethereum/solidity/releases/tag/v0.8.4), there is a convenient and gas-efficient way to explain to users why an operation failed through the use of custom errors. Until now, you could already use strings to give more information about failures 
```solidity

revert("Insufficient funds.");
require(msg.sender != address(0), "here with a long strings to explain why");

```
but they are rather expensive, especially when it comes to deployment cost, and it is difficult to use dynamic information in them.
Custom errors are defined using the error statement, which can be used inside and outside of contracts (including interfaces and libraries).
More on custom error [Custom Error](https://favoriteblockchain.medium.com/solidity-custom-error-a-way-to-save-gas-b731fdd648c0). So in Home Made ERC721, require statements are replaced with custom errors in other to save gas. See the percentage differences above.


## Adding safe Transfer Function
Why do we need transfer function? 
Currently on [EIP721](https://eips.ethereum.org/EIPS/eip-712), for instance, it is not possible for Alice to decide to transfer her NFT to Bob directly. Either this event has to be done before Bob can get the NFT from Alice.
1. Alice uses the "approve()" function to approve Bob to be able to transfer the NFT from her and Bob has to trigger the "transferFrom()" method in other to transfer the NFT from Alice. This leads to spending of gas in multiple transaction. From what we have above, it will cost both Alice and Bob 134,747 gas fee.
2. Second scenerio which is very difficult and cost more gas is using a smart contract as an intermidiary.
So adding "safeTransfer()" function that only costs 59,543 instead of 134,747 saves about 44.19% gas fee.
```solidity

function safeTransfer(
        address _to,
        uint256 tokenId
    ) external;

```
Saves from all the stress and funds.
[Home Made ERC721: safeTransfer() Transaction Hash](https://mumbai.polygonscan.com/tx/0x6be5ded2720c1cc8b0db7e72640674519e210ab2f92b1f18f123abc41b48a4ef)

## Adding Permit functionality
After Ethereum wallets like MetaMask implemented [EIP721 standard](https://eips.ethereum.org/EIPS/eip-721) for typed message signing that allows wallets to display data in signing prompts in a structured and readable format. EIP712 is a great step forward for security and usability because users will no longer need to sign off on inscrutable hexadecimal strings, which is a practice that can be confusing and insecure.
Lots of Project have started implementing this logic. [Popular Dai](https://makerdao.com/en/) They have it implemented on their stable coin [DAI Etherscan](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f#code).
Introducing EIP712 into Home Made ERC721 in order to allow for gasless transactions on open market.
Instance: Bob signed a message and sends the signature to Alice. Alice spilts the signature in order to get the v,r,s and use it to approve herself in order to transfer NFT from Bob.
```solidity

function permit(
        address owner, 
        address operator, 
        uint256 tokenId,
        uint8 v, 
        bytes32 r, 
        bytes32 s
    ) external;

```
This permit works in a way to transfer a single NFT from `owner` on recieving the signature and spliting it to get the v,r,s.
[Home Made ERC721: Permit() Transaction Hash](https://mumbai.polygonscan.com/tx/0x5832ed2ec99006c87a11aac2d28765330be1c287a094e91c9ae403daa86422b4)

The other type of permit is:
## Permit for All.
As the name implies, it allowS unending transfer of NFT from `owner` in a way,
```solidity
function permitForAll(
        address owner, 
        address operator, 
        bool allowed, 
        uint8 v, 
        bytes32 r, 
        bytes32 s
    ) external;
```
if Bob signs a message and sets "allowed" to be true, then it means unending transfer. If false, that will disapprove the `operator` (Alice) from future withdrawal.
[Home Made ERC721: PermitForAll() Transaction Hash](https://mumbai.polygonscan.com/tx/0x77233b25d13d56dd784b535d666f21b0b0d4404113e9099ea2200b46998a159f)

## Base URL now setable
Token URL can now be setable.
```solidity
function _setBaseURI(string memory _uri);
```

## Introducing LibStorage
Just a Free style.


## Deployment Link
[Home Made ERC721 Contract Deployment](https://mumbai.polygonscan.com/address/0xfEEAcBb3e303101e0BAFD90C940397e57C37b5f5)
<!-- USAGE EXAMPLES -->
## Usage

Once installed, you can use the contracts in the library by importing them:

```solidity
pragma solidity ^0.8.4;

import "/contracts/HomeMadeERC721.sol"; // might consider NPM package

contract HMERC721 is HomeMadeERC721 {
    constructor() HomeMadeERC721("Home Made ERC721", "HMERC721") {}

    function mint(uint256 tokenId) external payable {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _mint(msg.sender, quantity);
    }
}

```

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- ROADMAP -->

### Running tests locally

1. `npm install`
2. `npx hardhat compile`
3. `npx hardhat test`

<!-- CONTACT -->

## Contact

- Portfolio (owner) - [My Portfolio](https://onahprosperity.github.io/)
- Twitter (owner) - [@OnahProsperity](https://twitter.com/OnahProsperity)
- Telegram (owner) - [@Encryption01](https://t.me/Encryption01)
- Email (owner) - [Gmail](prosperauthor@gmail.com)
- Coffee? (owner) - [otor.eth](https://etherscan.io/enslookup-search?search=otor.eth)

Project Link: [https://github.com/chiru-labs/ERC721A](https://github.com/chiru-labs/ERC721A)

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[docs-shield]: https://img.shields.io/badge/docs-%F0%9F%93%84-blue?style=for-the-badge
[docs-url]: https://github.com/OnahProsperity/homeMadeERC721
[license-shield]: https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge
[license-url]: https://github.com/OnahProsperity/homeMadeERC721
