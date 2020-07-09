const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')


export class IpfsController {

    getDb = async(req, res) => {

        try {
            const ipfsOptions = {
                EXPERIMENTAL: {
                  pubsub: true
                },
                relay: {
					enabled: true, // enable circuit relay dialer and listener
					hop: {
					  enabled: true // enable circuit relay HOP (make this node a relay)
					}
                },
                repo: `./${process.env.IPFS_REPO}`
            };
            const new_ipfs = await IPFS.create(ipfsOptions)
            console.log('connecting to swarm..................')
            await new_ipfs.swarm.connect(process.env.MASTER_NODE)
            console.log('connection done................')
            const new_orbitdb = await OrbitDB.createInstance(new_ipfs, {
                directory: `./${process.env.ORBITDB_REPO}`
            })

            const new_db = await new_orbitdb.keyvalue(req.body.address)
            console.log('new_db created')
            await new_db.load()
            // console.log(new_db.all)
            new_db.events.on('replicated', () => {
                console.log('yup, it replicated.................')
                console.log(new_db.all)
            })

        } catch (error) {
            console.trace(error)
            process.exit(1)

        }
    }

}

