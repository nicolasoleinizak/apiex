/**
 * 
 * @param { object } props
 * @param { string } props.routerName The router name 
 * @param { boolean } [true] props.ESModule If using ESModule or not
 * @returns { string } 
 */

function routerTemplate ({ESModule = true, routerName}) {
    let importsString
    let exportsString
    if(ESModule){
        importsString = `import Router from 'express-router'`
        exportsString = `export { ${routerName } }`
    } else {
        importsString = `const Router = require('express-router')`
        exportsString = `module.${routerName} = ${routerName}`
    }

    return (
`${importsString}

const ${routerName} = Router()

// Describe your routes here, or use other routers

${exportsString}
`)
}

module.exports = routerTemplate