const fs = require('fs')
const getSecRouterTemplate = require('../templates/secRouter')
const getRoutersTemplate = require('../templates/routers')
const { importFormatter } = require('../utils/importExportFormatter')

/**
 * 
 * @param { string } routerName 
 */

const makeRouter = (routerName, path) => {
    createFile(routerName)
    updateRouters(routerName, path)
}

const createFile = (routerName) => {
    const content = getSecRouterTemplate({
        routerName: routerName
    })
    const projectBasePath = process.cwd()
    const path = `${projectBasePath}/src/routes/${routerName}.js`
    fs.writeFile(path, content, (err) => {
        if(err){
            console.log(err)
        }
        'Router created successfully'
    })
}

const updateRouters = (routerName, path) => {
    const routersContent = addRouterToRoutes(routerName, path)
    fs.writeFile(`${process.cwd()}/src/routes/routers.js`, routersContent, (err) => {
        if(err){
            console.log(err)
        }
    })
}
 
const addRouterToRoutes = (routerName, path) => {

    const data = fs.readFileSync(`${process.cwd()}/src/routes/routers.js`, 'utf8')

    const routersString = data.match(/const routers *= *\[(.*)\]/s)
    const cleanRoutersString = routersString[1].replace(/(\n)/gm, "").trim()

    const newRouter = [path, routerName]

    const routersWithNewRouterContent = getRoutersWithNewRouter(cleanRoutersString, newRouter)

    return routersWithNewRouterContent
}

const getRoutersWithNewRouter = (initialRoutersString, newRouter) => {
    if(initialRoutersString !== ''){
        // GET OUT OF THIS FUNCTION
        const routers = initialRoutersString
            .match(/(\[[^\[*][\d\w\s\n,'/?_-]*[^\]*]])/gs)
            .map((router) => {
                const matches = router.match(/(?:\[)(?:'|")(.*)(?:'|")(?:[\s]*,[\s]*)(.*)(?:])/)
                return [matches[1], matches[2]]
            })
        if(routers){
            const newRouters = routers.concat([newRouter])
            return getRoutersTemplate(newRouters)
        }
    }
    
    return getRoutersTemplate([newRouter])
}

exports.makeRouter = makeRouter