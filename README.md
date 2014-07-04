
Workshop AngularJS
=====================

Bienvenue à ce workshop destiné à vous apprendre les bases d'AngularJS.

Nous allons mettre en application AngularJS en créant un clone de Twitter appellé **Piouter**.  Vous pouvez récupérer les sources du workshop sur GitHub :

    git clone https://github.com/thebignet/workshopAngular.git

Le client est dans le répertoire **client**.  La documentation de l'API est disponible [ici](https://github.com/thebignet/workshopAngularServer)

----------
Etapes de la construction
---------

### Ouverture de l'application

Ouvrir le fichier *index.html* dans un navigateur (Chrome, Firefox, Safari, IE>8). Les zones en jaune représentent les parties non dynamiques qu'il faudra rendre dynamiques grâce à AngularJS.

### Importation d'AngularJS

Dans le fichier *index.html*, à la suite des imports JavaScript existants, rajouter :

    bower_components/angular/angular.min.js

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape0...etape1)

### Déclaration de l'application et du controleur

La déclaration de l'application et du controleur se fait à la fois en JavaScript et en HTML pour que le binding puisse opérer.  Dans le fichier *js/piouter.js*, déclarer l'application :

    var app = angular.module('app', []);

Déclarer le controleur :

    app.controller('MainCtrl', function ($scope) {
        // Code du controleur ici
    });
    
Les modules à importer à l'application sont définis dans les [] de la déclaration de la variable **app**.  Exemple :

    var app = angular.module('app', ['ui.bootstrap']);

Importer ce module et importer les fichiers JavaScript suivants :

    bower_components/angular-ui-bootstrap-bower/ui-bootstrap.min.js
    bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js

Les dépendances de ces modules sont injectées dans le controleur en les passant en paramètre.  Exemple :

    app.controller('MainCtrl', function ($scope, $log){}

En HTML, l'application est déclarée au moyen de l'attribut ng-app="app".  Positionner cet attribut sur le tag **html**.  Ne pas oublier de supprimer la classe CSS **not-angular** (et faire de même dans la suite de l'atelier à chaque modification.  De même, pour déclarer le controleur, positionner l'attribut ng-controller="MainCtrl" sur la **div** de classe **starter-template**.

Recharger le fichier **index.html** dans un navigateur.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape1...etape2)

### Bindings
Un binding peut se faire de deux manières :

 1. Via l'attribut ng-bind sur un élément du DOM : ng-bind="user.id"
 2. Via l'annotation "moustache" dans du texte : {{ user.id }}

Les deux cas sont équivalents.  Tant que possible, on utilisera le premier cas, qui permet d'éviter l'affichage des "moustaches" tant que le moteur n'a pas fait le rendu.

Un binding se fait sur une variabe du scope du controlleur.  Le scope du controlleur est une variable de type map.  C'est elle qui permet le binding entre la partie JavaScript et la partie HTML.

Créer la constante suivante :

    app.constant('userId', '<adresse mail>');

Remplacer par votre adresse mail.  Vous pouvez ensuite injecter **userId** dans le controleur.

Dans le controlleur, ajouter **userId** en dépendance et créer une map *user* :

    $scope.user = {id:userId};

Il faut afficher l'id de l'utilisateur dans la marge à gauche en haut.  Cette zone représente le profil de l'utilisateur connecté.  L'**id** de l'utilisateur peut se récupérer avec l'opérateur "." (ie user.id).  Une fois le binding réalisé, raffraichir la page.

Déclarer la variable **$scope.message** et lui affecter un message par défaut.  Les champs texte permettent d'effectuer une modification du modèle JavaScript.  Pour cela, il faut utiliser l'attribut **ng-model** de la même manière que **ng-bind**.

Faire un binding affichage le nombre de caractères restants, sachant que les expressions sont évaluées à l'intérieur des moustaches et que le nombre maximal est 140.  Une fois le binding réaliser, modifier la valeur du champ message.  Le nombre de caractères doit se mettre à jour automatiquement.

Ajouter des **ng-model** pour tous les champs texte et créer les variables JavaScript associées.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape2...etape3)

### Filtres

Un filtre permet de modifier le rendu d'une valeur.  Ajouter "| json" au binding sur le nom de l'utilisateur en haut à gauche, puis retirer ".id" et rafraichir la page.  Rétablir le binding.

Importer ce fichier JavaScript :
    
    bower_components/angular-md5/angular-md5.min.js
    
Puis ajouter **'angular-md5'** à la liste des modules de l'application.  Remplacer l'attribut **src** de la première balise **img** par **ng-src**.  Supprimer le hash à la fin de l'URL et le remplacer par un binding en moustache sur user.id.  Rafraichir la page et observer le lien créé.  Ensuite, ajouter le filtre **gravatar** sur le binding.  Rafraichir la page et observer le lien créé.

Une fois le gravatar correctement affiché, remplacer toutes les images de la même manière en utilisant l'utilisateur **user** (que l'on corrigera par la suite).

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape3...etape4)

### Répéteurs
Les répéteurs permettent de boucler sur une liste d'objet et de répéter une structure HTML.
Repérer le premier élément **class="list-group-item**.  Ajouter l'attribut **ng-repeat** avec la valeur **piou in pious**.  Ajouter un objet JavaScript dans le controleur :

    $scope.pious = [{id:'thebignet@gmail.com',message:'Salut les gens',date:new Date()}];

Supprimer les balises **<li>** suivantes.  Rafraichir la page.  Le piou apparait, mais pas avec les paramètres ci-dessus.  A l'intérieur du **li**, la variable **piou** représente le piou courant dans la liste de pious.  Faire les bindings des différents éléments pour que le piou s'affiche correctement.  Ajouter deux pious à la liste du controleur pour vérifier qu'ils sont bien affichés.  Ne pas oublier de renseigner l'auteur du piou dans l'image gravatar.

Ajouter le filtre suivant à l'attribut **ng-repeat** :

     orderBy:'date':true

Ce filtre va trier la liste de pious par date décroissante.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape4...etape5)

### Actions
Les actions sur des éléments se font à la manière d'un **onClick** en JavaScript standard, mais avec l'attribut **ng-click**.  Il est alors possible d'appeler directement des fonctions du scope du controlleur.  Définir une nouvelle fonction du scope :

    $scope.showUser = function(user){alert(user);}

Ensuite, ajouter l'attribut **ng-click="showUser(user.id)"** au bouton **Send**.  Cliquer sur le bouton pour afficher l'id de l'utilisateur.
 
[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape5...etape6)

### Show/Hide
Ajouter une liste de followers au scope :

    $scope.followers = [{id:'thebignet@gmail.com'},{id:'machin@gmail.com'}];

Il est possible d'afficher (ou pas) un élément à partir d'une condition au moyen des attributs **ng-show** et **ng-hide** qui permettent respectivement d'afficher et de masquer l'élément suivant la valeur de la condition.  Appliquer ces attributs sur le bloc **Followed by** pour soit afficher un message indiquant qu'il n'y a pas de followers, soit afficher les followers.  Faire le binding sur les followers.  Ajouter une map followings sur le même principe que les followers et faire le binding sur les followings.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape6...etape7)

### Resources REST
#### Bases
Ajouter l'import JavaScript :

    bower_components/angular-resource/angular-resource.min.js
Ajouter le module **'ngResource'** à la liste des dépendances de **app** et **$resource** aux dépendances du controleur.  Définir la constante suivante :

    app.constant('apiRoot', 'http://workshop-angular-server.herokuapp.com');
Injecter **apiRoot** au controleur.

Une resource se définit comme suit :

    var Piou = $resource(apiRoot + '/piou/:userId', {userId:'@userId'});
Le premier paramètre est l'URL de la resource.  On peut y indiquer les parties variables préfixées par ":".  Il est ensuite possible de lier ces parties au champs de la resource.  La partie :userId est liée au champ **userId** d'un piou.

Ajouter cette resource et construire de la même manière la resource User et la resource Follower à partir des API fournis à la fin de ce document.  User et Follower prennent respectivement les URI suivants :

    '/user/:userId/:action/:actionId'
    '/follower/:userId'

Une resource fournit d'office des méthodes CRUD suivantes :

    { 'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'} };

Ces méthodes renvoient des **promise**.  C'est à dire qu'elle renvoient un objet qui sera complété plus tard.  On peut les invoquer de la manière suivante :

    User.get({userId:id})
    
Renseiger les variables **user**, **pious** et **followers** au lancement de la page.  Pour informations, le corps du controleur est exécuté au lancement.

**NB :** Lors de la récupération d'une liste, c'est **query** qu'il faut utiliser.  Et faire attention aux clés retournées par l'API.  Pour les pious et les followers, c'est userId qui est retourné et non id.  Aussi, l'API User.get retourne une liste **following** qu'il faut utiliser au lieu de la liste **followings** déclarée précédemment.

Créer une fonction permettant de changer l'utilisateur à partir du champ texte du profil et du bouton associé.  Ne pas oublier de recharger les pious et de vider le champ utilisateur après avoir mis à jour l'utilisateur.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape7...etape8)

#### Watcher
Au lieu de charger les **pious** et les **followers** au chargement de la page, ajouter un watcher sur user :

        $scope.$watch('user',function(user){
            //Récupération pious et followers
        },true);
Cette méthode surveille la variable **user**.  Le dernier paramètre précise que cette surveillance se fait sur tous les champs de la variable et non sur son identité.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape8...etape9)

#### Envoi de modifications
De la même manière qu'il est possible de récupérer un objet représentant une resource, il est possible d'en créer une grace à l'opérateur **new** en passant une map en paramètre du constructeur.  Il est alors possible d'appeler les fonctions ci-dessus sur l'objet en les préfixant par $.  Exemple :

    var params = {userId:$scope.user.id,message:$scope.message,date:Date.now()};
    var monPiou = new Piou(params);
    monPiou.$save(function(ret, putResponseHeaders){
        if(ret.code==0){
            $scope.pious.push(params);
            $scope.message='';
        } else {
            alert(ret.message);
        }
    });

Modifier le bouton **Send** pour qu'il sauvegarde le message.  On peut passer en paramètre à la méthode $save une fonction callback, dont les paramètres correspondent au corps du retour ainsi qu'aux headers de la réponse.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape9...etape10)

#### Ajout de méthodes spécifiques
En plus des méthodes de base définies ci-desus, il est possible de définir des méthodes spécifiques en rajoutant une map en dernier paramètre de $resource.  Exemple :

    {
        follow: {method:'PUT',params:{action:'follow'}},
        unfollow: {method:'DELETE',params:{action:'follow'}}
    }

Les paramètres font référence aux paramètres de l'URL défini dans la resource.  Utiliser ces méthodes pour suivre et arrêter de suivre des utilisateurs.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape10...etape11)

### Mise à jour des classes CSS
L'attribut ng-class permet de définir si une classe CSS est appliquée en fonction d'une condition.  La notation est la suivante :

    ng-class="{'too-long': message.length > 140}
La classe **too-long** est appliquée si la taille du message dépasse 140.  Ajouter la classe **almost-full** si la taille est entre 120 et 140.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape11...etape12)

### Directive simple (am-time-ago)
Importer le fichier JavaScript suivant :

    bower_components/angular-moment/angular-moment.js

Ajouter le module 'angularMoment' à l'application.  Dans la liste des pious, au lieu d'afficher '1 minute ago', ajouter la directive **am-time-ago="piou.date"** et vider le corps de la balise.

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape12...etape13)

### Directive avancée (typeahead)
Cette directive permet d'afficher une liste filtrée lors de la frappe.  Ainsi, si la fonction **getUsersMatching** renvoie une liste d'utilisateurs, la directive suivante permet d'afficher les id des utilisateurs :

    typeahead="user as user.id for user in getUsersMatching($viewValue)"

**$viewValue** correspond à la valeur courante du champ texte.

Lorsqu'un utilisateur est sélectionné, on peut également appeler une fonction du controleur en lui passant les résultats en paramètre :

    typeahead-on-select="changeUser($item, $model, $label)"
    
Il est également possible d'afficher un élément lorsque la récupération des utilisateurs n'a pas encore eut lieue :

    typeahead-loading="loadingUsers"
    
Après les input typeahead, rajouter la balise suivante :

    <i ng-show="loadingUsers" class="glyphicon glyphicon-refresh"></i>

Aussi, il est possible de ne pas faire de recherche si le texte ne dépasse pas une certaine longueur :

    typeahead-min-length="2"

Ajouter typeahead sur les input de **Select other user** et **Follow someone**.  Pour cela, il faut rajouter des fonctions de récupération des utilisateurs à chaque typeahead.  Chaque fonction devra faire appel à la resource User.  Pour cela, il faudra déclarer de nouvelles fonctions sur User afin d'utiliser l'API en ce sens.

    $scope.getUsersMatching = function(val){
        return User.matching({userId:$scope.user.id,actionId:val}).$promise.then(function(res){
            return res;
        });
    };

[Corrigé](https://github.com/thebignet/workshopAngularClient/compare/etape13...etape14)
