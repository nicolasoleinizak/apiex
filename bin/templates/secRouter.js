const { exportFormatter, importFormatter } = require("../utils/importExportFormatter")

/**
 * 
 * @param { object } props
 * @param { string } props.routerName The router name 
 * @returns { string } 
 */


const routerTemplate = ({routerName}) => {

    return (
`${importFormatter('express', 'express')}

const ${routerName} = express.Router()

// Describe your routes here, or use other routers

${exportFormatter(routerName)}
`)
}

module.exports = routerTemplate