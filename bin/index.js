#! /usr/bin/env node

const yargs = require('yargs')
const init = require('./init/index')
const { makeRouter } = require('./make/index')

const argv = yargs(process.argv.slice(2))

argv
    .command('init [es_module] [port]', 'Initialize your Express project', (yargs) => {
        return yargs
            .usage("Usage: init [options]")
            .option('es_module', {
                describe: 'Whether to use import/export from ES Modules [true]',
                default: 'true'
            })
            .option('port', {
                description: 'Port where to serve the app',
                default: 4000
            })
    }, (argv) => {
        init()
    })
    .command('make:router', 'Generate a router file', (yargs) => {
        return yargs
            .usage("Usage: make:router [options]")
            .option('name', {
                describe: 'Router name',
                type: 'string',
                alias: 'n'
            })
            .option('path', {
                describe: 'Relative path',
                type: 'string',
                alias: 'p',
            })
            .demandOption(['name', 'path'])
    }, (argv) => {
        makeRouter(argv.name, argv.path)
    })
    .help('h')
    .alias('h', 'help')
    .argv