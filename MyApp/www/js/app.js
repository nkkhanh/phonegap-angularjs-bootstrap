var myApp = angular.module("myApp", ['ngRoute']);
myApp.config(['$routeProvider', function($routeProvider) {
    console.log('setup routes');
    $routeProvider
        .when('/test', {
            templateUrl: 'partials/test.html',
            //controller: 'TopViewController'
        })
        .otherwise({
            redirectTo: '/test'
                // redirectTo: '/specialmenuview'
        });
}]);


