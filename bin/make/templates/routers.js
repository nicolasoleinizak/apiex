// A ESTO LE FALTA LOS IMPORTS

function routersTemplate (routers = '', isESModule = true) {

    let exportString
    
    if(isESModule){
        exportString = `export { routers }`
    } else {
        exportString = `module.exports = routers`
    }
    return (
`const routers = [
    ${routers}
]

${exportString}
`
    )
}

module.exports = routersTemplate