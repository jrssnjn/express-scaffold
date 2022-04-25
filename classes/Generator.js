/* eslint-disable */

const { appendFile } = require('fs')
const process = require('process')

const dir = process.cwd()

class Generator {
   constructor({ routes, controllers }) {
      this.routes = routes
      this.controllers = controllers
   }

   generateBase() {}

   generateRoutes() {}

   generateControllers() {}

   generate() {}
}

module.exports = Generator
