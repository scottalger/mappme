//Articles service used for articles REST endpoint
angular.module('mean.system').factory("Geo", ['$q', '$rootScope', function($q, $rootScope) {
    return function() {

        this.changeLocation= function (coords) {
            $rootScope.$broadcast("locationChanged", {
                coordinates: coords
            });
        };

        var d = $q.defer();
        
        setTimeout(function () {

            try {
                if (navigator.geolocation) {

                    console.log(navigator.geolocation);

                    navigator.geolocation.getCurrentPosition(function (position) {
                        $rootScope.$apply(function () {
                            var longitude = position.coords.longitude;
                            changeLocation(position.coords);
                            d.resolve({
                                aField: 'Hello ' + position.coords.longitude + '!'
                            });
                        });
                    },
                    function (error) {
                        d.reject(error);
                    });
                }
                else {
                    d.reject('location services not allowed');
                }
            }
            catch (err) {
                console.error(err);
                d.reject(err);
            }
        }, 1000);
        return d.promise;
    };}]);