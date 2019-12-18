var contractAddress = "0x4cfdcf5a568590709c1a6347f5adeac7498e134c";
var ownersAddress = "0x70BEc5dA4733F3435a4c41c8f0E19c4E0ce688D3";

var mainABI = [
    {
        constant: false,
        inputs: [],
        name: "refreshTokenBalance",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_toAddress",
                type: "address"
            },
            {
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "transfer",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        payable: true,
        stateMutability: "payable",
        type: "constructor"
    },
    {
        constant: true,
        inputs: [],
        name: "tokenBalance",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    }
];

var transferABI = {
    constant: false,
    inputs: [
        {
            name: "_toAddress",
            type: "address"
        },
        {
            name: "_amount",
            type: "uint256"
        }
    ],
    name: "transfer",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
};

var balanceABI = {
    constant: true,
    inputs: [],
    name: "tokenBalance",
    outputs: [
        {
            name: "",
            type: "uint256"
        }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
};

async function refreshBalance(contractAddress) {
    var refreshBalanceABI = {
        constant: false,
        inputs: [],
        name: "refreshTokenBalance",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    };
    var refreshBalanceMethod = await connex.thor
        .account(contractAddress)
        .method(refreshBalanceABI);

    var balanceInfo = await refreshBalanceMethod.call();
    return balanceInfo;
}

export { refreshBalance };
