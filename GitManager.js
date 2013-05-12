/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, require, $, brackets, window, console, Mustache */

define(function (require, exports, module) {
    "use strict";
    
    
    var Git = require("Git"),
        GitMenu = require("GitManagerMenus"),
        RunDialogView = require("GitRunDialogView");
    
    var instance;
    
    /**
    * The goal of GitManager is to represent the git instance in the root folder that
    * was chosen by the user.
    *
    * Perhaps later, this plugin can be improved to represent other git instances that
    * are found in the directory structure, and we can allow the user to choose an instance
    * rather than providing this singleton class.
    *
    * Some refactoring will be required, such as displaying a menu item for each repo that
    * is created, etc.
    */
    function GitManager() {
        this.git = undefined;
        this.menu = undefined;
        this.runDialog = undefined;
    }
    
    /**
    * For use sometime in the future when we want to support multiple git repos inside
    * the project tree.
    */
    GitManager.getInstance = function () {
        return instance;
    };
    
    GitManager.prototype.initialize = function () {
        this.git = new Git(this);
        this.menu = new GitMenu(this);
        this.runDialog = new RunDialogView(this);
    };
    
    GitManager.prototype.showRunCommandDialog = function () {
        this.runDialog.show();
    };
    
    GitManager.prototype.runCommand = function (cmd) {
        return this.git.execute(cmd);
    };
    
    instance = new GitManager();

    module.exports = instance;
});