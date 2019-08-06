const eprojectaddress = '0x8bd8e13275cdabac17da439f24a61c6c19980460';
//GETH 0214:0x83572238b4a1ddd962e3658dfde4a9963b7347da
// Ganache:0226:0x8bd8e13275cdabac17da439f24a61c6c19980460
const eprojectABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "creatorID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "projectID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "regTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "projectType",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "projectName",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "projectIntro",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "projectField",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "memberID",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "name": "FrozenBalanceList",
                "type": "uint256[]"
            }
        ],
        "name": "LogRegisterProject",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "memberID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "projectID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "joinTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "memberType",
                "type": "uint8"
            }
        ],
        "name": "LogAttendProject",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "memberID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "projectID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "awardAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "awardType",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "awardTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "awardReason",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "rewardID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "senderID",
                "type": "uint256"
            }
        ],
        "name": "LogRewardMessage",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "scorememberID",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "name": "attitudeScore",
                "type": "uint8[]"
            },
            {
                "indexed": false,
                "name": "codeScore",
                "type": "uint8[]"
            },
            {
                "indexed": false,
                "name": "designScore",
                "type": "uint8[]"
            },
            {
                "indexed": true,
                "name": "projectID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "scoreTime",
                "type": "uint256"
            }
        ],
        "name": "LogScoreEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "userID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "userName",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "time",
                "type": "uint256"
            }
        ],
        "name": "LogUserState",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "msgVal",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "TID",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "Time",
                "type": "uint256"
            }
        ],
        "name": "LogTransferEvent",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "TID",
                "type": "bytes32"
            }
        ],
        "name": "submitPayment",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "memberID",
                "type": "uint256"
            },
            {
                "name": "projectID",
                "type": "uint256"
            },
            {
                "name": "awardAmount",
                "type": "uint256"
            },
            {
                "name": "awardType",
                "type": "uint256"
            },
            {
                "name": "awardTime",
                "type": "uint256"
            },
            {
                "name": "awardReason",
                "type": "string"
            },
            {
                "name": "rewardID",
                "type": "uint256"
            },
            {
                "name": "senderID",
                "type": "uint256"
            }
        ],
        "name": "submitReward",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "scorememberID",
                "type": "uint256[]"
            },
            {
                "name": "attitudeScore",
                "type": "uint8[]"
            },
            {
                "name": "codeScore",
                "type": "uint8[]"
            },
            {
                "name": "designScore",
                "type": "uint8[]"
            },
            {
                "name": "projectID",
                "type": "uint256"
            },
            {
                "name": "scoreTime",
                "type": "uint256"
            }
        ],
        "name": "submitScore",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "creatorID",
                "type": "uint256"
            },
            {
                "name": "projectID",
                "type": "uint256"
            },
            {
                "name": "regTime",
                "type": "uint256"
            },
            {
                "name": "projectType",
                "type": "uint8"
            },
            {
                "name": "projectName",
                "type": "string"
            },
            {
                "name": "projectIntro",
                "type": "string"
            },
            {
                "name": "projectField",
                "type": "uint256"
            },
            {
                "name": "memberID",
                "type": "uint256[]"
            },
            {
                "name": "FrozenBalanceList",
                "type": "uint256[]"
            }
        ],
        "name": "submitProjectState",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "userID",
                "type": "uint256"
            },
            {
                "name": "userName",
                "type": "string"
            },
            {
                "name": "userAddress",
                "type": "address"
            },
            {
                "name": "time",
                "type": "uint256"
            }
        ],
        "name": "submitUserState",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "user",
                "type": "address[]"
            },
            {
                "name": "amount",
                "type": "uint256[]"
            },
            {
                "name": "modtype",
                "type": "uint8[]"
            }
        ],
        "name": "modifyBalance",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getTotalBalance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getBalance",
        "outputs": [
            {
                "name": "balanceValue",
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
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export {
    eprojectaddress,
    eprojectABI
};
