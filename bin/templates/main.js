const { importFormatter, exportFormatter } = require('../utils/importExportFormatter')

const mainTemplate = () => {
    const PORT = process.env.PORT || 4000
    return (
`${importFormatter('app', './src/app')}

const { PORT = ${PORT} } = process.env;

app.listen(PORT, () => {
    console.log('Server is listening on port ${PORT}')
})

${exportFormatter('app')}
`
    )
}

module.exports = mainTemplate
