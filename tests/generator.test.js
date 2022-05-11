let fs = require('fs')
let process = require('process')
const Generator = require('../classes/Generator')

let checkIfExists = function (path) {
   return new Promise((resolve, reject) => {
      fs.access(path, fs.constants.R_OK | fs.constants.W_OK, function (error) {
         if (error) {
            reject(false)
         }

         resolve(true)
      })
   })
}

let removeRecursively = function (paths) {
   return new Promise((resolve, reject) => {
      paths.forEach(path => {
         fs.rm(path, { recursive: true, force: true }, error => {
            if (error) reject(error)

            resolve()
         })
      })
   })
}

describe('Generator Class', () => {
   let gen
   let dir
   let paths

   beforeAll(() => {
      gen = new Generator({
         routes: { user: ['GET', 'POST', 'DELETE'], auth: ['GET', 'POST'] },
         controllers: {
            user: { getUser: [Object] },
            interests: { getInterest: [Object] },
         },
         app: {
            name: 'Sample Express Scaffolding Tool.',
            description: 'Generates express files.',
            author: 'Jairus San Juan',
            version: '1.0.0',
         },
      })

      paths = []

      dir = process.cwd()
   })

   test('GenerateBase function - creates entry / index file', async () => {
      await gen.generateBase()

      paths.push(`${dir}/index.js`)

      let does_exist = await checkIfExists(`${dir}/index.js`)

      expect(does_exist).toBe(true)
   })

   test('GenerateRoutes function - creates route directory and files', async () => {
      await gen.generateRoutes()

      let routePath = `${dir}/routes`

      paths.push(routePath)

      let does_exist = await checkIfExists(routePath)

      expect(does_exist).toBe(true)
   })

   afterAll(async () => {
      await removeRecursively(paths)
   })
})
