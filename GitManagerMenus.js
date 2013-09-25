/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, alert, console */

define(function (require, exports, module) {
    "use strict";
    
    var CommandManager  = brackets.getModule("command/CommandManager"),
        Menus           = brackets.getModule("command/Menus"),
        Constants       = require("GitManagerConstants"),
        I18n            = require("GitManagerI18n");

    function GitManagerMenu(gitManager) {
        this.gitManager = gitManager;
        
        this.createMenus();
    }
    
    /** Initialize Brackets menus */
    GitManagerMenu.prototype.createMenus = function () {
        // initially create a top level menu for convenience.  This can be buried as a submenu under another later.
        var self = this, topMenu = Menus.addMenu(I18n.git, Constants.GIT_MENU_ITEM, Menus.BEFORE, Menus.AppMenuBar.HELP_MENU);
        
        CommandManager.register(I18n.menu.runCommand, Constants.RUN_COMMAND, function () {
            self.gitManager.showRunCommandDialog();
        });
        
        topMenu.addMenuItem(Constants.RUN_COMMAND, "Ctrl-Alt-Shift-G");
    };
    
    module.exports = GitManagerMenu;

});