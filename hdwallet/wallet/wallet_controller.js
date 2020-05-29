import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import { ETH } from '../api/eth'
import { WalletValidate } from './wallet_model'

export class WalletController {

    /*
    | Strength              Word |
    |  128  |  4 |   132  |  12  |
    |  160  |  5 |   165  |  15  |
    |  192  |  6 |   198  |  18  |
    |  224  |  7 |   231  |  21  |
    |  256  |  8 |   264  |  24  |
    */
    constructor() {
        this.eth
    }

    init = async(strength) => {

        const {error} = WalletValidate.init({strength})
        if(error) throw error

        const mnemonic = bip39.generateMnemonic(strength)
        this.seed = await bip39.mnemonicToSeed(mnemonic)
        return {mnemonic}
    }

    recover = async(mnemonic) => {

        const {error} = WalletValidate.recover({mnemonic})
        if(error) throw error

        const isValid = bip39.validateMnemonic(mnemonic)
        if (!isValid) return console.log('Invalid Mnemonic!!')

        this.seed = await bip39.mnemonicToSeed(mnemonic)
        return {mnemonic}

    }

    createETHAcc = async(mnemonic) => {

        const {error} = WalletValidate.create({mnemonic, network_type})
        if(error) throw error

        const isValid = bip39.validateMnemonic(mnemonic)
        if (!isValid) return console.log('Invalid Mnemonic!!')

        const _seed = this.seed
        this.eth = new ETH(mnemonic, _seed)

    }

}


