const fs = require('fs')
const chalk = require('chalk')
const yaml = require('js-yaml')
const Generator = require('../classes/Generator')

async function generate({ template }) {
   try {
      let doc = yaml.load(fs.readFileSync(template, 'utf-8'))
      let { routes, controllers } = doc
      let gen = new Generator({ routes, controllers })

      await gen.generate()
   } catch (error) {
      console.log(chalk.red(error))
   }
}

module.exports = generate
