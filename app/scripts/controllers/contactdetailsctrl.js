'use strict';

angular.module('rascal').controller('ContactDetailsCtrl', function($scope, DataService) {
  if (!DataService.contactDetails) {
    DataService.contactDetails = {
      phoneNumber: '',
      caregiverName: '',
      emailAddress: '',
      morning: false,
      afternoon: false,
      evening: false
    };
  }
  
  $scope.data = DataService.contactDetails;
  $scope.phoneValid = true;
  $scope.emailValid = true;
  $scope.isCaregiver = DataService.isCaregiverFlow();
  
  $scope.btnIndexZero = {
    disabled: !DataService.contactDetails.complete,
    visible: true,
    href: 'doctorInfo'
  };
  $scope.btnIndexOne = {
      disabled: false,
      visible: true,
      href: 'patientInfo'
  };
    
  $scope.contactTimes = [
    {
      id: 'morning',
      name: 'Mornings',
      time: '8:30am - 12:00pm, EST'
    },
    {
      id: 'afternoon',
      name: 'Afternoons',
      time: '12:00pm - 5:00pm, EST'
    },
    {
      id: 'evening',
      name: 'Evenings',
      time: '5:00pm - 8:00pm, EST'
    }
  ];

  $scope.emailPattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';

  $scope.onBlurPhoneNumber = function() {
    if( $scope.doesPhoneNumberHaveSomeData() && $scope.isTimeButtonSelected() ) {
      $scope.updateContinueButton();
    }
  };

  $scope.onFocusPhoneNumber = function() {
    $scope.phoneValid = true;
  };

  $scope.onBlurCaregiver = function() {
    DataService.contactDetails = $scope.data;
  };

  $scope.onBlurEmailAddress = function() {
    DataService.contactDetails = $scope.data;
  };

  $scope.onFocusEmailAddress = function() {
    $scope.emailValid = true;    
  };

  $scope.clickTime = function () {
    $scope.updateContinueButton();
  };

  $scope.updateContinueButton = function() {
    $scope.data.complete = $scope.formValid();
    $scope.btnIndexZero.disabled = !$scope.data.complete;    
  };

  $scope.isPhoneNumberValid = function() {
    return !!$scope.data.phoneNumber && $scope.data.phoneNumber.length === 10;
  };

  $scope.doesPhoneNumberHaveSomeData = function() {
    return !!$scope.data.phoneNumber && $scope.data.phoneNumber.length > 0;

  };

  $scope.isTimeButtonSelected = function() {
    return !!$scope.data.morning || !!$scope.data.afternoon || !!$scope.data.evening;

  };

  $scope.isEmailAddressValid = function() {
    return typeof $scope.data.emailAddress !== 'undefined';
  };

  $scope.formValid = function() {
    return $scope.doesPhoneNumberHaveSomeData() && $scope.isTimeButtonSelected();
  };

  $scope.validate = function() {
    var result = true;
    if (!$scope.isPhoneNumberValid()) {
      $scope.phoneValid = false;
      result = false;
    }
    if (!$scope.isEmailAddressValid()) {
      $scope.emailValid = false;
      result = false;
    }
    if (!$scope.isTimeButtonSelected()) {
      result = false;
    }
    return result;
  };
});
