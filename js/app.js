/**
 * Created by Nicolas on 30/05/2016.
 */

(function(){
    "use strict";



    var app = angular.module("banque",["ngRoute"]);
    app.config(["$routeProvider","views",function($routeProvider, views){
        console.log("Configuration des routes...");
        $routeProvider
            .when("/clients",{
                controller: "clientsCtrl",
                template: views.clients
            })
            .when("/clients/add/:id?",{
                controller: "clientEditCtrl",
                template: views.clientEdit
            })
            .when("/clients/:id",{
                controller: "clientCtrl",
                template: views.client
            })
            .when("/clients/:id/:numCompte",{
                controller: "compteCtrl",
                template: views.compte
            })
            .otherwise({
                redirectTo:"/clients"
            });

    }]);
    app.run(function(){
        console.log("Application OK !");
        setTimeout(function(){
            document.querySelector("#splash").remove();
        },1000);
    });

})();
