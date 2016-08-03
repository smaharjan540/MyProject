'use strict';

angular.module('rascal').factory('FlowService', function($ionicHistory) {
  var nurseFlow = [
    { label: 'Start',
      href: 'startRequest' },
    { label: 'Introduction',
      href: 'intro' },
    { label: 'Your Details',
      href: 'nurseDetails' },
    { label: 'Patient Information',
      href: 'nursePatientInfo' },
    { label: 'Insurance',
      href: 'nursePatientInsurance' },
    { label: 'Patient\'s Doctor',
      href: 'nursePatientDoctor' },
    { label: 'Product Request',
      href: 'productRequest' },
    { label: 'Confirmation',
      href: 'nurseConfirmation' }
  ];
  var patientFlow = [
    { label: 'Start',
      href: 'startRequest' },
    { label: 'Introduction',
      href: 'intro' },
    { label: 'Product Needs',
      href: 'patientNeeds' },
    { label: 'Patient Information',
      href: 'patientInfo' },
    { label: 'Contact Details',
      href: 'contactDetails' },
    { label: 'Doctor Information',
      href: 'doctorInfo' },
    { label: 'Insurance',
      href: 'insurance' },
    { label: 'Confirmation',
      href: 'confirmation' }
  ];
  return {
    flow: function (userType) {
      if (userType === 'nurse') {
        return nurseFlow;
      }
      else {
        return patientFlow;
      }
    },
    currentState: function () {
      return $ionicHistory.currentStateName();
    }
  };
});
