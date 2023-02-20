const { exportFormatter, importFormatter } = require("../utils/importExportFormatter")

const routersTemplate = (routers = []) => {

const routersDeclaring = routers.map((router) => {
    return `  ['${router[0]}', ${router[1]}]`
})

const routersImports = routers.map((router) => {
    return `${importFormatter(router[1], `./${router[1]}`)}`
})

    return (

// *************** TEMPLATE ****************
`${routersImports.join('')}

const routers = [
${routersDeclaring.join(',\n')}
]

${exportFormatter('routers')}
`
// *****************************************

    )
}

module.exports = routersTemplate