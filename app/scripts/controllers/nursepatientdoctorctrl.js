'use strict';

angular.module('rascal').controller('NursePatientDoctorCtrl', function($scope, DataService, $ionicModal, $state) {

    if (!DataService.nursePatientDoctor) {
        DataService.nursePatientDoctor = {};
    }

    $scope.btnIndexZero = {
        disabled: !DataService.nursePatientDoctor.complete,
        visible: true,
        href: 'productRequest'
    };
    $scope.btnIndexOne = {
        disabled: false,
        visible: true,
        href: 'nursePatientInsurance'
    };

    $scope.files = DataService.files;

    $scope.doctorInfo = !!DataService.nursePatientDoctor.doctorInfo;
    $scope.doctorFilesUpload = !!DataService.nursePatientDoctor.doctorFilesUpload;

    $scope.updateState = function() {
        DataService.nursePatientDoctor.doctorInfo = $scope.doctorInfo;
        DataService.nursePatientDoctor.doctorFilesUpload = $scope.doctorFilesUpload;
    };

    $scope.toggleDoctorFilesUpload = function() {
      $scope.doctorInfo = false;
      $scope.doctorFilesUpload = true;
      $scope.updateState();
    };

    $scope.toggleDoctorInfo = function() {
      $scope.doctorInfo = true;
      $scope.doctorFilesUpload = false;
      $scope.updateState();
      $scope.selectYes = false;
    };

    $scope.stateValid = true;
    $scope.zipValid = true;
    $scope.phoneValid = true;

    $scope.filesUploadCheck = function() {
        $scope.toggleDoctorFilesUpload();
        $scope.form.complete = true;
        $scope.selectYes = !$scope.selectYes;
        if ($scope.selectYes) {
            $scope.btnIndexZero.disabled = false;
        } else {
            $scope.btnIndexZero.disabled = true;
        }
    };

    $scope.allRequiredFieldsAreFilled = function() {
        return (!!$scope.form.name && !!$scope.form.city && !!$scope.form.state && !!$scope.form.zip && !!$scope.form.phoneNumber && (!!$scope.form.dcode1 || $scope.form.dcode2 || !!$scope.form.dcode3 || !!$scope.form.ddesc1 || !!$scope.form.ddesc2 || !!$scope.form.ddesc3));
    };

    $scope.form = DataService.nursePatientDoctor;

    $scope.onStateFocus = function() {
        $scope.stateValid = true;
    };

    $scope.onZipFocus = function() {
        $scope.zipValid = true;
    };

    $scope.onPhoneNumberFocus = function() {
        $scope.phoneValid = true;
    };

    $scope.onChange = function() {
        var complete = ($scope.form.name !== '' && $scope.form.city !== '' && $scope.form.state !== '' && $scope.form.zip !== '' && $scope.form.phoneNumber !== '');
        $scope.btnIndexZero.disabled = !complete;
        $scope.form.complete = complete;
        DataService.nursePatientDoctor = $scope.form;
    };

    $scope.updateData = function() {
        if ($scope.doctorInfo) {
            $scope.form.complete = $scope.allRequiredFieldsAreFilled();
            DataService.nursePatientDoctor = $scope.form;
            $scope.btnIndexZero.disabled = !$scope.form.complete;
        }
    };

    $scope.isPhoneNumberValid = function() {
        if ($scope.form.phoneNumber && 10 === $scope.form.phoneNumber.length) {
            return true;
        }
        return false;
    };

    $scope.validate = function() {
        if ($scope.doctorInfo) {
            var result = true;
            if (!$scope.isPhoneNumberValid()) {
                $scope.phoneValid = false;
                result = false;
            }
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

    $scope.fileCount = DataService.files.length;

    $scope.$watch('files', function() {
        if (!$scope.ignoreWatchFilesTrigger) {
            $scope.updateImageDiv();
        }
        $scope.ignoreWatchFilesTrigger = false;
    }, true);

    $scope.$watchCollection('form', function() {
        if (!$scope.ignoreWatchFormTrigger) {
            $scope.updateData();
        }
        $scope.ignoreWatchFormTrigger = false;
    });

    $scope.updateImageDiv = function() {
        $scope.files = DataService.files;
        $scope.fileCount = DataService.files.length;
        DataService.nursePatientDoctor.complete = ($scope.fileCount >= 1) ? true : false;
        $scope.btnIndexZero.disabled = ($scope.fileCount >= 1) ? false : true;
        $scope.ignoreWatchFormTrigger = true;
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
        if ($scope.fileCount >= 1) {
            return true;
        }
        return false;
    };

    $scope.ignoreWatchFormTrigger = true;
    $scope.ignoreWatchFilesTrigger = true;
});
