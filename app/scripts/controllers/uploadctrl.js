'use strict';

angular.module('rascal').controller('UploadCtrl', ['$scope', '$state', '$timeout', 'DataService', 'fileReader', '$ionicModal', '$ionicScrollDelegate', function($scope, $state, $timeout, DataService, fileReader, $ionicModal, $ionicScrollDelegate) {
    console.log(fileReader);
    $scope.getFile = function(data) {
        $scope.progress = 0;
        if (data.size <= 3000000) {
            if ((DataService.files.length < 4) && ($scope.parseFileType(data.type) === 'pdf' ||
                    $scope.parseFileType(data.type) === 'prn' ||
                    $scope.parseFileType(data.type) === 'jpg' ||
                    $scope.parseFileType(data.type) === 'jpeg' ||
                    $scope.parseFileType(data.type) === 'tif' ||
                    $scope.parseFileType(data.type) === 'tiff' ||
                    $scope.parseFileType(data.type) === 'bmp')) {
                DataService.files[DataService.files.length] = {
                    fileName: data.name,
                    fileContentStr: null,
                    filePath: '',
                    fileType: {
                        type: $scope.parseFileType(data.type)
                    }
                };
                fileReader.readAsDataUrl(data, $scope).then(function(result) {
                    DataService.files[DataService.files.length - 1].fileContentStr = $scope.parseFileData(result);
                });
            } else {
                  $scope.showFileTypeError();
            }
        } else {

            $scope.showFileSizeError();
        }
        $scope.$digest();
    };

    $scope.errorMsgData = {
        fileSizeError: 'Sorry, your file is too large. Please load files that are 3 MB or smaller.',
        fileTypeError: 'Sorry, the file was not added. Please make sure the file type is .pdf, .prn, .jpg, .jpeg, .tif, .tiff, or .bmp.'
    };

    $scope.errorMessage = {};

    $ionicModal.fromTemplateUrl('templates/uploaderror.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.showFileSizeError = function () {
        $scope.errorMessage = $scope.errorMsgData.fileSizeError;
        $ionicScrollDelegate.scrollTop();
        $scope.modal.show();
    };

    $scope.showFileTypeError = function () {
        $scope.errorMessage = $scope.errorMsgData.fileTypeError;
        $ionicScrollDelegate.scrollTop();
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.exceedFileNumber = function() {
        return DataService.files.length === 4;
    };

    $scope.parseFileType = function(contentType) {
        var index = contentType.indexOf('/');
        var fileType = contentType.substring(index + 1, contentType.length);
        return fileType;
    };

    $scope.parseFileData = function(file) {
        var tokenLength = ';base64,'.length;
        var tokenIndex = file.indexOf(';base64,');
        var fileDataStartIndex = tokenIndex + tokenLength;
        var fileData = file.substring(fileDataStartIndex);
        return fileData;
    };

    $scope.$on('fileProgress', function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });
}]);
