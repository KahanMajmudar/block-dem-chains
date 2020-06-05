import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { Client } from './services'
import auth_routes from './middlewares/middleware_routes'
import wallet_routes from './api/hdwallet/wallet_routes'
import user_routes from './api/users/user_routes'
import mail_routes from './api/mail/mail_routes'
const cors = require('cors')

class Server {

	constructor(port, app) {
		this.port = port
		this.app = app
		this.mongodb()
		this.init()
		// this.error = new ErrorService()
    }

	init() {
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))
		this.app.use(helmet())
		this.app.get('/', (req, res) => Client.handleResponse({
			res: res,
			data: 'Yay!!, it\'s working'
		}))
		this.app.use('/auth', auth_routes)
		this.app.use('/wallet', wallet_routes)
		this.app.use('/users', user_routes)
		this.app.use('/mail', mail_routes)
		// this.app.use( (err, req, res, next) => {
		// 	const isOperationalError = this.error.handleError({
		// 		res: res,
		// 		err: err.description,
		// 		data: {
		// 			type: err.commonType
		// 		}
		// 	})
		// 	if (!isOperationalError) {
		// 		next(err)
		// 	}
		// })
		// process.on('uncaughtException', err => {
		// 	throw err
		// })
		// process.on('unhandledRejection', err => {
		// 	throw err
		// })
		this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`))
	}

	mongodb(){

		mongoose.set('useCreateIndex', true)
		mongoose.set('useFindAndModify', false)
		mongoose.set('useNewUrlParser', true)
		mongoose.set('useUnifiedTopology', true)
		mongoose.connect('mongodb://localhost/block_dem_chains')
			.then(() => console.log('MongoDB: Connection established succesfully!!'))
			.catch(err => console.error(`MongoDB: ${err.message}`))
	}
}

const app = express()
app.use(cors())
new Server(process.env.PORT || 3000, app)