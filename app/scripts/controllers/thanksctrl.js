'use strict';

angular.module('rascal').controller('ThanksCtrl', ['$scope', '$state', '$timeout', 'DataService', function ($scope, $state, $timeout, DataService) {
    $scope.btnIndexZero = {
        visible: false
    };
    $scope.btnIndexOne = {
        visible: false
    };

    $scope.pageTimeout = 30 * 1000;
    $scope.buttonText = 'Start Again';
    $scope.thanksCopy = 'Thank you for choosing MedConnect®, a service of Cardinal Health! A dedicated representative is hard at work identifying an eligible supply provider for you. You will receive a call shortly to review your request and discuss your medical supply provider options.';

    $scope.startAgain = function () {
        DataService.clearData($scope.clearDataHandler);
    };

    $scope.clearDataHandler = function () {
        $state.go('landing');
    };

    $timeout($scope.startAgain, $scope.pageTimeout);

}]);
