angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.users','google-maps','btford.socket-io']);

angular.module('mean.system', ['google-maps']);
angular.module('mean.users', ['google-maps']);