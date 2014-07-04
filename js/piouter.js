var app = angular.module('app', ['ui.bootstrap','angular-md5']);
app.constant('userId', 'thebignet@gmail.com');

app.controller('MainCtrl', function ($scope, $log, userId) {
    $scope.user = {id:userId};
    $scope.message = 'Message';
    $scope.newUser = '';
    $scope.userToFollow = '';
});
