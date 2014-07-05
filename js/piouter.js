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
    $scope.$watch('user',function(user){
        if(user.$resolved){
            $scope.pious = Piou.query({userId:user.id});
            $scope.followers = Follower.query({userId:user.id});
        }
    },true);

    /* Modification de l'utilisateur */
    $scope.changeUser = function(){
        $scope.user = User.get({userId:$scope.newUser});
        $scope.newUser = '';
    };

    /* Envoi du message */
    $scope.send = function(){
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
    };

});
