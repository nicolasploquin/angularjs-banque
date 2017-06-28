/**
 * Created by Nicolas on 31/05/2016.
 */
var app = angular.module("banque");
app.constant("views", {
    "clients": `
<form action="#" class="row">
	<div class="col s6 m4">
		<div class="input-field">
			<input id="rech" type="text" ng-model="filtreNomPrenom" />
			<label for="rech">Rechercher</label>
		</div>
	</div>
	<div class="col s6 m4">
		<eni-range max="{{clients.length}}" valeurmax="limit" initial="4" test="testDirective()"></eni-range>
	</div>
	<div class="col s6 m4">
		<div class="input-field">
			<input id="limite" type="number" ng-model="limit" />
			<label for="limite">Nombre de ligne</label>
		</div>
	</div>
</form>
<div class="row">
	<div class="col s12">
		<div class="collection">
				<a ng-href="#!/clients/{{client.id}}"
						ng-repeat="client in clients | filter:clientFiltre | orderBy:'nom' | limitTo:limit"
						class="collection-item" >
						<span class="badge" ng-if="client.comptes != 0">{{client.comptes.length || 0}}</span>
						{{client.prenom | capitalize}} {{client.nom | uppercase}}
				</a>
		</div>
	</div>
</div>
<a class="waves-effect waves-light btn" ng-href="#!/clients/add"><i class="material-icons left">add</i>{{"clients_btn_ajouter" | i18n}}</a>
    `,
    "clientEdit":`
        <h2>Nouveau Client</h2>
		<form class="row" name="clientForm" ng-submit="enregistrer()" novalidate>
			<div class="input-field col s12">
				<input id="nom" name="nom" type="text" class="validate" required
					ng-model="client.nom" ng-class="{invalid: clientForm.nom.$invalid && clientForm.nom.$dirty}">
				<label for="nom" data-error="nom obligatoire" >Nom *</label>
			</div>
			<div class="input-field col s12">
				<input id="prenom" name="prenom" type="text" class="validate"
					ng-model="client.prenom" ng-class="{invalid: clientForm.prenom.$invalid && clientForm.nom.$dirty}"
				>
				<label for="prenom">Prénom</label>
			</div>
			<button type="submit" class="row waves-effect waves-light btn"
				ng-disabled="clientForm.$invalid">
				<i class="material-icons right">done</i>
				Valider
			</button>
		</form>
    `,
    "client":`
		<h2>{{client.prenom | capitalize}} {{client.nom  | uppercase}} 
		    <a ng-href="#!/clients/add/{{client.id}}" class="waves-effect waves-light btn"><i class="material-icons">edit</i></a>
		    <button type="button" class="waves-effect waves-light btn" ng-click="remove()"><i class="material-icons">delete</i></button>
		</h2>
		<div class="collection">
			<a ng-href="#!/clients/{{client.id}}/{{compte.numero}}" class="collection-item" 
				ng-repeat="compte in client.comptes | orderBy:'-numero'" >
			  {{compte.numero}} - {{compte.intitule}} <span class="badge">{{compte.operations.length}}</span>
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

