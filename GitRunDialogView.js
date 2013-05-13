/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, console, Mustache */

define(function (require, exports, module) {
    "use strict";
    
    var Dialogs = brackets.getModule("widgets/Dialogs"),
        I18n = require("GitManagerI18n"),
        runCommandDialogTemplate = require("text!GitRunDialogView.html");
    
    function GitRunDialogView(manager) {
        this.manager = manager;
        
        this.$runDialog = undefined;
    }

    GitRunDialogView.RUN_DIALOG_CLASS = "GitManager-dialog-run";
    GitRunDialogView.RUN_DIALOG_INPUT_CLASS = "run-input";
    GitRunDialogView.RUN_DIALOG_RUN_BUTTON_CLASS = "btn.run-git-command";
    GitRunDialogView.RUN_DIALOG_OUTPUT_CLASS = "run-output";
    GitRunDialogView.RUN_DIALOG_STATE_RUNNING = "running";

    GitRunDialogView.prototype.show = function () {
        var $t, self = this;
        
        this.$runDialog = $t = $(Mustache.render(runCommandDialogTemplate, I18n));
        
        $t.find("." + GitRunDialogView.RUN_DIALOG_RUN_BUTTON_CLASS).on("click", function (e) {
            self.runCommand();
        });

        Dialogs.showModalDialogUsingTemplate($t);
    };
    
    GitRunDialogView.prototype.close = function () {
        Dialogs.cancelModalDialogIfOpen(GitRunDialogView.RUN_DIALOG_CLASS);
    };
    
    GitRunDialogView.prototype.runCommand = function () {
        var promise, $t = this.$runDialog, self = this, command = $t.find("." + GitRunDialogView.RUN_DIALOG_INPUT_CLASS).val();
        
        $t.addClass(GitRunDialogView.RUN_DIALOG_STATE_RUNNING);
        self.clearRunDialog();
        
        promise = this.manager.runCommand(command).then(
            function (data) {
                self.writeOutput(data);
            },
            function (error) {
                self.writeOutput("Error executing git command:\n" + error);
            },
            function (data) {
                self.writeOutput(data);
            }
        );
    };
    
    GitRunDialogView.prototype.writeOutput = function (data) {
        this.$runDialog.find("." + GitRunDialogView.RUN_DIALOG_OUTPUT_CLASS).append(data);
    };
    
    GitRunDialogView.prototype.clearRunDialog = function () {
        if (!this.$runDialog) {
            return;
        }
        
        var $t = this.$runDialog;
        
        $t.find("." + GitRunDialogView.RUN_DIALOG_INPUT_CLASS).val('');
        $t.find("." + GitRunDialogView.RUN_DIALOG_OUTPUT_CLASS).html('');
    };
    
    module.exports = GitRunDialogView;
});