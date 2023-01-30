const fs = require('fs')
const path = require('path')
const { env } = require('process')

const projectBasePath = process.cwd()

function init () {
    console.log("Initializing Apiarius...")
    env["ES_MODULE"] = true
    // Create folder structure
    
    createController()
    createRouter()
}

function createController () {
    createFolder(projectBasePath, 'controller')
}

function createRouter () {
    createFolder(projectBasePath, 'routes')
    createRouterIndex(projectBasePath)
    createRoutersTemplate()
}

function createFolder (basePath, newDir) {
    const path = `${basePath}/${newDir}`
    if(!fs.existsSync(path)){
        fs.mkdir(path, (err) => {
            if(err){
                console.error(err)
            }
        })
    } else {
        console.log("Controller folder already exists")
    }
}

function createRouterIndex (basePath) {
    const path = `${basePath}/routes/index.js`
    const template = require('./templates/router')
    const content = template({
        ESModule: false
    })
    fs.writeFile(path, content, (err) => {
        if(err){
            console.log(err)
        }
    })
}

function createRoutersTemplate() {
    const projectBasePath = process.cwd()
    const path = `${projectBasePath}\\routes\\routers.js`
    const content = require('../make/templates/routers')()
    fs.writeFile(path, content, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = init