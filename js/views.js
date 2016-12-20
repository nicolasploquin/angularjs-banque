/**
 * Created by Nicolas on 31/05/2016.
 */
var app = angular.module("banque");
app.constant("views", {
    "clients": `
        <div>
            <label>Rechercher <input type="search" ng-model="filtreNomPrenom" /></label>
            <eni-range max="{{clients.length}}" valeurmax="limit"></eni-range>
        </div>
        <ul class="list-group">
            <a ng-href="#!/clients/{{client.id}}"
               ng-repeat="client in clients | filter:clientFiltre | orderBy:'nom' | limitTo:limit"
               class="list-group-item" >
               {{client.prenom}} {{client.nom | uppercase}}
               <span class="badge">{{client.comptes.length || 0}}</span>
            </a>
        </ul>
        <a ng-href="#!/clients/add" role="button" class="btn btn-primary" aria-label="Nouveau Client">
		  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> {{"clients_btn_ajouter" | i18n}}
		</a>
    `,
    "clientEdit":`
        <h2>Nouveau Client</h2>
		<form name="form" ng-submit="enregistrer()">
			<div class="form-group has-feedback" 
				ng-class="{'has-success': form.cliNom.$valid, 'has-error': form.cliNom.$dirty && form.cliNom.$invalid}" >
				<label class="sr-only" for="cliNom" >Nom *</label>
				<input type="text" class="form-control" placeholder="Nom *" 
						id="cliNom" name="cliNom" ng-model="client.nom"
						required />
				<span ng-show="form.cliNom.$valid" 
				        class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
				<span ng-show="form.cliNom.$dirty && form.cliNom.$invalid" 
				        class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
			</div>
			<div class="form-group">
				<label class="sr-only" for="cliPrenom" >Prénom</label>
				<input type="text" class="form-control" placeholder="Prénom" 
					    id="cliPrenom" name="cliPrenom" ng-model="client.prenom" />
			</div>
			
			<input type="submit" class="btn btn-primary" value="{{'clientEdit_btn_enregistrer' | i18n}}" ng-disabled="form.$invalid" />

		</form>
    `,
    "client":`
		<h2>{{client.prenom}} {{client.nom}} 
		    <a ng-href="/clients/add/{{client.id}}" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span></a>
		    <button type="button" class="btn btn-default" ng-click="remove()"><span class="glyphicon glyphicon-trash"></span></button>
		</h2>
		<div class="list-group">
			<a ng-href="#!/clients/{{client.id}}/{{compte.numero}}" class="list-group-item" 
				ng-repeat="compte in client.comptes | orderBy:'-numero'" >
			  {{compte.numero}} {{compte.intitule}} <span class="badge">{{compte.operations.length}}</span>
			</a>
		</div>
    `,
    "compte":`
		<h2>Compte n°{{compte.numero}}</h2>
		<p>{{client.prenom}} {{client.nom | uppercase}}</p>
		<table class="table table-striped">
			<thead>
				<tr><th data-prop="date">Date</th><th>Libellé</th><th>Montant</th></tr>
			</thead>
			<tbody>
				<tr ng-repeat="ope in compte.operations |orderBy:'montant'">
					<td>{{ope.date | date:'fullDate'}}</td>
					<td>{{ope.libelle}}</td>
					<td class="text-right">{{ope.montant | currency}}</td>
				</tr>
			</tbody>
		</table>
		<a ng-href="#!/clients/{{client.id}}/{{compte.numero}}/add" role="button" class="btn btn-primary" aria-label="Ajouter une Opération">
		  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Ajouter une Opération
		</a>
    `
});

