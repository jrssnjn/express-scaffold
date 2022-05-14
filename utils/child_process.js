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

module.exports = { saveDependencies }
