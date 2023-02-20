const fs = require('fs')
const path = require('path')
const promptSync = require('prompt-sync')()

const writeFile = (path, data) => {
    fs.writeFileSync(path, data)
    console.log(`File ${path} created`)
}

const fileWriter = (initialPath, data) => {
    const normalizedPath = path.normalize(initialPath)
    if(fs.existsSync(path)){
        const response = promptSync(`The file ${normalizedPath} already exists. Do you want to overwrite it? `)
        if(response[0].toLowerCase() !== 'y'){
            console.log("The file was not created")
            return
        }
    }
    writeFile(normalizedPath, data)
    return
}

module.exports = fileWriter