const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')


export class IpfsController {

    createDb = async() => {

        try {
            const ipfsOptions = {
                EXPERIMENTAL: {
                  pubsub: true
                }
            }

            const ipfs = await IPFS.create(ipfsOptions)
            // console.log(await ipfs.id())
            const orbitdb = await OrbitDB.createInstance(ipfs)
            // console.log(orbitdb)
            // console.log(orbitdb.identity._publicKey.toString('hex'))
            console.log(orbitdb.identity.id)

            const db = await orbitdb.create('test', 'keyvalue',{
                overwrite: true,
                replicate: true,
                accessController: {
                    type: 'ipfs',
                    write: ['*']
                }
            })

            await db.access.grant('write', orbitdb.identity.id)
            // const db = await orbitdb.open('/orbitdb/zdpuB2ksoCk8RATvEqEXLJYZQYuBj53YwcGZWMhhU8McBvXMA/bdc1')
            await db.set('hello', 'world')
            console.log(db.all)


        } catch (error) {
            console.trace(error)
            process.exit(1)

        }
    }

}

