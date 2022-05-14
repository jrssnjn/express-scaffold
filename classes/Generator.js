const { writeFile, access, mkdir, constants } = require('fs')
const { entryFile, routeFile, packageFile } = require('../templates/index')
const { saveDependencies, formatFiles } = require('../utils/child_process')
const process = require('process')
const chalk = require('chalk')
const log = console.log

const dir = process.cwd()

class Generator {
   constructor({ routes, controllers, app }) {
      this.routes = routes
      this.controllers = controllers
      this.app = app
   }

   checkRoutes() {
      if (!this.routes) throw 'Template file - Routes Property not found.'
   }

   checkControllers() {
      if (!this.controllers)
         throw 'Template file - Controllers Property not found.'
   }

   write(filePath, value) {
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

   checkFolderIfExist(path) {
      return new Promise((resolve, reject) => {
         access(path, constants.R_OK | constants.W_OK, err => {
            // err = folder does not exist, so we resolve false.
            if (err) resolve(false)

            reject(
               'Express Scaffold - Routes folder already exists, values will be overriden'
            )
         })
      })
   }

   createFolders(path) {
      return new Promise((resolve, reject) => {
         mkdir(path, err => {
            if (err) reject(err)

            resolve()
         })
      })
   }

   makeDirectory(path) {
      return Promise.all([
         this.checkFolderIfExist(path),
         this.createFolders(path),
      ]).catch(error => log(chalk.red(error)))
   }

   async generateBase() {
      try {
         this.checkRoutes()

         let content = entryFile(this.routes)

         let path = `${dir}/index.js`

         await this.write(path, content)
      } catch (error) {
         log(chalk.red(error))
      }
   }

   async generateRoutes() {
      try {
         this.checkRoutes()

         let basePath = `${dir}/routes`

         await this.makeDirectory(basePath)

         Object.keys(this.routes).forEach(async route => {
            let content = routeFile(this.routes[route])
            let path = `${basePath}/${route}.js`

            await this.write(path, content)
         })
      } catch (error) {
         log(chalk.red(error))
      }
   }

   async generateControllers() {}

   async generatePackageJSONFile() {
      try {
         let path = `${dir}/package.json`

         await this.write(path, packageFile({ ...this.app }))
      } catch (error) {
         log(chalk.red(error))
      }
   }

   async generate() {
      // intended to run sequentially to avoid missing files upon error.

      await this.generatePackageJSONFile()
      await this.generateRoutes()
      await this.generateBase()
      await saveDependencies(['express'], false)
      await formatFiles()

      log(
         chalk.green(
            'Succesfully generated index.js, package.json, and route files.'
         )
      )
   }
}

module.exports = Generator
