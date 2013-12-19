angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.users','google-maps','btford.socket-io'])
.config(function (socketProvider) {
  var mySocket = io.connect('http://localhost:3000');
  // do stuff with mySocket
  socketProvider.ioSocket(mySocket);
});;

angular.module('mean.system', ['google-maps']);
angular.module('mean.users', ['google-maps']);