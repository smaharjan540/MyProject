'use strict';

angular.module('rascal').controller('ProductRequestCtrl', function($scope, DataService, $ionicModal, $state) {

    $scope.init = function() {
        if (!DataService.productRequest) {
            DataService.productRequest = {
                requestedItems: [{placeholder: true}, {}, {}, {}, {}]
            };
        }

        $scope.btnIndexZero = {
            disabled: !DataService.productRequest.complete,
            visible: true,
            href: 'nurseConfirmation'
        };

        $scope.btnIndexOne = {
            disabled: false,
            visible: true,
            href: 'nursePatientDoctor'
        };

        $scope.form = DataService.productRequest;

        $scope.files = DataService.files;
        $scope.fileCount = $scope.files ? $scope.files.length : 0;

        $scope.selectYes = false;

        $scope.toggleProductUpload = function() {
            $scope.form.productInfo = false;
            $scope.form.productUpload = true;
        };

        $scope.toggleProductInfo = function() {
            $scope.form.productInfo = true;
            $scope.form.productUpload = false;
            $scope.selectYes = false;
        };

        $scope.filesUploadCheck = function() {
            $scope.toggleProductUpload();
            $scope.selectYes = !$scope.selectYes;
            if ($scope.selectYes) {
                $scope.form.complete = true;
                $scope.btnIndexZero.disabled = false;
            }
            else if ($scope.form.complete) {
                $scope.btnIndexZero.disabled = true;
            }
        };
    };

    $scope.addNewItems = function () {
        $scope.form.itemsAdded = true;
        for (var i = 0; i < 5; i++) {
            $scope.form.requestedItems.push({});
        }
    };

    $scope.checkFormFields = function () {
        function isNonEmpty(item) {
            return !!item.itemNumber || !!item.description || !!item.quantity;
        }
        function isValidRequestItem(item) {
            return (!!item.itemNumber || !!item.description) && !!item.quantity;
        }
        var items = $scope.form.requestedItems;
        var i, nonEmpty = false;
        for (i = 0; i < items.length; i++) {
            if (isNonEmpty(items[i])) {
                nonEmpty = true;
                if (!isValidRequestItem(items[i])) {
                    break;
                }
            }
        }
        if (i === items.length && nonEmpty) {
            $scope.form.complete = true;
            $scope.btnIndexZero.disabled = false;
        }
        else {
            $scope.form.complete = false;
            $scope.btnIndexZero.disabled = true;
        }
    };

    $scope.init();

    $scope.$watch('form.requestedItems', function () {
        if( !$scope.ignoreWatchRequestItemsTrigger ) {
            $scope.checkFormFields();
        }
        $scope.ignoreWatchRequestItemsTrigger = false;
    }, true);

    $scope.$watch('files', function() {
      if( !$scope.ignoreWatchFilesTrigger ) {
        $scope.updateImageDiv();
      }
      $scope.ignoreWatchFilesTrigger = false;
    }, true);

    $scope.updateImageDiv = function() {
        $scope.form.complete = ($scope.fileCount >= 1);
        $scope.btnIndexZero.disabled = ($scope.fileCount < 1);
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

    $scope.ignoreWatchRequestItemsTrigger = true;
    $scope.ignoreWatchFilesTrigger = true;
});
