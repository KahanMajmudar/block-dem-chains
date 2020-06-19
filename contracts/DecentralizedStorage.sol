// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0 <0.7.0;
// import "@openzeppelin/contracts/access/Ownable.sol";
import './Ownable.sol';

contract DecentralizedStorage is Ownable{

    struct Post {
        string hash;
        string title;
        string tag;
        string dataType;
        uint creationTime;
    }

    struct User {
        string name;
        string bio;
        bool isUser;
    }


    Post[] posts;

    mapping (address => User) public userInfo;
    mapping (address => uint) postCounts;
    mapping (string => address) public postOwner;
    mapping (address => Post[]) public postPerUser;
    mapping (string => bool) isExist;

    event UserAdded(address);
    event PostAdded(uint, string, address);
    event Received(address, uint);
    event FundsRemoved(address, uint);


    receive() external payable {
        emit Received(msg.sender, msg.value);
    }


    function setProfile(string memory _name, string memory _bio) public {
        require(!userInfo[msg.sender].isUser, 'Already a user');
        User memory user = User(_name, _bio, true);
        userInfo[msg.sender] = user;
        emit UserAdded(msg.sender);
    }

    function addPost(string memory _hash, string memory _title, string memory _tag, string memory _type) public {

        require(userInfo[msg.sender].isUser, 'Please setup your profile');
        require(!isExist[_hash], 'Post already exists');
        postPerUser[msg.sender].push(Post(_hash, _title, _tag, _type, now));
        uint _id = posts.length - 1;
        isExist[_hash] = true;
        postCounts[msg.sender] += 1;
        postOwner[_hash] = msg.sender;
        emit PostAdded(_id, _hash, msg.sender);

    }


    function totalPosts(address _address) public view returns (uint total){
        return postCounts[_address];

    }

    function collectFunds() public payable onlyOwner {
        msg.sender.transfer(address(this).balance);
        emit FundsRemoved(msg.sender, address(this).balance);
    }

}