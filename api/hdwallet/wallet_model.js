import Joi from '@hapi/joi'


export class WalletValidate {

    static init(walletObj) {

        const schema = Joi.object({

            strength: Joi.number().required().valid(128, 160, 192, 224, 256)

        });
        return schema.validate(walletObj);

    }

    static recover(walletObj) {

        const schema = Joi.object({

            mnemonic: Joi.string().required().trim()

        });
        return schema.validate(walletObj);

    }

    static create(walletObj) {

        const schema = Joi.object({

            mnemonic: Joi.string().required().trim(),
            network_type: Joi.string().trim().valid('mainnet', 'testnet').required()

        })
        return schema.validate(walletObj, { abortEarly: false })

    }



}
