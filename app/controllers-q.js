/**
 * Created by Nicolas on 30/05/2016.
 */

(function() {
    "use strict";

    var app = angular.module("banque");

    app.controller("demoCtrl", ["$scope",demoCtrl]);
    function demoCtrl($scope) {
        $scope.titre = "Ma Banque en ligne avec AngularJS !"
    }

    app.controller("clientsCtrl", ["$scope","dataHttpService", clientsCtrl]);
    function clientsCtrl($scope, dataService) {
//        $scope.clients = dataService.clients();

        var attente = dataService.clients();
        // quand le résultat précédent sera connu la fonction suivante sera exécutée
        attente.then(function(reponse){
            $scope.clients = reponse;
        });

        $scope.clientFiltre = function (client, index, array) {
            var filtre = ($scope.filtreNomPrenom || "").toLowerCase();
            return (client.nom && client.nom.toLowerCase().indexOf(filtre) != -1)
                || (client.prenom && client.prenom.toLowerCase().indexOf(filtre) != -1)
                || filtre.length == 0;
        };

        $scope.testDirective = function(){
            console.log("événement click provenant de la directive eni-range...");
        };

        $scope.$on("updateListeClients",function(event, _clients){
            $scope.clients = _clients;
        });


    }

    app.controller("clientEditCtrl", ["$scope","$rootScope","$routeParams","$location","dataHttpService", clientEditCtrl]);
    function clientEditCtrl($scope,$rootScope,$routeParams, $location, dataService) {

        if(angular.isDefined($routeParams.id)){
            $scope.client = dataService.client($routeParams.id);
        }

        $scope.enregistrer = function () {
            console.dir($scope.client);
            dataService.saveClient(angular.copy($scope.client))
                .then(function(clients){
                    $rootScope.$broadcast("updateListeClients",clients);
                });
            $location.path("/clients");

        };

    }

    app.controller("clientCtrl", ["$scope","$routeParams","$location","dataHttpService", clientCtrl]);
    function clientCtrl($scope, $routeParams, $location, dataService) {

        $scope.client = dataService.client($routeParams.id);

        $scope.edit = function(){
            $location.path("/clients/add/"+$routeParams.id);
        };
        $scope.remove = function(){
            dataService
                .removeClient($routeParams.id)
                .then(function(){
                    $location.path("/clients");
                });
        };

    }

    app.controller("compteCtrl", ["$scope","$routeParams","dataHttpService", compteCtrl]);
    function compteCtrl($scope, $routeParams, dataService) {

        $scope.client = dataService.client($routeParams.id);
        $scope.compte = dataService.compte($routeParams.numCompte, $routeParams.id);

    }



/*

    function CompteCtrl($scope, $routeParams, data){ // Injection de dépendance implicite
        var clients = data.clients();
        if(!$scope.client || $scope.client.id != $routeParams.id){
            for(var i in clients){
                if(clients[i].id == $routeParams.id){
                    $scope.client = clients[i];
                    break;
                }
            }
        }
        for(var i in $scope.client.comptes){
            if($scope.client.comptes[i].numero == $routeParams.numCompte){
                $scope.compte = $scope.client.comptes[i];
            }
        }

    }

*/


})();