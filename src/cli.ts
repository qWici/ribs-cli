#!/usr/bin/env node

import {program} from "commander";
import clear from "clear";
import figlet from "figlet";
import {generate} from "./commands/generate";

clear();
console.log(
    figlet.textSync('ribs-cli', { horizontalLayout: 'full' })
)

program
  .name('RIBs-cli')
  .description('CLI for generating RIBs modules')

program
  .command('generate')
  .description('Generate RIBs module')
  .alias('g')
  .argument('name', 'Name of the module')
  .action(generate)

program.parse()
