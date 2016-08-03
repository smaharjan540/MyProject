'use strict';

angular.module('rascal').controller('NurseDetailsCtrl', function($scope, DataService) {

    $scope.init = function() {
        if (!DataService.nurseDetails) {
            DataService.nurseDetails = {};
        }

        $scope.btnIndexZero = {
            disabled: !DataService.nurseDetails.complete,
            visible: true,
            href: 'nursePatientInfo'
        };
        $scope.btnIndexOne = {
            disabled: false,
            visible: true,
            href: 'intro'
        };

        $scope.form = DataService.nurseDetails;
        $scope.stateValid = true;
        $scope.zipValid = true;
    };

    $scope.allRequiredFieldsAreFilled = function() {
        return (!!$scope.form.name && !!$scope.form.phoneNumber &&
            !!$scope.form.facility && !!$scope.form.city && !!$scope.form.state);
    };

    $scope.updateData = function() {
        $scope.form.complete = $scope.allRequiredFieldsAreFilled();
        $scope.btnIndexZero.disabled = !$scope.form.complete;
    };

    $scope.phoneValid = function() {
        $scope.phoneInvalid = false;
    };

    $scope.onStateFocus = function() {
        $scope.stateValid = true;
    };

    $scope.onZipFocus = function() {
        $scope.zipValid = true;
    };

    $scope.validate = function() {
        var result = true;
        if (!!$scope.form.phoneNumber && $scope.form.phoneNumber.length === 10) {
            $scope.phoneInvalid = false;
        } else {
            $scope.phoneInvalid = true;
            result = false;
        }
        if (!!$scope.form.state && $scope.form.state.length === 2) {
            $scope.stateValid = true;
        } else {
            $scope.stateValid = false;
            result = false;
        }
        if ((!!$scope.form.zip && $scope.form.zip.length === 5) || (!$scope.form.zip || $scope.form.zip.length===0 )) {
             $scope.zipValid = true;
         } else {
             $scope.zipValid = false;
             result = false;
         }

        return result;
    };

    $scope.init();
    $scope.$watchCollection('form', function() {
        $scope.updateData();
    });

});
