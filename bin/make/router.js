const fs = require('fs')
const template = require('./templates/router')

/**
 * 
 * @param { string } routerName 
 */

function makeRouter (routerName) {
    createFile(routerName)
    createImport(routerName)
}

function createFile (routerName) {
    const content = template({
        routerName: routerName,
        ESModule: true
    })
    const projectBasePath = process.cwd()
    const path = `${projectBasePath}/routes/${routerName}.js`
    fs.writeFile(path, content, () => {
        'Router created successfully'
    })
}

function createImport (routerName) {
    const template = require('./templates/routers')
    const content = template(routerName)
    const filePath = `${process.cwd()}\\routes\\routers.js`
    fs.writeFileSync(filePath, content, (err) => {
        throw new Error (err)
    })
}

exports.makeRouter = makeRouter