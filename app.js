#!/usr/bin/env node
const { program } = require('commander')
const generate = require('./commands/generate')

program
   .command('generate')
   .description('generate express files from yaml template')
   .option('-s, --template <template>', 'template file to be used.')
   .action(generate)

program.parse()
