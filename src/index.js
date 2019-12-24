// Address of the owner of the contract
var myaddress = "0x70BEc5dA4733F3435a4c41c8f0E19c4E0ce688D3";
// Contract address deployed in testnet
var contract = "0x4CFdcF5a568590709c1A6347f5adeAC7498E134c";
// Balance of the contract
var myamount = 0;
// Address of the receipient
var toaddress = "";
// Amount to be sent
var toamount = "0";

// Balance element in the html file
var amountHTML = document.getElementById("balance");
// Address of the receipient in the html file
var toAdrHTML = document.getElementById("toAdr");

var transferHTML = document.getElementById("tran");
var toAmouHTML = document.getElementById("toAmou");
var transferResultHTML = document.getElementById("transferResult");

/**
 * Refresh the token balance
 * @param {String} contractAddress: Contract address deployed in testnet
 * @returns {Promise} balanceInfo: Promise object for the balance of the contract
 */

async function refreshBalance(contractAddress) {
    // ABI of the refreshBalance in the contract.
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

    // Execution of the refreshBalance using connex thor js.
    var refreshBalanceMethod = await connex.thor
        .account(contractAddress)
        .method(refreshBalanceABI);

    // Returned promise
    var balanceInfo = await refreshBalanceMethod.call();
    return balanceInfo;
}

/**
 * Function to Execute the previous refreshBalance function
 * And update the result in app.
 */
function refresh() {
    // Call the function
    refreshBalance(contract)
        .then(result => {
            return result.decoded[0];
        })
        .then(result => {
            // Set the balance of the contract
            myamount = result;
            amountHTML.innerHTML = myamount;
        })
        .then(() => {
            // Refresh the balance per tick in test net.
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

/**
 * Transfer tokens to a recepient.
 * @param {String} contractAddress: Contract address deployed in testnet
 * @param {String} ownerAddress: Address of the owner of the contract
 * @param {String} toAddress: Address of the receipient
 * @param {String} toAmount: Amount to be sent
 * @returns {Promise} transactionInfo: Promise object of the transaction info.
 */

async function transferBalance(
    contractAddress,
    ownerAddress,
    toAddress,
    toAmount
) {
    // ABI of the transferBalance in the contract.
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

    // Execution of the transferBalance using connex thor js.
    var transferMethod = connex.thor
        .account(contractAddress)
        .method(transferABI);

    // Trnasfer clause for the method
    var transferClause = transferMethod.asClause(toAddress, toAmount);

    // For signing the transaction.
    var signerService = connex.vendor.sign("tx");

    // Signing Service configuration for the transfer
    signerService
        .signer(ownerAddress)
        .comment("token transfer " + toAmount + " wei.");

    // Start the transfer
    var transactionInfo = await signerService.request([
        {
            comment: "Hello Transfer Demo",
            ...transferClause
        }
    ]);

    // Returns transactionInfo
    return transactionInfo;
}

/**
 * Function to Execute the previous transferBalance function
 */
function transfer() {
    transferBalance(contract, myaddress, toaddress, toamount)
        .then(result => {
            alert("success!");
            transferResultHTML.innerHTML = result.value;
        })
        .catch(err => {
            alert("Failed!");
            transferResultHTML.innerHTML = err.value;
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
