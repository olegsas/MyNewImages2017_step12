angular.module('app')

.controller('logoutCtrl',function($http,$scope,$location,$uibModal,auth){
    $http.post('/logout')
        .then(function(data){
            window.localStorage.removeItem('jwt');
            $location.path('/login')
        })
        .catch(function(err){
                var modalInstance = $uibModal.open({
                    template: '<h1 style="margin:50px auto;width:200px">"'+ err.data.err+'"</h1>'
                })
        })
       
})