'use strict';

/*istanbul ignore next*/
angular.module('rascal').controller('CameraCtrl', function($scope, $cordovaCamera) { // Use the ngCordova service, now that it has been added to module.
  
  $scope.title = 'Ionic Camera';
  
  $scope.item = {
    data: '',
    imagePath: 'Photo capture as Base64',
    destinationFileURI: false
  };

  $scope.youClickedMe = function() {
    // alert('Ouch !!');
  };

  $scope.clickToggle = function() { // Everytime switch is changed, the controller will update the imagePath variable.
    if ($scope.item.destinationFileURI) {
      $scope.item.imagePath = 'Photo capture as File URI';
    }
    else {
      $scope.item.imagePath = 'Photo capture as Base64';
    }
  };

  $scope.getPicture = function(sourceType) {
    
    var options = {
      quality : 50,
      allowEdit : true,
      correctOrientation: false,
      targetWidth: 640,
      targetHeight: 1080,
      // destinationType: $scope.item.destinationFileURI ? Camera.DestinationType.FILE_URI : Camera.DestinationType.DATA_URL,
      sourceType : sourceType,
      // encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };
    
    $cordovaCamera.getPicture(options).then(function(imageData) // Call Cordova SDK getPicture() method.
    {
      if ($scope.item.destinationFileURI) {
        $scope.item.data = imageData;
        $scope.item.imagePath = imageData;
      } 
      else {
        $scope.item.imagePath = 'Photo capture as Base64';
        $scope.item.data = 'data:image/jpeg;base64,' + imageData; // This should auto update the img tag with picture.
      }
      console.log(imageData);
    }, 
    function(/* err */) {
      // alert('Unable to take picture. Error: ' + err);
    });
  };
});
