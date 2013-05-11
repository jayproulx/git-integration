/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, require, $, brackets, window, console */

define(function (require, exports, module) {
    "use strict";
    
    var NodeConnection = brackets.getModule("utils/NodeConnection"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    
    var nodeConnection = new NodeConnection(),
        path = ExtensionUtils.getModulePath(module, "GitChildProcess"),
        disconnectedGits = [],
        connected = false;
    
    nodeConnection.connect(true).done(function () {
        console.log("git-integration: Node connection complete");
        console.log("git-integration: Trying to load " + path + ".js");
        
        nodeConnection.loadDomains([path], true).done(function () {
            console.log("git-integration: Load " + path + " complete");
            
            connected = true;
            
            while (disconnectedGits.length > 0) {
                disconnectedGits.shift().connecting.resolve();
            }
        });
    });

    function Git(gitManager) {
        this.gitManager = gitManager;
        this.connecting = $.Deferred();

        if (!connected) {
            disconnectedGits.push(this);
        } else {
            this.connecting.resolve();
        }
    }
        
    /**
    * @throws Error Executing a command that's not a git command throws an error
    */
    Git.prototype.execute = function (cmd) {
        if (!this.connecting.isResolved()) {
            throw new Error("Node connection for git not yet established.");
        }
        
        return nodeConnection.domains.gitManager.runCommand(cmd);
    };
    
    module.exports = Git;
});