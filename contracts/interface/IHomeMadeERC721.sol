// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./IERC165.sol";
interface IHomeMadeERC721 is IERC165 {
    /**
     * @dev Returns the token collection name.
     */
    function name() external view returns (string memory);

     /**
      * @dev Returns the token collection symbol.
      */
    function symbol() external view returns (string memory);
 
     /**
      * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
      */
    function tokenURI(uint256 tokenId) external view returns (string memory);
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function safeTransfer(
        address _to,
        uint256 tokenId
    ) external;

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external;

    /**
     * @dev Approve or remove `operator` as an operator for the caller with signature.
     * Operators can call {transferFrom} or {safeTransferFrom} for any `tokenId` owned by the owner.
     *
     * Requirements:
     *
     * - The `owner` cannot be the zero address.
     * - The `owner` cannot be the `operator`.
     * - The `owner` must be the signer of `v`, `r`, `s` when split.
     * - The `owner` must own the token.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function permit(
        address owner, 
        address operator, 
        uint256 tokenId,
        uint8 v, 
        bytes32 r, 
        bytes32 s
    ) external;

    /**
     * @dev Approve or remove `operator` as an operator for the caller with signature.
     * Operators can call {transferFrom} or {safeTransferFrom} for token owned by the owner when `allowed` for the signature is set to true.
     *
     * Requirements:
     *
     * - The `owner` cannot be the zero address.
     * - The `owner` cannot be the `operator`.
     * - The `owner` must be the signer of `v`, `r`, `s` when split.
     *
     * Emits an {ApprovalForAll} event.
     */
    function permitForAll(
        address owner, 
        address operator, 
        bool allowed, 
        uint8 v, 
        bytes32 r, 
        bytes32 s
    ) external;

    /**
     * --- EIP712 niceties ---
     */
    function domain_seperator() external view returns (bytes32);

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator);

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}