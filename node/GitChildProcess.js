/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global exports, require */

(function () {
    "use strict";
    
    var childProcess = require("child_process"),
        spawn = childProcess.spawn;
    
    var DOMAIN = "gitManager",
        RUN_COMMAND = "runCommand";
    
    function runCommand(command, directoryPath, cb) {
        if (!/^git /.test(command)) {
            throw new Error("No arbitrary executions with git-integration please!");
        }
        
        console.log(command.split(' '));
        
        var acmd = command.match(/[a-zA-Z0-9_\\\/\.\-]+|'[^']+'|"[^"]+"/g),
            git = acmd.shift(), // this should be git, or we have a problem
            proc,
            error = "",
            output = "";
        
        proc = spawn(git, acmd, {cwd: directoryPath});
        
        proc.stdout.on("data", function (data) {
            output += data;
        });
        
        proc.stderr.on("data", function (err) {
            error += err;
        });
        
        proc.on("close", function (code) {
            output += "\n" + command + " completed with exit code " + code;
            cb(error, output);
        });
    }
    
    exports.init = function (DomainManager) {
        if (!DomainManager.hasDomain("gitManager")) {
            DomainManager.registerDomain("gitManager", {major: 0, minor: 1});
        }
        
        DomainManager.registerCommand(
            DOMAIN,
            RUN_COMMAND,
            runCommand,
            true,
            "Runs an arbitrary Git command.",
            [
                {
                    name: "command",
                    type: "string",
                    description: "Command to run"
                }
            ],
            [
                {
                    name: "confirmation",
                    type: "object",
                    description: "Returns command executed and the folder passed in"
                }
            ]
        );
    };
}());