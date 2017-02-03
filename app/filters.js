/**
 * Created by Nicolas on 02/02/2017.
 */

(function () {
    "use strict";

    var app = angular.module("banque");

    app.filter("capitalize",function(){
        return function(prenom){
            return prenom
                        .toLowerCase()
                        .split("-")
                        .map(p => p.charAt(0).toUpperCase()+p.substring(1))
                        .join("-")
                        .split(" ")
                        .map(p => p.charAt(0).toUpperCase()+p.substring(1))
                        .join(" ");
        };
    });




})();