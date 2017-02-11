angular.module('app')

.controller('loginCtrl',function($http,$scope,$location,$uibModal,auth){
   
    $scope.login = function(user){
        $http.post('/login',user)
            .then(function(data){
                window.localStorage['jwt'] = angular.toJson(data.data.token);
                $location.path('/home/'+user.username)
            })
            .catch(function(err){
                var modalInstance = $uibModal.open({
                    template: '<h1 style="margin:50px auto;width:200px">"'+ err.data.err+'"</h1>'
                })
            })
            
    }
})