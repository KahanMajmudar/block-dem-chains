import IpfsHttpClient from 'ipfs-http-client'
const ipfs = IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

ipfs.add('http://www.ashidakim.com/zenkoans/zenindex.html').then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})

