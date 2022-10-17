
const serverUrl = "https://y0e89zlrjija.usemoralis.com:2053/server";
const appId = "9ecrjqQNMbRWtiEuvGni9RHQ6HZgH23ZFe0PPZdc";
Moralis.start({ serverUrl, appId });

async function lazy() {

    Moralis.initialize(
        Moralis.appId = '9ecrjqQNMbRWtiEuvGni9RHQ6HZgH23ZFe0PPZdc',
        Moralis.useMasterKey = '4ywhw4JntcCWfJ7IAYZAY6MrbnbwY2PCWVbkLmU7'
    );
    const user = await Moralis.authenticate();    
    Moralis.enableWeb3();

    let metadata = {
        name: "test",
        description: "nothing",
        image: "/ipfs/QmYjFNwMeRCPtY3eGTiDWEFLFwLA8Nvjjte7PkZKmBKsQb"  
    }
    console.log(metadata);
    const jsonFile = new Moralis.File("metadata.json", { base64: btoa(JSON.stringify(metadata)) });
    await jsonFile.saveIPFS();

    // let metadataHash = jsonFile.hash();
    // console.log(jsonFile.ipfs());    

    let result = await Moralis.Plugins.rarible.lazyMint({
        chain: 'goerli',
        userAddress: '0x08f762718391f39a62cb0d7e5fb940f477537254',
        tokenType: 'ERC721',
        tokenUri: 'https://gateway.pinata.cloud/ipfs/QmZf6iSg6SFPykaPcsGubVcNGAkWr3nBPWLiYi86AJWnGf',
        royaltiesAmount: 1, // 0.05% royalty. Optional
    })
    console.log({ result });
}
lazy();