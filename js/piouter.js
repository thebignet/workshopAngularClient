var app = angular.module('app', ['ui.bootstrap','angular-md5','ngResource']);
app.constant('userId', 'thebignet@gmail.com');
app.constant('apiRoot', 'http://workshop-angular-server.herokuapp.com');

app.controller('MainCtrl', function ($scope, $log, userId, $resource, apiRoot) {
    $scope.message = 'Message';
    $scope.userToFollow = '';
    $scope.followers = [{id:'thebignet@gmail.com'},{id:'machin@gmail.com'}];

    /* Resources */
    var Piou = $resource(apiRoot + '/piou/:userId', {userId:'@userId'});
    var User = $resource(apiRoot + '/user/:userId/:action/:actionId', {userId:'@userId'});
    var Follower = $resource(apiRoot + '/follower/:userId', {userId:'@userId'});

    /* Récupération des informations */
    $scope.user = User.get({userId:userId});
    $scope.pious = Piou.query({userId:userId});
    $scope.followers = Follower.query({userId:userId});

    /* Modification de l'utilisateur */
    $scope.changeUser = function(){
        $scope.user = User.get({userId:$scope.newUser});
        $scope.pious = Piou.query({userId:$scope.newUser});
        $scope.followers = Follower.query({userId:newUser});
        $scope.newUser = '';
    }

});
