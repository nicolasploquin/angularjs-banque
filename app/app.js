/**
 * Created by Nicolas on 30/05/2016.
 */

(function(){
    "use strict";



    var app = angular.module("banque",["ngRoute","eniComposants"]);

    app.constant("API_URL", "http://wildfly.westeurope.cloudapp.azure.com");
//    app.constant("API_URL", "https://banque-api.azurewebsites.net/api");

    app.config(["$routeProvider","views", function($routeProvider, views){

        console.log("Configuration des routes...");
        $routeProvider
            .when("/demo",{
                controller: "clientsCtrl",
                templateUrl: "app/demo.html"
            })
            .when("/clients",{
                controller: "clientsCtrl",
                template: views.clients
            })
            .when("/clients/add/:id?",{
                controller: "clientEditCtrl",
                templateUrl: "app/client-form.html"
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
    app.run(["$http",function($http){
        console.log("Application OK !");

        setTimeout(function(){
            document.querySelector("#splash").remove();
        },1000);
    }]);

})();
