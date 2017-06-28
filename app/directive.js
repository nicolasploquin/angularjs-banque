(function(){
    "use strict";

    var app = angular.module("banque");
    app.directive("eniMessage",function(){ // <eni-message />
        
        return {
            restrict: "E",
            template: `
                <style>
                    eni-message p { padding: 1em; background-color: #ff9; }
                </style>
                <p>Les directives, c'est 
                    <strong>{{qualificatif}}</strong>
                     facile avec AngularJS !</p>
            `,
            scope: {
                qualificatif: "@"
            }
        };

    });

})();