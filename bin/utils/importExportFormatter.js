/**
 * 
 * @param {string} moduleName 
 * @param {string} relativeLocation 
 * @param {boolean} isDefault
 * @returns {string}
 */

const importFormatter = (moduleName, relativeLocation, isDefault = true, isPackage = false) => {
    const ES_MODULE = process.env.ES_MODULE === 'true'

    const fileExtension = isPackage? '' : '.js'
    
    if(ES_MODULE){
        if(isDefault){
            return `import ${moduleName} from '${relativeLocation}${fileExtension}'\n`
        } else {
            return `import { ${moduleName} } from '${relativeLocation}${fileExtension}'\n`
        }
    } else {
        if(isDefault){
            return `const ${moduleName} = require('${relativeLocation}')\n`
        } else {
            return `const { ${moduleName} } = require('${relativeLocation}')\n`
        }
    }
}

/**
 * 
 * @param {string} moduleName 
 * @param {boolean} isDefault
 * @return {string} 
 */

const exportFormatter = (moduleName, isDefault = true) => {
    const ES_MODULE = process.env.ES_MODULE === 'true'
    if(ES_MODULE){
        if(isDefault){
            return `export default ${moduleName}`
        } else {
            return `export { ${moduleName} }`
        }
    } else {
        if(isDefault){
            return `module.exports = ${moduleName}`
        } else {
            return `exports.${moduleName} = ${moduleName}`
        }
    }
}

exports.importFormatter = importFormatter
exports.exportFormatter = exportFormatter