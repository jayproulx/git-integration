/*global define, $, brackets, window, console, Mustache */

define(["Git", "GitManagerConstants", "GitManagerI18n", "GitManagerMenus", "text!RunCommandDialogTemplate.html"], function (Git, Constants, I18n, GitMenu, runCommandDialogTemplate) {
    "use strict";
    
    var instance,
        Dialogs = brackets.getModule("widgets/Dialogs");
    
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
        this.git = new Git();
    }
    
    GitManager.getInstance = function () {
        return instance;
    };
    
    GitManager.prototype.runCommand = function () {
        var $tmpl = $(Mustache.render(runCommandDialogTemplate, I18n));
        
        $tmpl.find(".btn.run-git-command").on("click", function (e) {
            $tmpl.addClass("running");
        });
        
        Dialogs.showModalDialogUsingTemplate($tmpl);
    };
    
    instance = new GitManager();

    return instance;
});