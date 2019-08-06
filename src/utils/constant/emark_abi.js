const emarkaddress = '0xea406de7abed8d803c39b2519bb23caafcf358b2';
// GETH:0x08d9a31349f9692daf621cb1e4248cb9d3204dc8
// Ganache 0226:0xea406de7abed8d803c39b2519bb23caafcf358b2
const emarkABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "courseId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "logScoreEvent",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "queryId",
                "type": "address"
            }
        ],
        "name": "remarkReturn",
        "outputs": [
            {
                "name": "scoreSum",
                "type": "uint256"
            },
            {
                "name": "scorePerson",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "courseId",
                "type": "uint256"
            },
            {
                "name": "creator",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint8"
            }
        ],
        "name": "remarkCreator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "courseId",
                "type": "uint256"
            },
            {
                "name": "prog",
                "type": "address[]"
            },
            {
                "name": "amount",
                "type": "uint8[]"
            }
        ],
        "name": "remarkProgrammer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
export {
    emarkaddress,
    emarkABI
};
