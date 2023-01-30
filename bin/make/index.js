const { makeRouter } = require("./router")

function make (subcommand, argv) {
    switch(subcommand){
        case 'router':
            if(!argv.name){
                throw new Error('You must specify a router name')
            }
            makeRouter(argv.name)
            break
        default:
            throw new Error('The specified make command does not exists')
    }
}

exports.make = make