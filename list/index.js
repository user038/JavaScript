#!/usr/bin/env node

// const { rejects } = require('assert');
const fs = require('fs');
// const { resolve } = require('path');
// const    util = require('util');
const chalk = require('chalk');
//  import { chalk } from ('chalk');
// const chalk = (...args) => import('node-chalk').then(({default:chalk})=>chalk(...args));

// Method #2
// const lstat = util.promisify(fs.lstat)

//Method #3
const {lstat} = fs.promises;

fs.readdir(process.cwd(),async(err,filenames)=>{
     if(err){
         console.log(err); 
    }

   const statPromises = filenames.map((i)=>{
    return lstat(i);
   })

   const allStats = await Promise.all(statPromises);

   for(let stats of allStats){
    const index = allStats.indexOf(stats);
    if(stats.isFile()){
        console.log(chalk.green(filenames[index]),stats.isFile())
    }else{
        console.log(chalk.bold(filenames[index]),stats.isFile())
    }
   }
});

//Method #1
// const lstat = (filename)=>{
//     return new Promise((resolve,rejects)=>{
//         fs.lstat(filename,(err,stats)=>{
//             if(err){
//                 rejects(err);
//             }
//             resolve(stats);
//         })
//     })
// }
