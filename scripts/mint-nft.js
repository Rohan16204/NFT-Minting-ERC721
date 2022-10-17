require("dotenv").config()

const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "YOUR DEPLOYED CONTRACT ADDRESS" 
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'maxPriorityFeePerGas': 1999999987,
        'data': nftContract.methods.createNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err)
                    {
                        console.log("The hash of your transaction is: ", hash)
                    } else
                    {
                        console.log("Something went wrong when submitting your transaction:", err)
                    }
                }
            )
        })
        .catch((err) => {
            console.log("Promise failed:", err)
        })
}
//IPFS link to mint the asset 
const metadatalinks = ["https://gateway.pinata.cloud/ipfs/Qmc67GhhW9DHKGProtnZqizVP5T1r6o45NWQFPojVsGjsy"]
for (const s of metadatalinks)
{
    mintNFT(s)
};

