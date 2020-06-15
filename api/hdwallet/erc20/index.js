import Web3 from 'web3'
import abi from 'human-standard-token-abi'
import { ETH } from '../eth';
const infuraurl = process.env.INFURA_URL
const web3 = new Web3(
    new Web3.providers.HttpProvider(infuraurl)
)


export class ERC extends ETH{

    setToken = (token_address) => {

        this.tokenContract = new web3.eth.Contract(abi, token_address)
    }

    send = async(from_address_index, to_address, amount) => {

        const bn_amount =  web3.utils.toBN(amount)
        const decimals = await this.tokenContract.methods.decimals().call()
        const amount_to_send = bn_amount.mul(web3.utils.toBN(10).pow(decimals))  //amt * 10^decimals

        const { address: from_address} = this.getAddressInfo(from_address_index)
        const result = await this.tokenContract.methods.transfer(to_address, amount_to_send).send({from: from_address})

    }

    tokenInfo = async() => {

        console.log('Name: ' + await this.tokenContract.methods.name().call());
        console.log('Symbol: ' + await this.tokenContract.methods.symbol().call());
        console.log('Decimals: ' + await this.tokenContract.methods.decimals().call());
        console.log('Total Supply: ' + await this.tokenContract.methods.totalSupply().call());

    }

}
