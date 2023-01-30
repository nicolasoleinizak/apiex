/**
 * 
 * @param { object } props 
 * @param { boolean } props.ESModule
 * @returns 
 */

function routerTemplate ({ESModule}) {

    const imports = () => ESModule
        ? `import Router from 'express-router'\nimport nestedRouters from './routers'`
        : `const Router = require('express-router')\nconst nestedRouters = require('./routers')`
    return (`${imports()}

const router = Router()

nestedRouters.forEach((nestedRouter) => {
    router.use(nestedRouter[0], nestedRouter[1])
})

exports.router = router`
    )
}
    
module.exports = routerTemplate