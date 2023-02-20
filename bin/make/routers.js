const fs = require('fs')
const getBaseTemplate = require('../templates/routers')

/**
 * @param {string} route
 * @param {string} router 
 */

const secondaryRouterTemplate = (newRouter) => {
    
    const projectBasePath = process.cwd()
    const filePath = `${projectBasePath}\\src\\routes\\routes.js`

    const template = getTemplate(filePath)

    return template

}

const getTemplate = (filePath) => {
    let fileString
    
    if(fs.existsSync(filePath)){
        fileString = fs.readFileSync(filePath)
    } else {
        fileString = getBaseTemplate()
    }
    
    return fileString
}



module.exports = secondaryRouterTemplate