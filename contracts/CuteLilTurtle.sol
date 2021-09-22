//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CuteLilTurtle is ERC721, Ownable {
    using Strings for uint256;

    uint256 public maxSupply = 10;
    uint256 public tokenCounter = 1;
    string public baseURI;
    string public baseExtension = ".json";
    // add other things
    event TurtleCreated(); 
    event BaseURIChanged(string newBaseURI);
    
    constructor() public ERC721("CuteLilTurtles", "CUTETURTLE") {}

    function create() public returns (bytes32) {
      require(tokenCounter <= maxSupply);
      _safeMint(msg.sender, tokenCounter);
      emit TurtleCreated();
      tokenCounter = tokenCounter + 1;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      require(
        _exists(tokenId),
        "ERC721Metadata: URI query for nonexistent token"
      );

      string memory currentBaseURI = _baseURI();
      return bytes(currentBaseURI).length > 0
          ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
          : "";
    }

    function setBaseURI(string calldata newbaseURI) external onlyOwner {
        baseURI = newbaseURI;
        emit BaseURIChanged(newbaseURI);
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
      baseExtension = _newBaseExtension;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}

