import Web3 from 'web3'
import {eprojectaddress, eprojectABI} from './constant/eproject_abi'

let getContract = new Promise((resolve, reject) => {
    let web3 = new Web3(window.ethereum);
    let ecourseContractInstance = new web3.eth.Contract(eprojectABI, eprojectaddress);
    if (!ecourseContractInstance) {
        reject("no contract instance build")
    }
    resolve([ecourseContractInstance]);
});
export default getContract
