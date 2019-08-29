import Web3 from 'web3'

let getWeb3 = new Promise(async (resolve) => {
    let web3Provider;
    if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
            console.log("User denied account access");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        web3Provider = window.web3.currentProvider;
        // Acccounts always exposed
    } else {
        // If no injected web3 instance is detected, fall back to Ganache
        web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    }
    const web3 = new Web3(web3Provider);
    resolve({
        injectedWeb3: web3.eth.net.isListening(),
        web3() {
            return web3
        }
    })
}).then(result => {
    return new Promise((resolve, reject) => {
        result.web3().eth.net.getId().then(networkId => {
            console.log('retrieve newworkId: ' + networkId);
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
            console.log('retrieve coinbase: ' + coinbase);
            result = Object.assign({}, result, {coinbase});
            resolve(result)
        }).catch(() => {
            reject(new Error('Unable to retrieve coinbase'))
        })
    })
});


export default getWeb3
