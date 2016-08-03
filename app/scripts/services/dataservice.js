'use strict';

angular.module('rascal').factory('DataService', function() {
  function init() {
    service.clearData = function (callback) {
      for (var prop in service) {
        if (prop !== 'storeId') {
          delete service[prop];
        }
      }
      init();
      if (typeof callback === 'function') {
        callback.call();
      }
    };
    service.isCaregiverFlow = function () {
        return !!service.startRequest && service.startRequest.userType === 'caregiver';
    };
    service.isPatientFlow = function () {
      return !!service.startRequest && (service.startRequest.userType === 'patient' || service.startRequest.userType === 'caregiver');
    };
    service.isNurseFlow = function () {
      return !!service.startRequest && service.startRequest.userType === 'nurse';
    };
    service.isNativeApp = function() {
      return window.ionic.Platform.platform() === 'android';
    };
    service.patientFiles = { FRONT: {}, BACK: {} };
    service.files = [];
  }

  var service = {};
  init();
  return service;
});
