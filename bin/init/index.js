const fs = require('fs')
const fileWriter = require('../utils/fileWriter')

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { EXPRESS_VERSION, NODE_DEV_VERSION } = require('../config/constants')
const argv = yargs(hideBin(process.argv)).argv

const projectBasePath = process.cwd()

const init = () => {
    console.log("Initializing Apiex...")
    process.env.ES_MODULE = argv.es_module !== undefined? argv.es_module === 'true' : true
    process.env.PORT = argv.port !== undefined? argv.port : 4000
    setPackageConfig()
    createMain()
    createSrcDirectory()
    createApp()
    createController()
    createRouter()
}

const createMain = () => {
    const packageConfigFile = fs.readFileSync(`${process.cwd()}/package.json`)
    const packageConfigContent = JSON.parse(packageConfigFile)
    const mainFilePath = packageConfigContent.main?? `${process.cwd()}/index.js`

    const template = require('../templates/main')
    const content = template()
    fileWriter(mainFilePath, content, (err) => {
        if(err){
            console.log(err)
        }
    })
}

const createSrcDirectory = () => {
    createFolder(projectBasePath, 'src')
}

const createApp = () => {
    const appPath = `${process.cwd()}/src/app.js`
    const template = require('../templates/app')
    const content = template()
    fileWriter(appPath, content, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

const createController = () => {
    createFolder(projectBasePath, 'src/controllers')
}

const createRouter = () => {
    createFolder(projectBasePath, 'src/routes')
    createRouterIndex(projectBasePath)
    createRoutersTemplate()
}

const createFolder = (basePath, newDir) => {
    const path = `${basePath}/${newDir}`
    if(!fs.existsSync(path)){
        fs.mkdir(path, (err) => {
            if(err){
                console.error(err)
            }
        })
    } else {
        console.log(`${newDir} folder already exists`)
    }
}

const createRouterIndex = (basePath) => {
    const path = `${basePath}/src/routes/index.js`
    const routerContent = require('../templates/router')()
    fileWriter(path, routerContent)
}

const createRoutersTemplate = () => {
    const projectBasePath = process.cwd()
    const path = `${projectBasePath}/src/routes/routers.js`
    const routersContent = require('../templates/routers')()
    fileWriter(path, routersContent)
}

const setPackageConfig = () => {
    const packagePath = `${process.cwd()}/package.json`
    fs.readFile(packagePath, (err, data) => {
        if (err) {
            console.log("Error on reading the package.json file. Check if you are in your project root and the file exists")
            return
        } else {
            const packageContent = JSON.parse(data)
            packageContent.dependencies['express'] = EXPRESS_VERSION
            packageContent.dependencies['node-dev'] = NODE_DEV_VERSION
            packageContent.scripts['dev:server'] = 'node-dev ./index.js'
            console.log(process.env.ES_MODULE)
            if(process.env.ES_MODULE === 'true'){
                console.log("Setting type")
                packageContent["type"] = "module"
            }
            fs.writeFile(packagePath, JSON.stringify(packageContent, null, 4), (err) => {
                if(err){
                    console.log(err)
                }
            })
        }
    })
}

module.exports = init