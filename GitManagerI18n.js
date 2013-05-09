/*global define, $, brackets, window */

define(["GitManagerConstants"], function (Constants) {
    "use strict";
    
    var I18n = {
        en: {
            git: "Git",
            cancel: "Cancel",
            ok: "Ok",
            done: "Done",
            run: "Run",
            
            runDialog: {
                title: "Run Git command..."
            },
            
            menu: {
                runCommand: "Run..."
            }
        }
    };
    
    I18n.l10n = I18n[brackets.app.language];

    return I18n.l10n;
});