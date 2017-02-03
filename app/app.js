/**
 * Created by Nicolas on 30/05/2016.
 */

(function(){
    "use strict";



    var app = angular.module("banque",["ngRoute","eniComposants"]);
    app.config(["$routeProvider","views", function($routeProvider, views){

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
    app.run(["$http",function($http){
        console.log("Application OK !");


        $http({
            method: "GET",
            url: "http://wildfly.westeurope.cloudapp.azure.com/clients"
        }).then(function(reponse){
            console.dir(reponse.data);
        });





        setTimeout(function(){
            document.querySelector("#splash").remove();
        },1000);
    }]);

})();
