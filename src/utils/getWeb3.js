import Web3 from 'web3'

let getWeb3 = new Promise(async (resolve, reject) => {
    let web3, web3Provider, injectedWeb3;
    try {
        if(!window.ethereum || !window.web3){
            // If no injected web3 instance is detected, fall back to Ganache
            reject('Your browser need install MetaMask plugin to payment!')
        }
        if (window.ethereum) {
            web3Provider = window.ethereum;
            // Request account access if needed
            window.ethereum.autoRefreshOnNetworkChange = false;
            await window.ethereum.enable();
            web3 = new Web3(web3Provider);
            injectedWeb3 = web3.eth.net.isListening();
            // Acccounts now exposed
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            web3Provider = window.web3.currentProvider;
            web3 = new Web3(web3Provider);
            injectedWeb3 = web3.eth.net.isListening();
            // Acccounts always exposed
        }
    } catch (error) {
        // User denied account access...
        console.log("User denied account access");
    }
    resolve({
        injectedWeb3,
        web3() {
            return web3
        }
    })
}).then(result => {
    return new Promise((resolve, reject) => {
        result.web3().eth.net.getId().then(networkId => {
            //console.log('retrieve newworkId: ' + networkId);
            result = Object.assign({}, result, {networkId});
            resolve(result)
        }).catch(() => {
            reject(new Error('Unable to retrieve network ID'))
        });
    })
}).then(result => {
    return new Promise((resolve, reject) => {
        result.web3().eth.getCoinbase().then(coinbase => {
            coinbase = result.web3().utils.toChecksumAddress(coinbase);
            //console.log('retrieve coinbase: ' + coinbase);
            result = Object.assign({}, result, {coinbase});
            resolve(result)
        }).catch(() => {
            reject(new Error('Unable to retrieve coinbase'))
        })
    })
}).catch(err => {
    console.log(err);
});


export default getWeb3
