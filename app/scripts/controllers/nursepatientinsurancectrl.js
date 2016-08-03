'use strict';

angular.module('rascal').controller('NursePatientInsuranceCtrl', function($scope, DataService, $ionicModal, $state) {

    if (!DataService.nursePatientInsurance) {
        DataService.nursePatientInsurance = {};
    }
    $scope.data = DataService.nursePatientInsurance;
    $scope.phoneValid = true;

    $scope.patientInsurance = !!DataService.nursePatientInsurance.patientInsurance;
    $scope.patientInsuranceUpload = !!DataService.nursePatientInsurance.patientInsuranceUpload;

    $scope.btnIndexZero = {
        disabled: !DataService.nursePatientInsurance.complete,
        visible: true,
        href: 'nursePatientDoctor'
    };
    $scope.btnIndexOne = {
        disabled: false,
        visible: true,
        href: 'nursePatientInfo'
    };

    $scope.files = DataService.files;
    $scope.selectYes = false;

    $scope.allRequiredFieldsAreFilled = function() {
        return (!!$scope.data.name && !!$scope.data.policyNumber && !!$scope.data.phoneNumber);
    };

    $scope.updateData = function() {
        $scope.data.complete = $scope.allRequiredFieldsAreFilled();
        DataService.nursePatientInsurance = $scope.data;
        if( $scope.btnIndexZero ) {
          $scope.btnIndexZero.disabled = !$scope.data.complete;
        }
    };

    $scope.updateState = function() {
        DataService.nursePatientInsurance.patientInsurance = $scope.patientInsurance;
        DataService.nursePatientInsurance.patientInsuranceUpload = $scope.patientInsuranceUpload;
    };

    $scope.togglePatientInsuranceUpload = function() {
        $scope.patientInsurance = false;
        $scope.patientInsuranceUpload = true;
        $scope.updateState();
    };

    $scope.togglePatientInsurance = function() {
        $scope.patientInsurance = true;
        $scope.patientInsuranceUpload = false;
        DataService.nursePatientInsurance.complete = $scope.allRequiredFieldsAreFilled();
        $scope.btnIndexZero.disabled = !DataService.nursePatientInsurance.complete;
        $scope.updateState();
        $scope.selectYes = false;
    };

    $scope.filesUploadCheck = function() {
        $scope.selectYes = !$scope.selectYes;
        if ($scope.selectYes) {
            $scope.togglePatientInsuranceUpload();
            $scope.btnIndexZero.disabled = $scope.files.length < 1;
            $scope.data.complete = $scope.files.length > 0;
        } else {
            $scope.btnIndexZero.disabled = true;
        }
    };

    $scope.onPhoneNumberFocus = function() {
        $scope.phoneValid = true;
    };

    $scope.isPhoneNumberValid = function() {
        return !!$scope.data.phoneNumber && 10 === $scope.data.phoneNumber.length;
    };

    $scope.onInsuranceEditChng = function() {
        if (typeof $scope.data.name === 'undefined' || 0 === $scope.data.name.length) {
            $scope.btnIndexZero.disabled = true;
            $scope.data.complete = false;
        } else if (typeof $scope.data.policyNumber === 'undefined' || 0 === $scope.data.policyNumber.length) {
            $scope.btnIndexZero.disabled = true;
            $scope.data.complete = false;
        } else if (typeof $scope.data.phoneNumber === 'undefined' || 0 === $scope.data.phoneNumber.length) {
            $scope.btnIndexZero.disabled = true;
            $scope.data.complete = false;
        } else {
            DataService.nursePatientInsurance = $scope.data;
            $scope.btnIndexZero.disabled = false;
            $scope.data.complete = true;
        }
    };

    $scope.validate = function() {
        if ($scope.patientInsurance) {
            var result = true;
            if (!$scope.isPhoneNumberValid()) {
                $scope.phoneValid = false;
                result = false;
            }
            return result;
        }
    };

    $scope.fileCount = DataService.files.length;

    $scope.data = DataService.nursePatientInsurance || {};

    $scope.$watchCollection('form', function() {
      if( !$scope.ignoreWatchFormTrigger ) {
        $scope.updateData();
      }
      $scope.ignoreWatchFormTrigger = false;
    });

    $scope.$watch('files', function() {
      if( !$scope.ignoreWatchFilesTrigger ) {
        $scope.updateImageDiv();
      }
      $scope.ignoreWatchFilesTrigger = false;
    }, true);

    $scope.updateImageDiv = function() {
      $scope.files = DataService.files;
      $scope.fileCount = DataService.files.length;
      DataService.nursePatientInsurance.complete = ($scope.fileCount >= 1);
      $scope.btnIndexZero.disabled = !DataService.nursePatientInsurance.complete;
    };

    $ionicModal.fromTemplateUrl('templates/deleteConfirmation.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.showConfirm = function(idx, fileName) {
        $scope.modal.show();
        $scope.fileIndex = idx;
        $scope.fileName = fileName;
    };

    $scope.deleteFile = function() {
        DataService.files.splice($scope.fileIndex, 1);
        $scope.updateImageDiv();
        $scope.modal.hide();
        $state.reload();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.showCheckBoxCtrl = function() {
      if( $scope.fileCount >= 1 ) {
        return true;
      }
      return false;
    };

    $scope.ignoreWatchFormTrigger = true;
    $scope.ignoreWatchFilesTrigger = true;
});
