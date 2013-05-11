/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils  = brackets.getModule("utils/ExtensionUtils"),
        AppInit         = brackets.getModule("utils/AppInit"),
        gitManager;
        
    ExtensionUtils.loadStyleSheet(module, "css/main.css");

    AppInit.appReady(function () {
        gitManager = require("GitManager");
        
        gitManager.initialize();
        
        // for debugging convenience, this isn't intended to stay
        window.gitManager = gitManager;
    });
    
});
