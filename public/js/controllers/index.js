angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'Geo','socket','Users', function ($scope, Global, Geo, socket, Users) {
    $scope.global = Global;

    $scope.showWindow = true;

    $scope.message = null;

    $scope.messages = [];

    $scope.users = [];

    angular.extend($scope, {
        center: {
            latitude: -12, // initial map center latitude
            longitude: -77, // initial map center longitude
        },
        markers: [], // an array of markers,
        zoom: 8, // the zoom level,
    });

    if($scope.global.user != null){
        Geo();

        $scope.$on("locationChanged", function (event, parameters) {
            $scope.coords= parameters.coordinates;

            var user = $scope.global.user;

             Users.get({
                userId: user._id
            }, function(user) {

                if (!user.updated) user.updated = [];

                user.updated.push(new Date().getTime());
                user.latitude = $scope.coords.latitude;
                user.longitude = $scope.coords.longitude;

                user.$update(function(u){
                    console.log("USER UPDATED : ",u);
                });
            });

            var position = {
            	latitude : $scope.coords.latitude,
            	longitude : $scope.coords.longitude
            };

            $scope.center = position;

            $scope.zoom = 15;

            $scope.markers.push({
            	latitude : $scope.coords.latitude,
            	longitude : $scope.coords.longitude,
            	title : $scope.global.user.first_name + " " + $scope.global.user.last_name,
                id : $scope.global.user._id
            });

        });
    }

    /**
    * Sockets
    */

    if($scope.global.user != null)
        socket.emit("user:join", $scope.global.user);

    socket.on('user:join', function (data) {
        console.log("user:join",data);

        var exists = false;

        for(var i in $scope.users){
            if($scope.users[i]._id == data._id){
                exists = true;
            }
        }

        if(!exists){
            $scope.users.push(data);
            $scope.markers.push({
                latitude : data.latitude,
                longitude : data.longitude,
                title : data.first_name + " " + data.last_name,
                _id : data._id
            })
        }
    });

    socket.on('user:quit', function (data) {
        console.log("user:quit",data);

        for(var i in $scope.users){
            if($scope.users[i]._id == data._id){
               $scope.users =  $scope.users.slice(i,1);
            }
        }

        for(var i in $scope.markers){
            if($scope.markers[i]._id == data._id){
               $scope.markers = $scope.markers.slice(i,1);
            }
        }
    });

    socket.on('user:message', function (data) {
        $scope.messages.push(data);
        console.log("user:message", data);

        var scroll = $('.tli-chat-board-inner').height();
        $('.tli-chat-board').animate({'scrollTop': scroll+100},1000);
    });

    socket.on("load:messages",function(messages){
        console.log("MENSAJES : ",messages);
        $scope.messages = $scope.messages.concat(messages);

        setTimeout(function(){
            var scroll = $('.tli-chat-board-inner').height();
            $('.tli-chat-board').animate({'scrollTop': scroll+100},1000);
        },3000);

    });

    socket.on("load:users",function(users){
        $scope.users = users;

        for(var i in $scope.users){
            $scope.markers.push({
                latitude : $scope.users[i].latitude,
                longitude : $scope.users[i].longitude,
                title : $scope.users[i].first_name + " " + $scope.users[i].last_name,
                _id : $scope.users[i]._id
            });
        }
    });

    $(window).bind('beforeunload',function(){
       return socket.emit('user:quit',$scope.global.user);
    });

    /**
    * Methods
    */

    $scope.sendMessage = function(){

        console.log("MESSAGE : " , $scope.message);

        var data = {
            user : $scope.global.user,
            message : $scope.message
        }

        socket.emit("user:message", data)

        $scope.message = null;
    }

    $scope.showLocation = function(user){
        $scope.center = {
            latitude : user.latitude,
            longitude : user.longitude
        };
    }


}]);