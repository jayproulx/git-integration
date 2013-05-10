/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, require, $, brackets, window, console */

define(function (require, exports, module) {
    "use strict";
    
    var //spawn = require("child_process").spawn,
        project = brackets.getModule("project/ProjectManager");
    
    function Git() {
        
    }
    
    /**
    * @throws Error Executing a command that's not a git command throws an error
    */
    Git.prototype.execute = function (cmd) {
        if (!/^git/.test(cmd)) {
            throw new Error("No arbitrary executions with git-integration please!");
        }
        
        console.log(cmd.split(' '));
        
        var acmd = cmd.split(' '),
            proc = acmd.shift(),
            e;
        
//        e = spawn(proc, acmd, {cwd: project.getProjectRoot().fullPath});
//        
//        e.stdout.on("data", function (data) {
//            console.log(data);
//        });
//        
//        e.stderr.on("data", function (data) {
//            console.error(data);
//        });
//        
        return e;
    };
    
    module.exports = Git;
});