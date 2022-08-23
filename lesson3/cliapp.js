#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const currentDirectory = process.cwd();


const commander = (dir) => {
    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile();
    }

    const list = ['...']
    
    list.push(...fs.readdirSync(dir))

    inquirer
        .prompt([{
            name: "fileName",
            type: "list",
            message: "Choose file:",
            choices: list,
        }, ])
        .then((answer) => {

            if (answer.fileName === '...') {
                process.chdir('../')
                const newPath = process.cwd()
                return commander(newPath)
            }

            const filePath = path.join(dir, answer.fileName)

            if (isFile(filePath)) {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    console.log(data);
                });
            } else {
                const newPath = path.join(dir, answer.fileName)
                commander(newPath)
            }

        })
}

commander(currentDirectory)