/* eslint-disable */

const { writeFile, access, mkdir, constants } = require('fs')
const process = require('process')
const { entryFile, routeFile } = require('../templates/index')

const dir = process.cwd()

class Generator {
   constructor({ routes, controllers }) {
      this.routes = routes
      this.controllers = controllers
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

            reject('Express Scaffold - Routes folder already exists.')
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

   async generateBase() {
      try {
         this.checkRoutes()

         let content = entryFile(this.routes)

         let path = `${dir}/index.js`

         await this.write(path, content)
      } catch (error) {
         throw error
      }
   }

   async generateRoutes() {
      try {
         this.checkRoutes()
         let exists = await this.checkFolderIfExist(`${dir}/routes`)
         if (!exists) await this.createFolders(`${dir}/routes`)

         Object.keys(this.routes).forEach(async route => {
            let content = routeFile(this.routes[route])
            let path = `${dir}/routes/${route}.js`

            await this.write(path, content)
         })
      } catch (error) {
         throw error
      }
   }

   async generateControllers() {}

   async generate() {
      await Promise.allSettled([this.generateBase(), this.generateRoutes()])
   }
}

module.exports = Generator
