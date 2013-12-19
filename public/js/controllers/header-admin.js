angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Users",
        "link": "users"
    }];
    
    $scope.isCollapsed = false;
}]);