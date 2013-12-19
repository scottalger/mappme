//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/users', {
            templateUrl: '/views/users/list.html'
        }).
        when('/users/create', {
            templateUrl: '/views/users/create.html'
        }).
        when('/users/:userId/edit', {
            templateUrl: '/views/users/edit.html'
        }).
        when('/users/:userId', {
            templateUrl: '/views/users/view.html'
        }).
        when('/', {
            templateUrl: '/views/admin.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix("!");
    }
]);