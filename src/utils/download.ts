let fs = require('fs')

export default function download(url: string, dest: string) {
  return new Promise((resolve: () => void, reject:(error: Error) => void) => {
    var file = fs.createWriteStream(dest)
    const http = url.startsWith('https') ? require('https') : require('http')
    var request = http.get(url, function (response: any) {
      response.pipe(file)
      file.on('finish', function () {
        file.close(resolve)  // close() is async, call cb after close completes.
      })
    }).on('error', function (err: Error) { // Handle errors
      fs.unlink(dest) // Delete the file async. (But we don't check the result)
      reject(err)
    })
  })
}