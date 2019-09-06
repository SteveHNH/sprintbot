const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    });

function startSprint(msg) {
    msg.channel.send(`The Sprint has **BEGUN**. \n You have **15** minutes to write as much as you can. GO GO GO!`)
}

function noSprint(msg) {
    msg.channel.send(`No sprint is currently running. Start a sprint with \`!sprint\``);
}

client.on('message', msg => {
    if (msg.author.bot) return;
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const member = msg.author;
    let sprintActive = false;
    if (command === "sprint") {
        msg.channel.send(`${member} has started a sprint.\n**JOIN THE SPRINT**\nThe next sprint runs for 15 minutes and will begin in 60 seconds. \`!join 𝑛\` to start with a word count of \`𝑛\`, or just \`!join\``)
        sprintActive = true;
        setTimeout(startSprint, 60000, msg);
    }

    if (command === "join") {
        if (sprintActive) {
            let wc = args[0];
            msg.channel.send(`${member} has joined the sprint with ${wc} words.`)
        } else {
            noSprint(msg);
        }
    }

    if (command === "wc") {
        if (sprintActive) {
            let wc = args[0];
            msg.channel.send(`${member} has registred ${wc} words during this sprint.`)
        } else {
            noSprint(msg);
        }
    }
})

client.login(config.token);

console.log(client)