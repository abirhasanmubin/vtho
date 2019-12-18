var myaddress = "0x70BEc5dA4733F3435a4c41c8f0E19c4E0ce688D3";
var contract = "0x4cfdcf5a568590709c1a6347f5adeac7498e134c";
var myamount = 0;
var toaddress = "";
var toamount = 0;

var amountHTML = document.getElementById("balance");
var toAdrHTML = document.getElementById("toAdr");
var transferHTML = document.getElementById("tran");
var toAmouHTML = document.getElementById("toAmou");
var transferResultHTML = document.getElementById("transferResult");

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

function refresh() {
    refreshBalance(contract)
        .then(result => {
            return result.decoded[0];
        })
        .then(result => {
            myamount = result;
            innerHTML = myamount.toString();
        })
        .then(() => {
            // eslint-disable-next-line
            const ticker = connex.thor.ticker();
            ticker.next().then(() => {
                refresh();
            });
        })
        .catch(e => {
            setTimeout(() => {
                refresh();
            }, 3000);
        });
}

async function transferBalance(
    contractAddress,
    ownerAddress,
    toAddress,
    toAmount
) {
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
    var transferMethod = connex.thor
        .account(contractAddress)
        .method(transferABI);
    var transferClause = transferMethod.asClause(toAddress, toAmount);

    var signerService = connex.vendor.sign("tx");
    await signerService
        .signer(ownerAddress)
        .comment("token transfer " + toAmount + " wei.");
    await signerService
        .request([
            {
                to: toAddress,
                value: toAmount,
                data: "0x"
            },
            {
                comment: "Hello Transfer Demo",
                ...transferClause
            }
        ])
        .then(result => {
            alert("Success!");
            return result;
        })
        .catch(err => {
            alert("Failed!");
            return err;
        });
}

function transfer() {
    transferBalance(contract, myaddress, toaddress, toamount)
        .then(result => {
            alert("success!");
            transferResultHTML.innerHTML = result;
        })
        .catch(err => {
            alert("Failed!");
            transferResultHTML.innerHTML = err;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    refresh();
    transferHTML.addEventListener("submit", e => {
        e.preventDefault();
        toaddress = toAdrHTML.value;
        toamount = toAmouHTML.value;
        console.log(toaddress, toamount);
        transfer();
    });
});
