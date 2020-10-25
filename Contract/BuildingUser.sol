pragma solidity 0.5.0;
contract Bebop{
    address owner;
    constructor() public {
        owner=msg.sender;
    }
    struct user{
        string username;
        string companyname;
        string location;
        uint point;
        bool isUsed;
    }
    mapping(address=>user) userList;
    modifier isOwner(){
        require(msg.sender==owner);
        _;
    }
    function createUser(string memory _username,string memory _companyname,string memory _location,uint _point)public payable{
       userList[msg.sender]=user(_username,_companyname,_location,_point,true);
    }
    function getUser(address _address) public view returns(string memory username,string memory companyname,string memory location,uint point){
        if(userList[_address].isUsed){
            return(userList[_address].username,userList[_address].companyname,userList[_address].location,userList[_address].point);
        }
    }
    function deduction(address  _address,uint _point)isOwner payable public{
        userList[_address].point-=_point;
    }
    
    
}