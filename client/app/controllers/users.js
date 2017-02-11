angular.module('app')

.controller('usersCtrl',function($http,$scope,$location,$routeParams){

    $http.post('/getUsersList')
        .then(function(data){
            $scope.users = data.data;
        })
})