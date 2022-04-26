/* eslint-disable */

const { writeFile } = require('fs')
const process = require('process')
const { entryFile } = require('../templates/index')

const dir = process.cwd()

function write(filePath, value) {
   return new Promise((resolve, reject) => {
      writeFile(
         filePath,
         value,
         {
            encoding: 'utf-8',
            flag: 'w',
         },
         err => {
            if (err) reject(err)

            resolve()
         }
      )
   })
}

class Generator {
   constructor({ routes, controllers }) {
      this.routes = routes
      this.controllers = controllers
   }

   checkRoutes() {
      if (!this.routes) throw 'Template file - Routes Property not found.'
   }

   checkControllers() {
      if (!this.controllers) throw 'Template file - Controllers Property not found.'
   }

   async generateBase() {
      try {
         this.checkRoutes()

         let content = entryFile(this.routes)

         let path = dir + '/sample.js'

         await write(path, content)
      } catch (error) {
         throw error
      }
   }

   async generateRoutes() {}

   async generateControllers() {}

   async generate() {}
}

module.exports = Generator
