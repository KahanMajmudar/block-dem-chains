# block-dem-chains
Devfolio's ETHIndia Online: Chain Runner

## Team Members
- Kahan Majmudar
- Harshil Darji
- Nisarg Sheth
- Kairav Pithadia

## Description

The purpose of the project is to make a decentralized resource sharing platform aimed for college :school: /students :student:  who can share/use those resources :books: for acedamic purposes. The users need to register an account to use the services and can upload/view/download the resources. The resouces are stored on IPFS and are accessible to everyone based on the post's CID :postbox:. The users need to follow other users in order to view the content(to get post CIDs). The users can search other users by entering the users' addresses and follow them. Various metadata such as user data and CIDs are stored in smart contract and the main data is stored in mongodb. :smile:

## Getting Started

### Prerequisites

- Install Node
  - macOS
  
    `brew install node`
  - [Linux](https://github.com/nodesource/distributions/blob/master/README.md)
  - [Windows](https://nodejs.org/en/#home-downloadhead)
  
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install truffle

  `npm i truffle -g`
- Install [MetaMask Plugin](https://metamask.io/download.html) for your Browser/Device.


### How to get server started

- Notice `.env.example` file in the repo.
  - Make a new file using `touch .env` (Linux implementation). Your implementation may vary based on OS :smile:. 
  - Fill up the Details as present in the `.env.example` in the newly created `.env` file.
#### Note : Keep both `.env` and `.env.example` files. Do not update your details in the example file.
#### These Details consists of PORT, DB_NAME, INFURA_URL, JWT_SECRET, MAIL_ADDRESS, MAIL_PASSWORD.

- Go to the cloned Repository and execute below mentioned steps.
  1) `truffle develop`
  2) Copy the Localhost Address from the output after executing above command. Eg. `http://127.0.0.1:9545`
  3) Open your Metamask Plugin -> Top Right circle -> Settings -> Networks -> Add Network
  4) Mention `Name` of the network. Eg. `localhost` and Mention your Localhost address copied in Step ii in `New RPC URL` 
  5) Goto Metamask Plugin -> Top Right Circle -> Import Account -> Paste your Private Key which is present in the output of the Step i.

- Open New Terminal and execute below mentioned steps.
  1) `truffle migrate`
  2) Scroll down to the bottom of the output.
  3) Notice 2_deploy_migration.js
  4) Copy your `contract address` to this file named [contract_controller.js](https://github.com/KahanMajmudar/block-dem-chains/blob/4497b993e352e6736d2cf42463c5b2a56d8ee815/api/contract/contract_controller.js#L14) and paste your address in place of a HASH value present in the linked line.

- Install dependencies `npm i`
  - It will take some time to install dependencies :timer_clock:. Have patience :smile:.
- Start the server `npm start`.
- Voila! the server's up and running. Check the status of the server by going to the port mentioned in the `.env` file via localhost. Eg. `http://127.0.0.1:3000` :+1:.

## Specifications

### Node.js Base Server

This backend server is made using Node.js and provides the connectivity to our [Frontend Repo](https://github.com/KahanMajmudar/block-dem-chains-frontend). The details to connect them are mentioned in the [README.md](https://github.com/KahanMajmudar/block-dem-chains-frontend/blob/master/README.md) of our frontend repository.

### Smart Contract

We're using Smart Contract to save the Post data corresponding to each User.

Contract Attributes
- CID (Content-Address Identifiers)
- Type (of file)
- Title (of Post)
- Tag (of Post)
- creation_time

### User & Transaction Management

The server uses MongoDB at the server side to keep track of the users and their corresponding Transactions which can be seen by going in the `View Transactions` Tab in our Frontend.
### Mail Support - Authentication/Authorization

The server is capable of authorising a user using their email address and provide them a verification link.

