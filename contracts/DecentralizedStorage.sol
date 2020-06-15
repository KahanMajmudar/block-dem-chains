pragma solidity >=0.6.0 <0.7.0;

contract DecentralizedStorage {

    struct User {
        string name;
        string bio;
        bool isUser;
    }

    struct Post {
        string hash;                    // QmcNVnFMBqyrYhVLojj2Y1tAyJZVzdhGTEp8U9kWTKr3zF
        string title;
        string dataType;
        uint creationTime;
    }

    Post[] public posts;

    mapping (address => User) public userInfo;
    mapping (address => uint) postCounts;
    mapping (string => address) public postOwner;
    mapping (string => bool) isExist;


    event PostAdded(uint, string, address);
    event Received(address, uint);


    constructor() public {

    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }


    function setProfile(string memory _name, string memory _bio) public {
        require(!userInfo[msg.sender].isUser, 'Already a user');
        User memory user = User(_name, _bio, true);
        userInfo[msg.sender] = user;
    }

    function addPost(string memory _hash, string memory _title , string memory _type) public {

        require(userInfo[msg.sender].isUser, 'Please setup your profile');
        require(!isExist[_hash], 'Post already exists');
        posts.push(Post(_hash, _title, _type, now));
        uint _id = posts.length - 1;
        isExist[_hash] = true;
        postCounts[msg.sender] += 1;
        postOwner[_hash] = msg.sender;
        emit PostAdded(_id, _hash, msg.sender);

    }


    function totalPosts(address _address) public view returns (uint total){
        return postCounts[_address];

    }

}