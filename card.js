#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:rickhc3@gmail.com");
                    console.log("\nDone, see you soon at inbox.\n");
                }
            },
            {
                name: `Access my ${chalk.blueBright.bold("LinkedIn")}.`,
                value: () => {
                    open("https://www.linkedin.com/in/ricardo-arantes/");
                    console.log("\nDone, see you soon at LinkedIn.\n");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://github.com/rickhc3/npx_card/raw/master/resume/Profile.pdf').pipe(fs.createWriteStream('./rickhc3-resume.pdf'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'rickhc3-resume.pdf')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            /* {
                name: `Schedule a ${chalk.redBright.bold("Meeting")}?`,
                value: () => {
                    open('https://calendly.com/anmol098/30min');
                    console.log("\n See you at the meeting \n");
                }
            }, */
            {
                name: "Just quit.",
                value: () => {
                    console.log("Hasta la vista.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("             Ricardo Arantes"),
    handle: chalk.white("@rickhc3"),/* 
    work: `${chalk.white("Lead Software Engineer at")} ${chalk
        .hex("#2b82b2")
        .bold("FootLoose Labs")}`, */
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("rickhc3"),
    github: chalk.gray("https://github.com/") + chalk.green("rickhc3"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("ricardo-arantes"),
    /* web: chalk.cyan("https://anmolsingh.me"), */
    npx: chalk.red("npx") + " " + chalk.white("rickhc3"),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        /* `${data.labelWork}  ${data.work}`, */
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        /* `${data.labelWeb}  ${data.web}`, */
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "I am currently looking for new opportunities,"
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic(
            "question or just want to say hi, I will try "
        )}`,
        `${chalk.italic(
            "my best to get back to you!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());
