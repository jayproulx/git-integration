/*global define, $, brackets, window, alert, console */

define(["GitManagerConstants", "GitManagerI18n"], function (Constants, I18n) {
    "use strict";
    
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus");

    function GitManagerMenu(git) {
        this.git = git;
        
        this.createMenus();
    }
    
    /** Initialize Brackets menus */
    GitManagerMenu.prototype.createMenus = function () {
        alert("Start debugger");
        // initially create a top level menu for convenience.  This can be buried as a submenu under another later.
        var topMenu = Menus.addMenu(I18n.git, Constants.GIT_MENU_ITEM, Menus.BEFORE, Menus.AppMenuBar.HELP_MENU);
        
        console.log(I18n.menu.runCommand, Constants.RUN_COMMAND, this.git.runCommand);
        CommandManager.register(I18n.menu.runCommand, Constants.RUN_COMMAND, this.git.runCommand);
        
        topMenu.addMenuItem(Constants.RUN_COMMAND);
    };
    
    return GitManagerMenu;

});