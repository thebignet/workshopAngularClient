var app = angular.module('app', ['ui.bootstrap','angular-md5']);
app.constant('userId', 'thebignet@gmail.com');

app.controller('MainCtrl', function ($scope, $log, userId) {
    $scope.user = {id:userId};
    $scope.message = 'Message';
    $scope.newUser = '';
    $scope.userToFollow = '';
    $scope.pious = [
        {id:'thebignet@gmail.com',message:'Salut les gens',date:new Date()},
        {id:'machin@gmail.com',message:'Bonjour',date:new Date()},
        {id:'thebignet@gmail.com',message:'Kikou lol',date:new Date()}
    ];
});
