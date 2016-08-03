'use strict';

angular.module('rascal').controller('InsuranceCtrl', function($scope, $cordovaCamera, DataService) {

  if (!DataService.insurance) {
    DataService.insurance = {};
  }

  $scope.nativeApp = DataService.isNativeApp();
  $scope.data = DataService.insurance;

  if (!$scope.nativeApp) {
    $scope.data.takePhoto = false;
    $scope.data.takeDetails = true;
    $scope.data.complete = true;
  }

  $scope.phoneValid = true;

  $scope.btnIndexZero = {
    disabled: !DataService.insurance.complete,
    visible: true,
    href: 'confirmation'
  };
  $scope.btnIndexOne = {
    disabled: false,
    visible: true,
    href: 'doctorInfo'
  };

  $scope.clickPicture = function (imageSide) {
    $scope.previewPicture(imageSide);
    if (!$scope.data[imageSide.toLowerCase() + 'ImageBase64String']) {
      $scope.takePicture(imageSide);
    }
  };

  $scope.takePicture = function(imageSide) {
    $scope.imageSide = imageSide;

    var options = {
      quality : 75,
      destinationType : window.Camera.DestinationType.DATA_URL,
      sourceType : window.Camera.PictureSourceType.CAMERA,
      encodingType: window.Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {

      if (imageSide === 'FRONT') {
        $scope.data.frontImageBase64String = 'data:image/jpeg;base64,' + imageData;
      }
      if (imageSide === 'BACK') {
        $scope.data.backImageBase64String = 'data:image/jpeg;base64,' + imageData;
      }
      $scope.storeFileData(imageSide, 'data:image/jpeg;base64,' + imageData);

      $scope.onInsuranceEditChng();
    }, function(error) {
      console.log('Error occured' + error);
    });

  };

  $scope.previewPicture = function(imageSide){
    $scope.imageSide = imageSide;
  };

  $scope.allRequiredFieldsAreFilled = function () {
    return (!!$scope.data.name && !!$scope.data.policyNumber &&
    !!$scope.data.groupNumber && !!$scope.data.phoneNumber);
  };

  $scope.updateData = function () {
    $scope.data.complete = $scope.allRequiredFieldsAreFilled();
    $scope.btnIndexZero.disabled = !$scope.data.complete;
  };

  $scope.onPhoneNumberFocus = function() {
    $scope.phoneValid = true;
  };

  $scope.isPhoneNumberValid = function() {
    if( !$scope.data.phoneNumber || $scope.data.phoneNumber.length ===0 ){
      return true;
    }
    if( $scope.data.phoneNumber && 10 === $scope.data.phoneNumber.length ) {
      return true;
    }
    return false;
  };

  $scope.onInsuranceEditChng = function() {
    if ($scope.data.takePhoto) {
      $scope.btnIndexZero.disabled = !$scope.isValidPictures();
      $scope.data.complete = !$scope.btnIndexZero.disabled;
    }
    else {
      $scope.btnIndexZero.disabled = false;
      $scope.data.complete = true;
    }
  };

  $scope.parseFileType = function(data) {
    var startIndex = data.indexOf('/');
    var endIndex = data.indexOf(';');
    var fileType = data.substring(startIndex + 1, endIndex);

    return fileType;
  };

  $scope.parseFileData = function(file) {
    var tokenLength = ';base64,'.length;
    var tokenIndex = file.indexOf(';base64,');
    var fileDataStartIndex = tokenIndex + tokenLength;
    var fileData = file.substring(fileDataStartIndex);

    return fileData;
  };

  $scope.storeFileData = function (fileName, data) {
    if($scope.imageSide === 'FRONT') {
      DataService.patientFiles.FRONT = {
        fileName: fileName,
        fileContentStr: $scope.parseFileData(data),
        filePath: '',
        fileType: {
          type: $scope.parseFileType(data)
        }
      };
    }
    else {
      DataService.patientFiles.BACK = {
        fileName: fileName,
        fileContentStr: $scope.parseFileData(data),
        filePath: '',
        fileType: {
          type: $scope.parseFileType(data)
        }
      };
    }
  };

  $scope.validate = function() {
    var result = true;
    if( !$scope.isPhoneNumberValid() && !$scope.data.takePhoto ) {
      $scope.phoneValid = false;
      result = false;
    }
    return result;
  };

  $scope.isValidPictures = function(){
    return !!$scope.data.frontImageBase64String && !!$scope.data.backImageBase64String;
  };

  $scope.toggleTakePhoto = function(){
    $scope.data.takeDetails = false;
    $scope.data.takePhoto = true;
  };

  $scope.toggleTakeDetails = function(){
    $scope.data.takePhoto = false;
    $scope.data.takeDetails = true;
  };

  $scope.$watchCollection('data', function () {
    $scope.onInsuranceEditChng();
  });

});
