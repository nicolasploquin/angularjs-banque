/**
 * Created by Nicolas on 30/05/2016.
 */

(function() {
    "use strict";

    var app = angular.module("banque");


    app.controller("demoCtrl", ["$scope",demoCtrl]);
    function demoCtrl($scope) {
        $scope.titre = "Ma Banque en ligne avec AngularJS !"

        var _message = "premier";
        $scope.message = function (value) {
            _message = angular.isDefined(value) ? value.toUpperCase() : _message;
            return _message;
        };

    }

    app.controller("clientsCtrl", ["$scope","dataLocalService", clientsCtrl]);
    function clientsCtrl($scope, dataService) {
        $scope.clients = dataService.clients();
        $scope.limit = $scope.clients.length;

        $scope.clientFiltre = function (client, index, array) {
            var filtre = ($scope.filtreNomPrenom || "").toLowerCase();
            return (client.nom && client.nom.toLowerCase().indexOf(filtre) != -1)
                || (client.prenom && client.prenom.toLowerCase().indexOf(filtre) != -1)
                || filtre.length == 0;
        };

    }

    app.controller("clientEditCtrl", ["$scope","$routeParams","$location","dataLocalService", clientEditCtrl]);
    function clientEditCtrl($scope,$routeParams, $location, dataService) {
        $scope.$watchCollection('client', function() {
            Materialize.updateTextFields();
        });
        setTimeout(function() {
            Materialize.updateTextFields();
        },2000);
        
        if(angular.isDefined($routeParams.id)){
            $scope.client = dataService.client($routeParams.id);
        }

        $scope.enregistrer = function () {
            console.dir($scope.client);
            dataService.saveClient(angular.copy($scope.client));

            $location.path("/clients");
        };

    }

    app.controller("clientCtrl", ["$scope","$routeParams","$location","dataLocalService", clientCtrl]);
    function clientCtrl($scope, $routeParams, $location, dataService) {

        $scope.client = dataService.client($routeParams.id);

//        $scope.edit = function(){
//            $location.path("/clients/add/"+$routeParams.id);
//        };
        $scope.remove = function(){
            dataService.removeClient($routeParams.id);
            $location.path("/clients");
        };

    }

    app.controller("compteCtrl", ["$scope","$routeParams","dataLocalService", compteCtrl]);
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