#!/usr/bin/env node
// console.log('i was executed');

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');
// const chalk = require('chalk');

const fsPromises = fs.promises;

program
    .version('1.0.0')
    .argument('[filename]','Name of a file to execute')
    .action( async ({ filename })=>{
        const name = filename || 'index.js';

        try{
        await fsPromises.access(name);
        }catch(e){
            throw new Error('could not find the file' + `${name}`);
        }

        let proc;
        const start = debounce(() =>{
            if(proc){
                proc.kill();
            }
            console.log('>>>>Starting process...' );
            proc = spawn('node',[name], { stdio : 'inherit' } );
        } , 100 );
        
        const watchit = chokidar.watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start);
    })

program.parse(process.argv);




