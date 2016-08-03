'use strict';

angular.module('rascal').controller('PatientInfoCtrl', function($scope, DataService) {

    if (!DataService.patientInfo) {
        DataService.patientInfo = {};
    }
    angular.element('#patientinfodob').inputmask('m/d/y', { 'placeholder': 'MM/DD/YYYY' });

    $scope.btnIndexZero = {
        disabled: !DataService.patientInfo.complete,
        visible: true,
        href: 'contactDetails'
    };

    $scope.btnIndexOne = {
        disabled: false,
        visible: true,
        href: 'patientNeeds'
    };

    $scope.form = DataService.patientInfo;
    $scope.stateValid = true;
    $scope.zipValid = true;

    $scope.$watchCollection('form', function() {
        $scope.updateData();
    });

    $scope.pickMale = function() {
        $scope.form.gender = 'Male';
    };

    $scope.pickFemale = function() {
        $scope.form.gender = 'Female';
    };

    $scope.allRequiredFieldsAreFilled = function() {
        return (!!$scope.form.name && !!$scope.form.address1 &&
            !!$scope.form.city && !!$scope.form.state && !!$scope.form.zip &&
            $scope.validateDOB() && !!$scope.form.gender);
    };

    $scope.validateDOB = function() {
      var dob = new Date($scope.form.dob);
      if( !isNaN(dob.getTime()) ) {
        return true;
      }
      return false;
    };

    $scope.updateData = function() {
        $scope.form.complete = $scope.allRequiredFieldsAreFilled();
        DataService.patientInfo = $scope.form;
        $scope.btnIndexZero.disabled = !DataService.patientInfo.complete;
    };

    $scope.selectionClass = function(type) {
        return (type === $scope.form.gender ? 'btn-selected' : 'btn-unselected');
    };

    $scope.onStateFocus = function() {
        $scope.stateValid = true;
    };

    $scope.onZipFocus = function() {
        $scope.zipValid = true;
    };

    $scope.validate = function() {
        var result = true;
        if (typeof $scope.form.state === 'undefined' || 2 !== $scope.form.state.length) {
            $scope.stateValid = false;
            result = false;
        }
        if (typeof $scope.form.zip === 'undefined' || 5 !== $scope.form.zip.length) {
            $scope.zipValid = false;
            result = false;
        }
        return result;
    };

    $scope.updateData();
});
