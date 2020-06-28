# block-dem-chains
Devfolio's ETHIndia Online: Chain Runner

## Team Members
- Kahan Majmudar
- Harshil Darji
- Nisarg Sheth
- Kairav Pithadia

## Description

## Getting Started

### How to get server started

- Install Node
  - macOS
  
    `brew install node`
  - [Linux](https://github.com/nodesource/distributions/blob/master/README.md)
  - [Windows](https://nodejs.org/en/#home-downloadhead)
  
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install truffle

  `npm i truffle -g`
- Install [MetaMask Plugin](https://metamask.io/download.html) for your Browser/Device.
- Notice `.env.example` file in the repo.
  - Make a new file using `touch .env` (Linux implementation). Your implementation may vary based on OS :smile:. 
  - Fill up the Details as present in the `.env.example` in the newly created `.env` file.
#### Note : Keep both `.env` and `.env.example` files. Do not update your details in the example file.
#### These Details consists of PORT, DB_NAME, INFURA_URL, JWT_SECRET, MAIL_ADDRESS, MAIL_PASSWORD.

- Go to the cloned Repository and execute below mentioned steps.
  1) `truffle develop`
  2) Copy the Localhost Address from the output after executing above command. Eg. `http://127.0.0.1:9545`
  3) Open your Metamask Plugin -> Settings -> Networks -> Add Network
  4) Mention `Name` of the network. Eg. `localhost` and Mention your Private Key in `New RPC URL` which is present in the output of the Step i.

- Open New Terminal and execute below mentioned steps.
  1) `truffle migrate`
  2) Scroll down to the bottom of the output.
  3) Notice 2_deploy_migration.js
  4) Copy your `contract address` to this file named [contract_controller.js](https://github.com/KahanMajmudar/block-dem-chains/blob/4497b993e352e6736d2cf42463c5b2a56d8ee815/api/contract/contract_controller.js#L14) and paste your address in place of a HASH value present in the linked line.

- install dependencies `npm i`
  - It will take some time to install dependencies :timer_clock:. Have patience :smile:.
- Start the server `npm start`.
- Voila! the server's up and running. Check the status of the server by going to the port mentioned in the `.env` file via localhost. Eg. `http://127.0.0.1:3000` :+1:.



