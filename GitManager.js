/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, console, Mustache */

define(function (require, exports, module) {
    "use strict";
    
    var instance,
        Dialogs = brackets.getModule("widgets/Dialogs"),
        Git = require("Git"),
        Constants = require("GitManagerConstants"),
        I18n = require("GitManagerI18n"),
        GitMenu = require("GitManagerMenus"),
        RunDialogView = require("GitRunDialogView");
    
    /**
    * The goal of GitManager is to represent the git instance in the root folder that
    * was chosen by the user.
    *
    * Perhaps later, this plugin can be improved to represent other git instances that
    * are found in the directory structure, and we can allow the user to choose an instance
    * rather than providing this singleton class.
    */
    function GitManager() {
    }
    
    GitManager.getInstance = function () {
        return instance;
    };
    
    GitManager.prototype.initialize = function () {
        this.git = new Git();
        this.menu = new GitMenu(this);
        this.runDialog = new RunDialogView(this);
        
        this.$runDialog = undefined;
    };
    
    GitManager.prototype.showRunCommandDialog = function () {
        this.runDialog.show();
    };
    
    GitManager.prototype.runCommand = function (cmd) {
        var $t = this.$runDialog;
        
        return this.git.execute(cmd);
    };
    
    instance = new GitManager();

    module.exports = instance;
});