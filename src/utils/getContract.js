import Web3 from 'web3'

import {BstAbi, BstAddress} from './constant/bst_abi'

let getContract = new Promise(async (resolve, reject) => {
    if(window.ethereum){
        let web3 = new Web3(window.ethereum);
        const ContractInstance = new web3.eth.Contract(BstAbi, BstAddress, {
            from: await web3.eth.getCoinbase(), // default from address
            gasPrice: '10000000000' // default gas price in wei, 10 gwei in this case
        });
        if (!ContractInstance) {
            reject("no contract instance build")
        }
        resolve([ContractInstance]);
    }
});
export default getContract
