angular.module('app',['ngRoute','ngFileUpload','ngAnimate', 'ngSanitize', 'ui.bootstrap'])

.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/registrate', {
        templateUrl:'../templates/registration.html',
        controller:'registrationCtrl'
    })
    .when('/login', {
        templateUrl:'../templates/login.html',
        controller:'loginCtrl'
    })
    .when('/logout', {
        templateUrl:'../templates/login.html',
        controller:'logoutCtrl'
    })
    .when('/users', {
        templateUrl:'../templates/users.html',
        controller:'usersCtrl'
    })
    .when('/home', {
        templateUrl:'../templates/home.html',
        controller:'homeCtrl'
    })
    .when('/home/:userId', {
        templateUrl:'../templates/home.html',
        controller:'homeIdCtrl'
    })
    .otherwise({redirectTo: '/home'});
})

.factory('auth',function(){
    let login ={}

    login.isLogin = function(){
        let token = window.localStorage.getItem('jwt')

        if (token){
            return true
        }else{
            return false
        }
     }
       
   return login;
})

.run(['$rootScope','$location','auth','$routeParams',
    function($rootScope,$location,auth,$routeParams){
        $rootScope.$on('$routeChangeStart',function(event, next, current){
        })
}])

.controller('myCtrl',function($http,$scope,$location,$uibModal,$rootScope,auth,$routeParams){

        $scope.$on('$routeChangeSuccess',function(event, previous, current){
            $scope.isLogin = auth.isLogin();
            console.log($scope.isLogin)
        })
})
    