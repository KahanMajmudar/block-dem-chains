import Web3 from 'web3'
import * as bip39 from 'bip39'
import hdkey from 'ethereumjs-wallet/hdkey'
const infuraurl = 'https://ropsten.infura.io/v3/my-key'
import * as Tx from 'ethereumjs-tx'
const web3 = new Web3(
    new Web3.providers.HttpProvider(infuraurl)
)


export class ETH {

    constructor(mnemonic, _seed, network_type) {

        this.mnemonic = mnemonic
        this.network_type = network_type
        this.root = hdkey.fromMasterSeed(_seed)
    }

    getAddresses = (account_index = 0, from = 0, to = 10) => {

        for (let i = from; i <= to; i++) {

            const child = this.root.derivePath(`m/44'/60'/${account_index}'/0/${i}`).getWallet()
            console.log(`0x${child.getAddress().toString('hex')}`)
        }

    }

    getAddressInfo = (address_index) => {

        const child = this.root.derivePath(`m/44'/60'/0'/0/${address_index}`).getWallet()
        const address = `0x${child.getAddress().toString('hex')}`
        const privateKey = `0x${child.getPrivateKey().toString('hex')}`

        return {
            address,
            privateKey
        }

    }

    send = async (from_address_index, to_address, amount) => {

        const {
            address: from_address,
            privateKey
        } = this.getAddressInfo(this.root, from_address_index)

        const nonce = await web3.eth.getTransactionCount(from_address, 'pending')
        const txData = {
            nonce: web3.utils.toHex(nonce),
            to: to_address,
            value: web3.utils.numberToHex(web3.utils.toWei(amount, 'ether')),
            gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'Gwei')),
            gasLimit: web3.utils.toHex('3000000')
        }

        const tx = new Tx.Transaction(txData, {
            'chain': this.network_type === 'testnet' ? 'ropsten' : 'mainnet'
        })
        tx.sign(privateKey)
        const serializedTx = tx.serialize()
        console.log(`0x${serializedTx.toString('hex')}`)
        await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`).on('receipt', res.send)

    }

}