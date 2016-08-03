'use strict';

angular.module('rascal').controller('NursePatientInfoCtrl', function($scope, DataService, $ionicModal, $state) {

    if (!DataService.nursePatientInfo) {
        DataService.nursePatientInfo = {};
    }

    $scope.form = DataService.nursePatientInfo;
    $scope.stateValid = true;
    $scope.zipValid = true;

    $scope.patientForm = !!DataService.nursePatientInfo.patientForm;
    $scope.patientInfoUpload = !!DataService.nursePatientInfo.patientInfoUpload;

    $scope.files = DataService.files;
    $scope.fileCount = DataService.files.length;

    $scope.$watch('files', function() {
        $scope.updateImageDiv();
    },true);

    $scope.allRequiredFieldsAreFilled = function() {
        return (!!$scope.form.name && !!$scope.form.address1 &&
            !!$scope.form.city && !!$scope.form.state && !!$scope.form.zip &&
            $scope.validateDOB() && !!$scope.form.gender);
    };

    $scope.btnIndexZero = {
        disabled: !DataService.nursePatientInfo.complete,
        visible: true,
        href: 'nursePatientInsurance'
    };

    $scope.btnIndexOne = {
        disabled: false,
        visible: true,
        href: 'nurseDetails'
    };

    $scope.updateData = function() {
        $scope.form.complete = $scope.allRequiredFieldsAreFilled();
        DataService.nursePatientInfo = $scope.form;
        DataService.patientInfo = DataService.nursePatientInfo;
        $scope.btnIndexZero.disabled = !DataService.nursePatientInfo.complete;
    };

    $scope.updateState = function() {
        DataService.nursePatientInfo.patientForm = $scope.patientForm;
        DataService.nursePatientInfo.patientInfoUpload = $scope.patientInfoUpload;
    };

    $scope.togglePatientInfoUpload = function() {
        $scope.patientForm = false;
        $scope.patientInfoUpload = true;
        $scope.updateState();
        $scope.btnIndexZero.disabled = ($scope.fileCount === 0);
    };

    $scope.togglePatientForm = function() {
        $scope.patientForm = true;
        $scope.patientInfoUpload = false;
        DataService.nursePatientInfo.complete = $scope.allRequiredFieldsAreFilled();
        $scope.btnIndexZero.disabled = !DataService.nursePatientInfo.complete;
        angular.element('#nursepatientinfodob').inputmask('m/d/y', { 'placeholder': 'MM/DD/YYYY' });
        $scope.updateState();
    };

    $scope.$watchCollection('form', function() {
        if($scope.patientForm){
            $scope.updateData();
        }
    });

    $scope.pickMale = function() {
        $scope.form.gender = 'Male';
    };

    $scope.pickFemale = function() {
        $scope.form.gender = 'Female';
    };

    $scope.validateDOB = function() {
      var dob = new Date($scope.form.dob);
      if( !isNaN(dob.getTime()) ) {
        return true;
      }
      return false;
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
        if ($scope.patientForm) {
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
        }
    };

    $scope.updateImageDiv = function() {
        $scope.files = DataService.files;
        $scope.fileCount = DataService.files.length;
        $scope.uploadButton = DataService.uploadButton;
        DataService.nursePatientInfo.complete = ($scope.fileCount >= 1);
        $scope.btnIndexZero.disabled = !DataService.nursePatientInfo.complete;
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

});
