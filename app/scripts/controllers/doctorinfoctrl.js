'use strict';

angular.module('rascal').controller('DoctorInfoCtrl', function($scope, DataService) {

  if (!DataService.doctorInfo) {
    DataService.doctorInfo = {};
  }

  $scope.phoneValid = true;
  $scope.stateValid = true;
  $scope.zipValid = true;

  $scope.doctor = DataService.doctorInfo;

  $scope.btnIndexZero = {
    disabled: !DataService.doctorInfo.complete,
    visible: true,
    href: 'insurance'
  };
  $scope.btnIndexOne = {
    disabled: false,
    visible: true,
    href: 'contactDetails'
  };

  $scope.onPhoneNumberFocus = function() {
    $scope.phoneValid = true;
  };
  $scope.onStateFocus = function() {
    $scope.stateValid = true;
  };
  $scope.onZipFocus = function() {
    $scope.zipValid = true;
  };

  $scope.requiredFieldsAreFilled = function () {
    return !!$scope.doctor.name && !!$scope.doctor.city && !!$scope.doctor.state && !!$scope.doctor.zip;
  };

  $scope.updateData = function() {
    var complete = $scope.requiredFieldsAreFilled();
    $scope.btnIndexZero.disabled = !complete;
  };

  $scope.isPhoneNumberValid = function() {
    if( typeof $scope.doctor.phoneNumber !== 'undefined' ) {
      return $scope.doctor.phoneNumber.length === 10;
    }
    return true;
  };

  $scope.isStateValid = function() {
    return $scope.doctor.state.length === 2;
  };

  $scope.isZipValid = function() {
    return $scope.doctor.zip.length === 5;
  };

  $scope.validate = function() {
    var result = true;
    if (!!$scope.doctor.phoneNumber && !$scope.isPhoneNumberValid()) {
      $scope.phoneValid = false;
      result = false;
    }
    if (!$scope.isStateValid()) {
      $scope.stateValid = false;
      result = false;
    }
    if (!$scope.isZipValid()) {
      $scope.zipValid = false;
      result = false;
    }
    $scope.doctor.complete = result;
    return result;
  };

  $scope.$watchCollection('doctor', function () {
    $scope.updateData();
  });

});
