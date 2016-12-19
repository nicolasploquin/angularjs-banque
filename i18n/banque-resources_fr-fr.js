/**
 * Created by Nicolas on 01/06/2016.
 */


var app = angular.module("banque");

// Liste des libellés de l'application
app.constant("resources",{
    app_titre: "BanqueNG",
    app_splash: "Loading...",
    clients_btn_ajouter: "Créer",
    clientEdit_btn_enregistrer: "Enregistrer"
});

// Service de recherche du libellé pour une clé
app.factory("resourcesManager",["resources",function(resources){
    return {
        get: function(resourceName){
            return resources[resourceName] || "";
        }
    }
}]);

// Filtre à appliquer dans les vues
app.filter("i18n",["resourcesManager",function(resourcesManager){
    return function(prop){
        return resourcesManager.get(prop);
    }
}]);