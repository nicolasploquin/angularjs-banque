/**
 * Created by Nicolas on 30/05/2016.
 */
(function() {
    "use strict";


    var app = angular.module("banque");

    app.factory("dataLocalService",function(){

        var _data = angular.fromJson(localStorage.banque_ng);

        // private function
        function save(){
            localStorage.banque_ng = angular.toJson(_data);
        }

        return {
            clients : function(){
                return _data.clients;
            },
            clientsQ : function(){
                var attente = $q.defer();
                attente.resolve(_data.clients);
                return attente.promise;
            },
            client : function(id){
                return _data.clients.find(cli => cli.id == id) || {}; // ES6


                // for(let client of _data.clients){
                //     if(client.id == id) return client;
                // }
                // for(var i in _data.clients){
                //     if(_data.clients[i].id == id) return _data.clients[i];
                // }

                // return _data.clients.filter(cli => cli.id == id) || {}; // ES6
                // return _data.clients.filter(function(cli){ return cli.id == id; }) || {}; // ES5
                //
                // for(var i in _data.clients){
                //     if(_data.clients[i].id == id) return _data.clients[i];
                // }
                //
                // console.warn('Client inconnu : ' + id);
                // return {};
            },
            saveClient : function(client){
                if(angular.isDefined(client.id)){
                    this.removeClient(client.id);
                }else{
                    client.id = _data.clients_id++;
                }
                _data.clients.push(client); // "copy" supprime les attributs angular de l'objet ($$...)
                save();
            },
            removeClient : function(id){
                for(var i in _data.clients){
                    if(_data.clients[i].id == id){
                        _data.clients.splice(i,1);
                        save();
                        return;
                    }
                }
            },
            compte : function(numero,client_id){
                var comptes;
                if(angular.isDefined(client_id)){
                    var client = this.client(client_id);
                    comptes = client.comptes || [];
                }else{
                    comptes = [];
                    for(var i in _data.clients){
                        for(var j in _data.clients[i].comptes)
                            comptes.push(_data.clients[i].comptes[j]);
                    }
                }

                for(var k in comptes){
                    if(comptes[k].numero == numero) return comptes[k];
                }
                console.warn('Client inconnu : ' + id);
                return {};
            }

        };


    });


    app.factory("dataHttpService",["$http","$q",function($http,$q) {

        const API_URL = "http://wildfly.westeurope.cloudapp.azure.com";

        var _data = {clients:[]};

        return {
            clients: function () {
                // Objet de mise en attente de la réponse du serveur
                var attente = $q.defer();


                $http({
                    url:API_URL+"/clients",
                    method:"get"
                }).then(function(res){
                    _data.clients = res.data;
//                    console.dir(data);
                    console.log("réponse serveur")

                    attente.resolve(res.data);

                },function(){
                    console.warn("Erreur lors de la récupération des données sur le serveur.");
                });

                console.log("réponse service");

                // retourne l'objet d'attente pour enregistrement des fonctions suivantes
                return attente.promise;
                // return _data.clients;
            },
            client : function(id){ //TODO: $http()
                return _data.clients.find(cli => cli.id == id) || {}; // ES6
            },
            saveClient : function(client){
                var defer = $q.defer();

                $http({
                    url:API_URL+"/clients/"+(angular.isDefined(client.id)?client.id:"0"),
                    method:(angular.isDefined(client.id)?"put":"post"),
                    params:angular.copy(client)
                }).then(function(){
                    defer.resolve();
                });
                return defer.promise;
            },
            removeClient : function(id){
                var defer = $q.defer();
                $http({
                    url:API_URL+"/clients/"+id,
                    method:"delete"
                }).then(function(){
                    defer.resolve();
                });
                return defer.promise;
            },
            compte : function(numero,client_id){ //TODO: $http()
                var comptes;
                if(angular.isDefined(client_id)){
                    var client = this.client(client_id);
                    comptes = client.comptes || [];
                }else{
                    comptes = [];
                    for(var i in _data.clients){
                        for(var j in _data.clients[i].comptes)
                            comptes.push(_data.clients[i].comptes[j]);
                    }
                }

                for(var k in comptes){
                    if(comptes[k].numero == numero) return comptes[k];
                }
                console.warn('Client inconnu : ' + id);
                return {};
            }


        };

    }]);






})();