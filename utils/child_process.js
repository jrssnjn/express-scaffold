const { exec } = require('child_process')

let saveDependencies = function run_npm_install(
   dependencies = ['express'],
   isDevDependency = false
) {
   return new Promise((resolve, reject) => {
      let list = dependencies.join(' ')
      list = isDevDependency ? list + ' -D' : list

      exec(`npm install ${list}`, error => {
         if (error) reject(error)

         resolve()
      })
   })
}

let formatFiles = function formatFiles() {
   return new Promise((resolve, reject) => {
      exec(`prettier --trailing-comma es5 --tab-width 3 --semi false --single-quote true --arrow-parens avoid --bracket-spacing true --write routes/* index.js`, error => {
         if (error) reject(error)

         resolve()
      })
   })
}

module.exports = { saveDependencies, formatFiles }
