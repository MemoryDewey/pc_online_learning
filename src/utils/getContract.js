import Web3 from 'web3'
//import {eprojectaddress, eprojectABI} from './constant/eproject_abi'
import {BstAbi, BstAddress} from './constant/bst_abi'

/*let getContract = new Promise((resolve, reject) => {
    let web3 = new Web3(window.ethereum);
    let ecourseContractInstance = new web3.eth.Contract(eprojectABI, eprojectaddress);
    if (!ecourseContractInstance) {
        reject("no contract instance build")
    }
    resolve([ecourseContractInstance]);
});*/
let getContract = new Promise(async (resolve, reject) => {
    let web3 = new Web3(window.ethereum);
    const ContractInstance = new web3.eth.Contract(BstAbi, BstAddress, {
        from: await web3.eth.getCoinbase(), // default from address
        gasPrice: '10000000000' // default gas price in wei, 10 gwei in this case
    });
    if (!ContractInstance) {
        reject("no contract instance build")
    }
    resolve([ContractInstance]);
});
export default getContract
