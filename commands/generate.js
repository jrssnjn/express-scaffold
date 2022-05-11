const fs = require('fs')
const yaml = require('js-yaml')
const Generator = require('../classes/Generator')

async function generate({ template }) {
   let doc = yaml.load(fs.readFileSync(template, 'utf-8'))
   let { routes, controllers, app } = doc
   let gen = new Generator({ routes, controllers, app })

   await gen.generate()
}

module.exports = generate
