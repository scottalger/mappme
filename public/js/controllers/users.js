angular.module('mean.users').controller('UserController', ['$scope', '$routeParams', '$location', 'Global', 'Users', 
    function ($scope, $routeParams, $location, Global, Users) {

    $scope.global = Global;

    $scope.remove = function(user) {
        if (user) {
            user.$remove();  

            for (var i in $scope.users) {
                if ($scope.users[i] == user) {
                    $scope.users.splice(i, 1);
                }
            }
        }
        else {
            $scope.user.$remove();
            $location.path('users');
        }
    };

    $scope.update = function() {
        var user = $scope.user;
        if (!user.updated) {
            user.updated = [];
        }
        user.updated.push(new Date().getTime());

        user.$update(function() {
            $location.path('users/' + user._id);
        });
    };

    $scope.find = function() {
        Users.query(function(users) {
            $scope.users = users;
        });
    };

    $scope.findOne = function() {
        Users.get({
            userId: $routeParams.userId
        }, function(user) {

            console.log("USER",user);

            $scope.user = user;
        });
    };
}]);