/*global define, $, brackets, window */

define(["GitManagerConstants"], function (Constants) {
    "use strict";
    
    var I18n = {
        en_US: {
            git: "Git",
            
            menu: {
                runCommand: "Run..."
            }
        }
    };
    
    I18n.l10n = I18n.en_US;

    return I18n.l10n;
});