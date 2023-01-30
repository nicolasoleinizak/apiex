#! /usr/bin/env node

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const init = require('./init/index')
const { make } = require('./make/index')
const argv = yargs(hideBin(process.argv)).argv

const command = argv._[0]

// The directory from where the process was called
const currentDirectory = process.cwd()

try {
    if (command === 'init') {
        init()
    } 
    else if (command.match(/make:*/)){
        const subcommand = command.match(/make:(.*)/)[1]
        make(subcommand, argv)
    }
    else {
        console.log(`Error: the command '${command}' doesn't exists`)
    }
} catch (error) {
    console.log(error)
}