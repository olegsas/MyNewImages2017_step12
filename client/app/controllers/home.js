angular.module('app')

.controller('homeCtrl',function($http,$scope,$location,$routeParams,$uibModal){
    let token = window.localStorage.getItem('jwt');
    if(token == null){
        $location.path('/login');
    }else{
        $http.post('/checkUser',{token:token})
            .then(function(data){
                $location.path('/home/'+data.data.username)
            })
            .catch(function(err){
                var modalInstance = $uibModal.open({
                    template: '<h1 style="margin:50px auto;width:200px">"'+ err.data.err+'"</h1>'
                })
            })
    }
})