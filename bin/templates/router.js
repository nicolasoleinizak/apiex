const { importFormatter, exportFormatter } = require("../utils/importExportFormatter")

const routerTemplate = () => {

    return (
        
`${importFormatter('express', 'express', true, true)}
${importFormatter('nestedRouters', './routers')}

const router = express.Router()

nestedRouters.forEach((nestedRouter) => {
    router.use(nestedRouter[0], nestedRouter[1])
})

${exportFormatter('router')}`
    )
}
    
module.exports = routerTemplate