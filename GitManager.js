/*global define, $, brackets, window */

define(["GitManagerConstants", "GitManagerI18n", "GitManagerMenus"], function (Constants, I18n, GitMenu) {
    "use strict";
    
    var instance;
    
    /**
    * The goal of GitManager is to represent the git instance in the root folder that
    * was chosen by the user.
    *
    * Perhaps later, this plugin can be improved to represent other git instances that
    * are found in the directory structure, and we can allow the user to choose an instance
    * rather than providing this singleton class.
    */
    function GitManager() {
        this.menu = new GitMenu(this);
    }
    
    GitManager.getInstance = function () {
        return instance;
    };
    
    GitManager.prototype.runCommand = function () {
        
    };
    
    instance = new GitManager();

    return instance;
});