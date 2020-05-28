import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { Client } from './services'

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
		this.app.get('/', (_req, res) => Client.handleResponse({res, data: 'Yay!!, it\'s working'}))
		// this.app.use( (err, req, res, next) => {
		// 	const isOperationalError = this.error.handleError({
		// 		res: res,
		// 		err: err.description,
		// 		data: {
		// 			type: err.commonType
		// 		}
		// 	});
		// 	if (!isOperationalError) {
		// 		next(err);
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

		mongoose.set('useCreateIndex', true);
		mongoose.set('useFindAndModify', false);
		mongoose.set('useNewUrlParser', true)
		mongoose.set('useUnifiedTopology', true)
		mongoose.connect('mongodb://localhost/universal_wallet')
			.then(() => console.log('MongoDB: Connection established succesfully!!'))
			.catch(err => console.error(`MongoDB: ${err.message}`))
	}
}

const app = express()
new Server(process.env.PORT || 3000, app)