const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')


export class IpfsController {

    getDb = async(req, res) => {

        try {
            const ipfsOptions = {
                EXPERIMENTAL: {
                  pubsub: true
                }
            };
            const new_ipfs = await IPFS.create(ipfsOptions)
            console.log('connecting to swarm..................')
            await new_ipfs.swarm.connect('/ip4/54.224.122.0/tcp/4002/ipfs/QmRb73Ss1W84rU2vAvJ2UjhXmjbrrHT4CrMbEoBuYkXfd8')
            // await new_ipfs.bootstrap.add('/ip4/54.224.122.0/tcp/4002/ipfs/QmRb73Ss1W84rU2vAvJ2UjhXmjbrrHT4CrMbEoBuYkXfd8')
            console.log('connection done................')
            const new_orbitdb = await OrbitDB.createInstance(new_ipfs, {
                directory: './new_database'
            })

            const new_db = await new_orbitdb.keyvalue(req.body.address)
            console.log('new_db created')
            await new_db.load()
            console.log(new_db.all)
            new_db.events.on('replicated', () => {
                console.log('yup, it replicated.................')
                console.log(db.all)
            })

        } catch (error) {
            console.trace(error)
            process.exit(1)

        }
    }

}

