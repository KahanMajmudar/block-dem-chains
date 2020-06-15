import { promises as fs } from 'fs'
import * as path from 'path'
import all from 'it-all'
import IpfsHttpClient from 'ipfs-http-client'
const IPFS = require('ipfs')
// const ipfs = IpfsHttpClient({ host: 'gateway.ipfs.io', port: 443, protocol: 'https' })
// const ipfs = IpfsHttpClient('/ip4/x.x.x.x/tcp/5001')

export class IpfsController {

    postResource = async() => {

        try {
            const node = await IPFS.create()
            console.log(node)
            // const version = await node.version()
            // console.log('‘Version:’', version.version)
            const new_path = path.join(__dirname, '..', 'mail', 'bdc-logo.jpg')
            // console.log(new_path)
            console.log(await all(node.files.ls('/')))
            // const result = await all (node.files.read('QmcNVnFMBqyrYhVLojj2Y1tAyJZVzdhGTEp8U9kWTKr3zF'))
            console.log(result)
            // const file = await fs.readFile(new_path)
            // // const cid = await all(node.add(file))
            // await node.files.mkdir('/' + 'logo')
            // console.log('MKDIR done............................')
            // const cid = await (node.files.write('/' + 'logo', Buffer.from('Hello World!')))
            // console.log(cid)
            await node.stop()
        } catch (error) {
            // console.log(error)
            console.trace(error)

        }
    }

}

