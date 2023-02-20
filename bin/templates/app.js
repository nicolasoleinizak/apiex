
const { importFormatter, exportFormatter } = require('../utils/importExportFormatter')

const appTemplate = () => {

    return (
`${importFormatter('express', 'express', true, true)}${importFormatter('router', './routes/index')}
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(\`(\${res.statusCode}) \${req.method} - \${req.path}\`)
    })
    next()
})

app.use('/', router)

${exportFormatter('app')}
`
    )
}

module.exports = appTemplate