// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;
import  "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Routify {
    IERC20 public cusdToken;

    struct Account {
        uint256 phoneNumber;
        address accountOwner;
        bool registered;
    }

    struct Gig {
        string gigId;
        uint256 amount;
        uint256 duration;
        uint256 starttime;
        bool paid;
        address creator;
        address gigtaker;
    }

    // Mappings
    mapping(address => Account) public accounts;
    mapping(string => Gig) public gigs;

    // Events
    event AccountLinked(address indexed accountOwner, uint256 phoneNumber);
    event NumberUpdated(address indexed accountOwner, uint256 newPhoneNumber);
    event GigCreated(string gigId, uint256 amount, uint256 duration);
    event GigPaid(string gigId, uint256 amount);
    event GigRefunded(string gigId);
    event GigTaken(string gigId, address gigtaker);


    constructor(address _cusd){
        cusdToken = IERC20(_cusd);
    }

    function linkAccount(uint256 _phoneNumber) public returns (bool) {
        require(!accounts[msg.sender].registered, "Account already exists");

        accounts[msg.sender] = Account({
            phoneNumber: _phoneNumber,
            accountOwner: msg.sender,
            registered: true
        });

        emit AccountLinked(msg.sender, _phoneNumber);

        return true;
    }

    function updateNumber(uint256 _newPhoneNumber) public returns (bool) {
        require(accounts[msg.sender].registered, "Account does not exist");

        accounts[msg.sender].phoneNumber = _newPhoneNumber;

        emit NumberUpdated(msg.sender, _newPhoneNumber);

        return true;
    }

    function returnAccountDetails(address _addr) public view returns (uint256, bool) {
        Account memory acc = accounts[_addr];
        return (acc.phoneNumber, acc.registered);
    }

    function createGig(string memory _gigId, uint256 _gigAmount, uint256 _duration) public {
        require(keccak256(abi.encodePacked(gigs[_gigId].gigId)) != keccak256(abi.encodePacked(_gigId)), "Gig already exists");
        

        gigs[_gigId] = Gig({
            gigId: _gigId,
            amount: _gigAmount,
            duration: _duration,
            starttime: block.timestamp,
            gigtaker:address(0),
            creator: msg.sender,
            paid: false
        });

        require(cusdToken.transferFrom(msg.sender,address(this), _gigAmount),"failed");

        emit GigCreated(_gigId, _gigAmount, _duration);
    }

    function markGigAsPaid(string memory _gigId) public {
        require(keccak256(abi.encodePacked(gigs[_gigId].gigId)) == keccak256(abi.encodePacked(_gigId)), "Gig does not exist");
        require(!gigs[_gigId].paid, "Gig already paid");
        require(gigs[_gigId].creator != msg.sender, "Creator cannot mark gig as paid");
        require(cusdToken.transfer(gigs[_gigId].gigtaker,gigs[_gigId].amount),"failed");

        gigs[_gigId].paid = true;

        emit GigPaid(_gigId, gigs[_gigId].amount);
    }

    function refundBack(string memory _gigId) public {
        require(keccak256(abi.encodePacked(gigs[_gigId].gigId)) == keccak256(abi.encodePacked(_gigId)), "Gig does not exist");
        require(gigs[_gigId].creator == msg.sender, "Only the creator can call this function");
        require(block.timestamp >=  gigs[_gigId].duration, "Gig duration has not passed");
        require(!gigs[_gigId].paid, "Gig already paid");
        require(cusdToken.transfer(gigs[_gigId].creator,gigs[_gigId].amount),"failed");

        gigs[_gigId].paid = true;

        emit GigRefunded(_gigId);
    }
    function takeGig(string memory _gigId) public {
        require(keccak256(abi.encodePacked(gigs[_gigId].gigId)) == keccak256(abi.encodePacked(_gigId)), "Gig does not exist");
        require(gigs[_gigId].gigtaker == address(0), "Gig already taken");

        gigs[_gigId].gigtaker = msg.sender;

        emit GigTaken(_gigId, msg.sender);
    }
}
