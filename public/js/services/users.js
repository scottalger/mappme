angular.module('mean.users').factory("Users", ['$resource', function($resource) {
    return $resource('/api/users/:userId', 
    {
        userId: '@_id'
    }, 
    {
        update: { method: 'PUT' }
    });
}]);

angular.module('mean.system').factory("Users", ['$resource', function($resource) {
    return $resource('/api/users/:userId', 
    {
        userId: '@_id'
    }, 
    {
        update: { method: 'PUT' }
    });
}]);