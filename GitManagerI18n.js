/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
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
    
    module.exports = I18n[brackets.app.language] || I18n.en;
});