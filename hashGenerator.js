const { createHash } =require( "crypto")
const { createReadStream } =require ("fs")

function hashFile(file, algorithm = "sha512", encoding = "base64", options) {
  return new Promise((resolve, reject) => {
    const hash = createHash(algorithm)
    hash
      .on("error", reject)
      .setEncoding(encoding)

    createReadStream(file, {...options, highWaterMark: 1024 * 1024 /* better to use more memory but hash faster */})
      .on("error", reject)
      .on("end", () => {
        hash.end()
        resolve(hash.read())
      })
      .pipe(hash, {end: false})
  })
}
const fileName='1TokenT0-Setup-1.5.4.exe'
hashFile(fileName,algorithm = "sha256",'hex').then(res=>{console.log('sha2',res)})
hashFile(fileName,algorithm = "sha512",'base64').then(res=>{console.log('sha512',res)})
