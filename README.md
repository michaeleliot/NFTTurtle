Simple Project Showcasing How to Do a PFP Project

Overview
This is a project to showcase my sister's art, and learn basic nft coding. It uses [hardhat](https://hardhat.org/) for the environment, ipfs via [Pinata](https://www.pinata.cloud/) for hosting, and the github repo [generative-art-opensource](https://github.com/HashLips/generative-art-opensource) to create the generative images. You can see this project deployed to Rickeby [here](https://rinkeby.etherscan.io/address/0x15e4A63356e46999421608D061d5aB92abFFb5f3).

Creating Generative Art (Optional)
If you wish to create simple generative art, you can generate the png's via the [generative-art-opensource](https://github.com/HashLips/generative-art-opensource) repo. Follow the instructions there, with a few key differences. First, instead of having the json and images in one folder, I split them into two with one containing the json and the other containing the png files. This is to make the hosting process easier. Two, I updated the code to include a script to update the json bas_url for the next step.


Uploading The Content To Pinata
Create two folders, one containing the png and the other containing the json metadata information. For simplicity, I named both just the number value of the item being uploaded. I.e. the 1st nft minted corresponds to 1.png and 1.json. Upload the art to pinata, and retrieve the hash of the folder of the artwork. Then update the json metadata to have the correct image base_url. Upload the json metadata folder to pinata as well.

Setting The BaseURI
Grab that folder hash, and that is the baseURI for the contract. Here in the deploy script I call setBaseURI to set the baseURI. I should note here you should generally only allow the BaseURI to be updated once to prevent rug pulling the people who buy your art. You can do so by setting a flag in BaseURI, and initializing the baseuri to some static images pre-reveal.

Deploying to Rickeby
I deployed using hardhat. The cli command I used was  hh deploy --network rinkeby. Once the contract was deployed via the hardhat deploy script, I then used npx hardhat verify CONTRACT_ADDRESS --network rickeby to verify it on etherscan. Note verifying it on etherscan requires an api key from the etherscan website.   

Minting
From there you can mint a few different ways. You can call create as I do here in the deploy script, or you can call the contract directly on etherscan. Either way, you will need to setup a metamask account with some money.




Work Cited

Creating an nft on opensea

[https://www.youtube.com/watch?v=RfJ3HlWnWxc](https://www.youtube.com/watch?v=RfJ3HlWnWxc)

Programmatically Create NFT on IPFS/OPensea

[https://www.youtube.com/watch?v=p36tXHX1JD8](https://www.youtube.com/watch?v=p36tXHX1JD8)

Create Generated Artwork

[https://www.youtube.com/watch?v=UCxA8sDltMY](https://www.youtube.com/watch?v=UCxA8sDltMY)

Create NFT with Randomly Generated Art on Chain

[https://www.youtube.com/watch?v=9oERTH9Bkw0](https://www.youtube.com/watch?v=9oERTH9Bkw0)

[https://www.oniichain.com/overview](https://www.oniichain.com/overview)

Onii Project Idea

[https://www.oniichain.com/overview](https://www.oniichain.com/overview)

Minting A Generative DAPP

[https://www.youtube.com/watch?v=SD1DTrlJeKM](https://www.youtube.com/watch?v=SD1DTrlJeKM)