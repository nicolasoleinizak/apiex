const fs = require('fs')
const getBaseTemplate = require('./templates/routers')

/**
 * @param {string} route
 * @param {string} router 
 */

function secondaryRouterTemplate (newRouter) {
    
    const projectBasePath = process.cwd()
    const filePath = `${projectBasePath}\\routes\\routes.js`

    const template = getTemplate(filePath)

    return template

}

function getTemplate (filePath) {
    let fileString
    
    if(fs.existsSync(filePath)){
        fileString = fs.readFileSync(filePath)
    } else {
        fileString = getBaseTemplate()
    }
    
    return fileString
}

function getTemplateWithNewRouter(template, newRouter){
    const routersString = template.match(/const routers *= *\[(.*)\]/s)
    const cleanRoutersString = routersString[1].replace(/(\n)/gm, "").trim()
    if(cleanRoutersString !== ''){
        const routers = cleanRoutersString.split(',')
        if(routers){
            const routersString = routers.map((router) => `  ${router}\n`)
            const newRoutersString = `${routersString},\n  ${newRouter}`
            const newTemplate = getBaseTemplate(newRoutersString)
            return newTemplate
        }
    }
    return getBaseTemplate(`  ${newRouter}`)
}

module.exports = secondaryRouterTemplate