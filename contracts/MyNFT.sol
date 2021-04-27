//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;
    mapping (address => mapping (address => uint256)) internal allowed;

    address public contractor;
    address[] public byers;
    
    constructor() ERC721 ("T.REC", "T.REX") {
        contractor = msg.sender;
    }

    modifier Own() {
        require(msg.sender == contractor);
        _;
    }  

    function contribute() external payable {}  

    function mintERC721(address recipient, string memory tokenURI) public onlyOwner returns (uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function transferERC721(address sender, address recipient, uint256 tokenID) public virtual {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenID), "ERC721: transfer caller is not owner nor approved");
        _transfer(sender, recipient, tokenID);
        emit Transfer(msg.sender, recipient, tokenID);
    }

    function getByers() public view returns (address[] memory) {
        return byers;
    }

    function sendByers() public payable {
        require(msg.value >= .001 ether);
        byers.push(msg.sender);
    }

    function withdrawBalance (address payable recipient) public Own() payable {
        recipient.transfer(address(this).balance);
    }
}