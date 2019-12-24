// Define the solidity version
pragma solidity >=0.4.22 <0.6.0;

// Contract body
contract myContract{
    // Address of the contract owner
    address payable owner;
    // Contract address
    address tokenAddress = address(this);
    // Address balance
    uint256 public tokenBalance;

    // Constructor of the contract
    constructor() public payable{
        owner = msg.sender;
        refreshTokenBalance();
    }
    
    function refreshTokenBalance() public returns(uint256){
        tokenBalance = tokenAddress.balance;
        return tokenBalance;
    }

    function transfer(address payable _toAddress, uint256 _amount) public payable{
        refreshTokenBalance();
        require(_amount <= tokenBalance, "Not enough Balance");
        _toAddress.transfer(_amount);
    }
}