/**
 * Created by Sajjad on 06/09/2017.
 */
var app = angular.module('myApp', []);
app.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
}]);