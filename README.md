# Apiex

Apiex is an command line interface (CLI) that can help to to initialize the basic structure for ExpressJs projects.

The CLI has two commands so far, but will grow and incorporate news feature that makes your dev-time easier.

## **Init**

Initialize the project with basic folder structure and main files. This scaffolding must be enough to make your server alive.

### Command:

1) Init your node project. Choose whatever you need:

`npm init`

2) Init your Express project with Apiex

`apiex init [options]`

#### Options: 

`es_module` [optional] - Wheter to create imports/exports with ESM or CommonJS. Default: "true"

`port` [optional] - Port where to serve the project. Default: 4000

Example:

`apiex init --es_module=false --port=3000`

## **Make router**

Creates a new router in the 'routes' folder and imports it on 'routes/routers.js'. That makes the new router automatically available on your server.

### Command

`apiex make:router [name] [path]`

#### Options:

`name` [required] - Name of the router, that will be used also for the file name.

`path` [required] - Relative path to the route handlered by the new router.

Example:

`apiex make:router --name=exampleRouter --path=/example`

