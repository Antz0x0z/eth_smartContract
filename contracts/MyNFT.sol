//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721i.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;
    mapping (address => mapping (address => uint256)) internal allowed;

    address public contractor;
    address[] public byers;
    string public _baseTokenURI;

    constructor(
    string memory name,
    string memory symbol
    )
    ERC721(name, symbol)
  {

    // Since we pre-mint to "owner", allow this contract to transfer on behalf of "owner" for sales.
    _setApprovalForAll(_msgSender(), address(this), true);
  }

    modifier Own() {
        require(msg.sender == contractor);
        _;
    }  

    function contribute() external payable {}  

    function mint(address recipient, string memory tokenURI) public onlyOwner returns (uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function transfer(address sender, address recipient, uint256 tokenID) public virtual {
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