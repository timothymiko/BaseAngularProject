var app = angular.module('app', [
    'ui.router'
]);

app.config(
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
// end of view states

    }
);

app.run(
    function ($rootScope, $state, $stateParams) {

    }
);