'use strict';

angular.module('rascal').controller('StartRequestCtrl', function($scope, DataService, $idle) {

  $scope.init = function () {
    $idle.watch();    
  };

  if (!DataService.startRequest) {
    DataService.startRequest = {};
  }

  $scope.btnIndexZero = {
    disabled: !DataService.startRequest.complete,
    visible: true,
    href: 'intro'
  };
  $scope.btnIndexOne = {
    visible: false,
    href: 'startRequest'
  };

  $scope.isInStore = DataService.isNativeApp();
  $scope.userType = DataService.startRequest.userType;

  $scope.setSelected = function(type) {
    $scope.userType = type;
    DataService.startRequest = { userType: type, complete: true };
    $scope.btnIndexZero.disabled = false;
  };

  $scope.selectionClass = function (type) {
    return (type === $scope.userType ? 'btn-selected' : 'btn-unselected');
  };

  $scope.anOptionIsSelected = function () {
    return ($scope.userType !== null && $scope.userType !== '');
  };

  $scope.init();
});
