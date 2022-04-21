const fs = require('fs')
/*eslint-disable */
const chalk = require('chalk')
const yaml = require('js-yaml')

function generate({ template }) {
   let doc = yaml.load(fs.readFileSync(template, 'utf-8'))
   console.log(doc)
}

module.exports = generate
