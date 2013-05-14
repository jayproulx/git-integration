/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, require, $, brackets, window, console */

define(function (require, exports, module) {
    "use strict";
    
    var NodeConnection = brackets.getModule("utils/NodeConnection"),
        ProjectManager = brackets.getModule("project/ProjectManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    
    var nodeConnection = new NodeConnection(), // mind as well share a connection for all Git repos
        path = ExtensionUtils.getModulePath(module, "node/GitChildProcess"),
        disconnectedGits = [],
        connected = false,
        LOGGING_ENABLED = true;
    
    function log() {
        if (LOGGING_ENABLED) {
            console.log(arguments);
        }
    }
    
    nodeConnection.connect(true).done(function () {
        var p = nodeConnection.loadDomains([path], true);
        
        p.done(function () {
            connected = true;
            
            while (disconnectedGits.length > 0) {
                disconnectedGits.shift().connecting.resolve();
            }
        });
        
        p.fail(function () {
            log("git-integration: Error connecting to Node:");
            log(arguments);
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
    * @returns {promise} Promise for the Node connection
    */
    Git.prototype.execute = function (cmd) {
        if (!this.connecting.isResolved()) {
            throw new Error("Node connection for git not yet established.");
        }
        
        var path = ProjectManager.getProjectRoot().fullPath;
        var result = nodeConnection.domains.gitManager.runCommand(cmd, path);
        
        return result;
    };
    
    module.exports = Git;
});