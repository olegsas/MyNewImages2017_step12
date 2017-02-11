angular.module('app')

.controller('registrationCtrl',function($http,$scope,$location,$uibModal){
    $scope.registrate = function(user){
        $http.post('/registrate',user)
           .then(function(data){
               window.localStorage['jwt'] = angular.toJson(data.data.token);
               $location.path('/login')  
            })
            .catch(function(err){
                var modalInstance = $uibModal.open({
                    template: '<h1 style="margin:50px auto;width:200px">"'+ err.data.err+'"</h1>'
                })
            })
    }
})

// <div style="width:200px;height:200px"></div>