//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
/* SPDX-License-Identifier: UNLICENSED */
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // the name and symbol for the NFT
    constructor() public ERC721("MyNFT", "NFT") {}

    // Create a function to mint/create the NFT
   // receiver takes a type of address. This is the wallet address of the user that should receive the NFT minted using the smart contract
    // tokenURI takes a string that contains metadata about the NFT

    function createNFT(address receiver, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(receiver, newItemId);
       

        // returns the id for the newly created token
        return newItemId;
    }
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        require(
            _isApprovedOrOwner(from, tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _safeTransfer(from, to, tokenId, data);
    }
    /**************************FIRST METHOD END**********************/


    /************************SECOND METHOD*****************************/
    function transferTokenTo(
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        safeTransferFrom(_from, _to, _tokenId);

    }
}
