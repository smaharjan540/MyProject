'use strict';

angular.module('rascal').controller('ConfirmationCtrl', function($scope, DataService, PayloadService, IEService, $filter, $http, $ionicPopup) {

    $scope.topMsg = 'Almost done! Confirm the following details and click Finish.';
    $scope.reCaptchaInit = {};
    IEService.resetFlag();

    DataService.confirmation = {
        complete: true
    };

    $scope.btnIndexZero = {
        title: 'Finish',
        disabled: false,
        visible: true,
        href: 'thanks'
    };
    $scope.btnIndexOne = {
        disabled: false,
        visible: true,
        href: DataService.isNurseFlow() ? 'productRequest' : 'insurance'
    };

    $scope.buildPatientNeeds = function() {
        if (!DataService.patientNeeds) {
            return '';
        }

        function getPatientNeeds(){
            return Object.keys(DataService.patientNeeds.categories)
                .map(function(name) {
                    return DataService.patientNeeds.categories[name];
                })
                .filter(function(obj) {
                    return obj.checkboxValue;
                })
                .map(function(need) {
                    return need.title || need;
                })
                .join(', ');
        }
        return !!DataService.patientNeeds.specialRequest ? getPatientNeeds() + ', ' + DataService.patientNeeds.specialRequest : getPatientNeeds();
    };

    $scope.buildPatientInfo = function() {

        function getPatientInfo(){
            var patientInfo = [];
            if(DataService.patientInfo.name && DataService.patientInfo.name.length!==0){
                patientInfo.push(DataService.patientInfo.name);
            }
            if(DataService.patientInfo.address1 && DataService.patientInfo.address1.length!==0){
                patientInfo.push(DataService.patientInfo.address1 + (DataService.patientInfo.address2 ? ' ' + DataService.patientInfo.address2: ''));
            }
            if(DataService.patientInfo.city && DataService.patientInfo.state && DataService.patientInfo.zip){
                patientInfo.push(DataService.patientInfo.city + ', ' + DataService.patientInfo.state + ' ' + DataService.patientInfo.zip);
            }
            if(DataService.patientInfo.gender && DataService.patientInfo.dob){
              patientInfo.push(DataService.patientInfo.gender + ', ' + DataService.patientInfo.dob);
            }
            return patientInfo;
        }

        if (!DataService.patientInfo) {
            return [];
        }

        if(DataService.isNurseFlow() && DataService.nursePatientInfo.patientInfoUpload){
            return ['File uploaded'];
        }

        return getPatientInfo();
    };

    $scope.buildContactDetails = function() {
        function caregiver(name) {
            return name ? name + ': ' : '';
        }

        function contactTimes() {
            var times = [];
            if (DataService.contactDetails.morning) {
                times.push('Mornings');
            }
            if (DataService.contactDetails.afternoon) {
                times.push('Afternoons');
            }
            if (DataService.contactDetails.evening) {
                times.push('Evenings');
            }
            return times.join(', ');
        }

        if (!DataService.contactDetails) {
            return [];
        }
        var dets = [
            caregiver(DataService.contactDetails.caregiverName) + $filter('tel')(DataService.contactDetails.phoneNumber),
            'Best time to contact - ' + contactTimes()
        ];
        if (DataService.contactDetails.emailAddress) {
            dets.push(DataService.contactDetails.emailAddress);
        }
        return dets;
    };

    $scope.buildDoctorInfo = function() {
        if (!DataService.doctorInfo) {
            return [];
        }
        var info = [
            DataService.doctorInfo.name,
            $filter('tel')(DataService.doctorInfo.phoneNumber),
            DataService.doctorInfo.city + ', ' + DataService.doctorInfo.state + ' ' + DataService.doctorInfo.zip
        ];
        if (!!DataService.doctorInfo.diagnosis) {
            info.push('Diagnosis - ' + DataService.doctorInfo.diagnosis);
        }
        return info;
    };

    $scope.buildInsurance = function() {

        function getInsuranceDetails(){
            var insurance = [];
            if(DataService.insurance.name && DataService.insurance.name.length!==0){
                insurance.push(DataService.insurance.name);
            }
            if(DataService.insurance.policyNumber && DataService.insurance.policyNumber.length!==0){
                insurance.push('Policy # - ' + DataService.insurance.policyNumber);
            }
            if(DataService.insurance.phoneNumber && DataService.insurance.phoneNumber!==0){
                insurance.push('Phone # - ' + $filter('tel')(DataService.insurance.phoneNumber));
            }
            return insurance;
        }

        if (!DataService.insurance) {
            return [];
        }
        if (DataService.insurance.takeDetails) {
            return getInsuranceDetails();
        }
        else if (DataService.insurance.takePhoto) {
            return ['Pictures'];
        }
        else {
            return [];
        }
    };

    $scope.confirmAndSend = function() {
      function errorHandler(e) {
          console.log('error: ' + e);
          // TODO Make this popup look better
          $ionicPopup.alert({
              title: 'Server Error',
              template: 'Failed to save questionare'
          });
      }

      if( 0 === IEService.processEventForIEVersion(11) ) {
        return;
      }

      var url;
      var data = angular.toJson(PayloadService.convertPayload());
      if (!DataService.isNurseFlow()) {
          if (DataService.isNativeApp()) {
              url = PayloadService.nativeAppBaseUrl() + '/patientflow/save';
          } else {
              url = '/patientflow/save';
          }

          $http.post(url,
              data, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
              .success(function(data, status) {
                  console.log('success: ' + status);
                  $scope.data = data;
              })
              .error(errorHandler);
      } else {
          if (DataService.isNativeApp()) {
              url = PayloadService.nativeAppBaseUrl() + '/nurseflow/save';
          } else {
              url = '/nurseflow/save';
          }

          $http.post(url,
              data, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
              .success(function(data, status) {
                  console.log('success: ' + status);
                  $scope.data = data;
              })
              .error(errorHandler);
      }
    };

    /*
     Nurse Flow confirmation Details...
     */
    $scope.buildNurseDetails = function() {
        function getZip(){
            if(DataService.nurseDetails.zip && DataService.nurseDetails.zip.length !== 0){
                return DataService.nurseDetails.zip;
            }
            return '';
        }
        if (!DataService.nurseDetails) {
            return [];
        }
        return [
            DataService.nurseDetails.name,
            $filter('tel')(DataService.nurseDetails.phoneNumber),
            DataService.nurseDetails.facility,
            DataService.nurseDetails.city + ', ' + DataService.nurseDetails.state + ' ' + getZip()
        ];

    };

    $scope.buildNursePatientDoctorDetails = function() {

        if (!DataService.nursePatientDoctor) {
            return [];
        }
        else if(DataService.nursePatientDoctor.doctorFilesUpload){
            return ['File uploaded'];
        }

        function isEmptyString(value) {
            return (!value || 0 === value.length);
        }

        function formatString(value) {
            return isEmptyString(value) ? '' : value.length > 15 ? value.slice(0, 5) + '..' : value;
        }

        function getFullAddress(){
            if(DataService.nursePatientDoctor.city && DataService.nursePatientDoctor.state && DataService.nursePatientDoctor.zip){
                return DataService.nursePatientDoctor.city + ', ' + DataService.nursePatientDoctor.state + ' ' + DataService.nursePatientDoctor.zip;
            }
            return '';
        }

        function getDiagnosis() {

            var diagnosis = [];

            if (!isEmptyString(DataService.nursePatientDoctor.dcode1) || !isEmptyString(DataService.nursePatientDoctor.ddesc1)) {
                diagnosis.push({
                    dcode: formatString(DataService.nursePatientDoctor.dcode1),
                    ddesc: formatString(DataService.nursePatientDoctor.ddesc1)
                });
            }
            if (!isEmptyString(DataService.nursePatientDoctor.dcode2) || !isEmptyString(DataService.nursePatientDoctor.ddesc2)) {
                diagnosis.push({
                    dcode: formatString(DataService.nursePatientDoctor.dcode2),
                    ddesc: formatString(DataService.nursePatientDoctor.ddesc2)
                });
            }
            if (!isEmptyString(DataService.nursePatientDoctor.dcode3) || !isEmptyString(DataService.nursePatientDoctor.ddesc3)) {
                diagnosis.push({
                    dcode: formatString(DataService.nursePatientDoctor.dcode3),
                    ddesc: formatString(DataService.nursePatientDoctor.ddesc3)
                });
            }

            var diagDetails = '';
            for (var i = 0; i < diagnosis.length; i++) {
                if (!isEmptyString(diagnosis[i].dcode) && !isEmptyString(diagnosis[i].ddesc)) {
                    diagDetails += diagnosis[i].dcode + '-' + diagnosis[i].ddesc;
                } else {
                    diagDetails += diagnosis[i].dcode + '' + diagnosis[i].ddesc;
                }
                if (i !== diagnosis.length - 1) {
                    diagDetails += ', ';
                }

            }
            return diagDetails;

        }

        return [
            DataService.nursePatientDoctor.name,
            $filter('tel')(DataService.nursePatientDoctor.phoneNumber),
            getFullAddress(),
            getDiagnosis()
        ];
    };

    $scope.buildNursePatientInsuranceDetails = function() {

        if (!DataService.nursePatientInsurance) {
            return [];
        }
        else if (DataService.nursePatientInsurance.patientInsuranceUpload){
            return ['File uploaded'];
        }

        function getNursePatientInsuranceDetails(){
            var insurance = [];
            if(DataService.nursePatientInsurance.name && DataService.nursePatientInsurance.name.length!==0){
                insurance.push(DataService.nursePatientInsurance.name);
            }
            if(DataService.nursePatientInsurance.policyNumber && DataService.nursePatientInsurance.policyNumber.length!==0){
                insurance.push('Policy # - ' + DataService.nursePatientInsurance.policyNumber);
            }
            if(DataService.nursePatientInsurance.phoneNumber && DataService.nursePatientInsurance.phoneNumber!==0){
                insurance.push('Phone No. - ' + $filter('tel')(DataService.nursePatientInsurance.phoneNumber));
            }
            return insurance;
        }

        return getNursePatientInsuranceDetails();
    };

    $scope.buildProductRequests = function() {
        function isEmptyString(string) {
            return (!string || 0 === string.length);
        }

        function formatDescription(description) {
            if (isEmptyString(description)) {
                return '..';
            }
            if (description.length > 10) {
                return description.slice(0, 10) + '..';
            }
            return description;
        }

        function formatRequestItem(requestItem) {
            return [isEmptyString(requestItem.itemNumber) ? '..' : requestItem.itemNumber, formatDescription(requestItem.description), requestItem.quantity].join(', ');
        }

        if (!DataService.productRequest) {
            return [];
        }
        else if (DataService.productRequest.productUpload) {
            return ['File uploaded'];
        }
        return DataService.productRequest.requestedItems
            .filter(function(item) {
                return !!item.quantity;
            })
            .map(function(item) {
                return formatRequestItem(item);
            });
    };

    $scope.buildDocuments = function() {

        if (!DataService.files) {
            return [];
        }
        return DataService.files;
    };

    $scope.patientInfo = $scope.buildPatientInfo();

    if (DataService.isNurseFlow()) {
        $scope.nurseDetails = $scope.buildNurseDetails();
        $scope.nursePatientInsuranceDetails = $scope.buildNursePatientInsuranceDetails();
        $scope.nursePatientDoctorDetails = $scope.buildNursePatientDoctorDetails();
        $scope.productRequests = $scope.buildProductRequests();
        $scope.documents = $scope.buildDocuments();
    } else {
        $scope.patientNeeds = $scope.buildPatientNeeds();
        $scope.contactDetails = $scope.buildContactDetails();
        $scope.doctorInfo = $scope.buildDoctorInfo();
        $scope.insurance = $scope.buildInsurance();
        if( !!DataService.insurance ) {
            $scope.takePhoto = DataService.insurance.takePhoto;
        }
    }
});
