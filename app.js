import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import config from './config'
// import mongoose from 'mongoose'
import { Client } from './services'
import auth_routes from './middlewares/middleware_routes'
// import wallet_routes from './api/hdwallet/wallet_routes'
import user_routes from './api/users/user_routes'
import mail_routes from './api/mail/mail_routes'
import ipfs_routes from './api/ipfs/ipfs_routes'
import contract_routes from './api/contract/contract_routes'
import tx_routes from './api/transactions/transaction_routes'
import cors from 'cors'
import admin from 'firebase-admin';
import serviceAccount from './block-dem-chains-firebase.json';

// import IPFS from 'ipfs'
// import OrbitDB from 'orbit-db'

class Server {

	constructor(port, app) {
		this.port = port
		this.app = app
		// this.orbitdb()
		//this.mongodb()
		this.firebase()
		this.init()
	}

	init() {
		this.app.use(json())
		this.app.use(urlencoded({ extended: true }))
		this.app.use(helmet())
		this.app.use(cors())
		this.app.get('/', (req, res) => Client.handleResponse({
			res: res,
			data: 'Yay!!, it\'s working'
		}))
		this.app.use('/auth', auth_routes)
		// this.app.use('/wallet', wallet_routes)
		this.app.use('/users', user_routes)
		this.app.use('/mail', mail_routes)
		this.app.use('/contract', contract_routes)
		this.app.use('/ipfs', ipfs_routes)
		this.app.use('/tx', tx_routes)
		this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`))
	}

	firebase() {
		//Firebase configuration

		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: `${process.env.firebase_database_url}`
		})

		const database = admin.firestore();
		database.settings({ ignoreUndefinedProperties: true });
	}

	// mongodb(){

	// 	mongoose.set('useCreateIndex', true)
	// 	mongoose.set('useFindAndModify', false)
	// 	mongoose.set('useNewUrlParser', true)
	// 	mongoose.set('useUnifiedTopology', true)
	// 	mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`)
	// 		.then(() => console.log('MongoDB: Connection established succesfully!!'))
	// 		.catch(err => console.error(`MongoDB: ${err.message}`))
	// }

	// async orbitdb() {

	// 	try {
	// 		const ipfsOptions = {
	// 		  EXPERIMENTAL: {
	// 			pubsub: true
	// 		  }
	// 		};

	// 		const ipfs = await IPFS.create();
	// 		const orbitdb = await OrbitDB.createInstance(ipfs, {
	// 			directory: './database'
	// 		});
	// 		console.log(orbitdb.identity.id);

	// 		const db = await orbitdb.create("test", "keyvalue", {
	// 		  overwrite: true,
	// 		  replicate: true,
	// 		  accessController: {
	// 			  type: "ipfs",
	// 			  write: ["*"]
	// 		  }
	// 		});
	// 		console.log(db.address.toString())

	// 		await db.put("hello", "world")
	// 		await db.put("orbitdb", "maybe")
	// 		console.log(db.all)

	// 		await db.close()

	// 	} catch (error) {
	// 		console.trace(error);
	// 		process.exit(1);
	// 	}

	// }
}

const app = express()
new Server(process.env.PORT || 3000, app)