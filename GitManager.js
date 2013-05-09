/*global define, $, brackets, window */

define(["GitManagerConstants", "GitManagerI18n"], function (Constants, I18n) {
    "use strict";
    
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        instance;
    
    /**
    * The goal of GitManager is to represent the git instance in the root folder that
    * was chosen by the user.
    *
    * Perhaps later, this plugin can be improved to represent other git instances that
    * are found in the directory structure, and we can allow the user to choose an instance
    * rather than providing this singleton class.
    */
    function GitManager() {
        GitManager.integrate();
    }
    
    instance = new GitManager();
            
    GitManager.getInstance = function () {
        return instance;
    };

    /** Defines the state of the brackets integration */
    GitManager.integrated = false;
    
    /** Integrate GitManager with Brackets */
    GitManager.integrate = function () {
        if (GitManager.integrated) {
            return;
        }
        
        GitManager.createMenus();
        
        GitManager.integrated = true;
    };
    
    /** Initialize Brackets menus */
    GitManager.createMenus = function () {
        // initially create a top level menu for convenience.  This can be buried as a submenu under another later.
        var topMenu = Menus.addMenu(I18n.git, Constants.GIT_MENU_ITEM, Menus.BEFORE, Menus.AppMenuBar.HELP_MENU);
        
        CommandManager.register(I18n.menu.runCommand, Constants.RUN_COMMAND, instance.runCommand);
        
        topMenu.addMenuItem(Constants.RUN_COMMAND);
    };
    
    return GitManager.instance;
});