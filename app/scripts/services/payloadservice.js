'use strict';

angular.module('rascal').factory('PayloadService', function(DataService) {
        function getVersionNumber() {
          if( typeof DataService.version !== 'undefined' ) {
            return DataService.appVersion ;
          }
          else {
            return 'online';
          }
        }

    function formatDate(dob) {
      var tmp = dob.replace('/', '');
      tmp = tmp.replace('/', ''); 
      return tmp;
    }
    function getContactTimes() {
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
    function getDiagnoses() {
        var diagnosis = [];

        function isEmptyString(value) {
            return (!value || 0 === value.length);
        }
        function formatString(value) {
            return isEmptyString(value) ? '' : value.length > 15 ? value.slice(0, 5) + '..' : value;
        }

        [1, 2, 3].forEach(function (i) {
            var dcode = 'dcode' + i;
            var ddesc = 'ddesc' + i;
            if (!isEmptyString(DataService.nursePatientDoctor[dcode]) || !isEmptyString(DataService.nursePatientDoctor[ddesc])) {
                diagnosis.push({
                    code: formatString(DataService.nursePatientDoctor[dcode]),
                    description: formatString(DataService.nursePatientDoctor[ddesc])
                });
            }
        });
        return diagnosis;
    }
    function getPatientFiles() {
      var patientFiles = [];
      if( DataService.patientFiles.FRONT && (typeof DataService.patientFiles.FRONT.fileContentStr !== 'undefined') ) {
        patientFiles[patientFiles.length] = DataService.patientFiles.FRONT;
      }
      if( DataService.patientFiles.BACK && (typeof DataService.patientFiles.BACK.fileContentStr !== 'undefined') ) {
        patientFiles[patientFiles.length] = DataService.patientFiles.BACK;
      }

      return patientFiles;
    }

    return {
        convertPayload: function() {
            var payloadData = {};

            if (DataService.isPatientFlow()) {
                payloadData = {
                    //
                    // Patient Needs.
                    //
                    patientNeedsIncontinenceFlag: (DataService.patientNeeds && DataService.patientNeeds.categories && DataService.patientNeeds.categories.incontinence) ? DataService.patientNeeds.categories.incontinence.checkboxValue : false,
                    patientNeedsOstomyFlag: (DataService.patientNeeds && DataService.patientNeeds.categories && DataService.patientNeeds.categories.ostomy) ? DataService.patientNeeds.categories.ostomy.checkboxValue : false,
                    patientNeedsWoundFlag: (DataService.patientNeeds && DataService.patientNeeds.categories && DataService.patientNeeds.categories.wound) ? DataService.patientNeeds.categories.wound.checkboxValue : false,
                    patientNeedsDiabetesFlag: (DataService.patientNeeds && DataService.patientNeeds.categories && DataService.patientNeeds.categories.diabetes) ? DataService.patientNeeds.categories.diabetes.checkboxValue : false,
                    patientNeedsInsulinFlag: (DataService.patientNeeds && DataService.patientNeeds.categories && DataService.patientNeeds.categories.insulin) ? DataService.patientNeeds.categories.insulin.checkboxValue : false,
                    patientNeedsUrologicalFlag: (DataService.patientNeeds && DataService.patientNeeds.categories && DataService.patientNeeds.categories.urological) ? DataService.patientNeeds.categories.urological.checkboxValue : false,
                    patientNeedsHealthFlag: (DataService.patientNeeds && DataService.patientNeeds.categories && DataService.patientNeeds.categories.health) ? DataService.patientNeeds.categories.health.checkboxValue : false,
                    patientNeedsSpecialRequest: DataService.patientNeeds.specialRequest || '',
                    //
                    // Patient Info.
                    //
                    name: (DataService.patientInfo && DataService.patientInfo.name) ? DataService.patientInfo.name : null,
                    addressLineOne: (DataService.patientInfo && DataService.patientInfo.address1) ? DataService.patientInfo.address1 : null,
                    addressLineTwo: (DataService.patientInfo && DataService.patientInfo.address2) ? DataService.patientInfo.address2 : null,
                    city: (DataService.patientInfo && DataService.patientInfo.city) ? DataService.patientInfo.city : null,
                    state: (DataService.patientInfo && DataService.patientInfo.state) ? DataService.patientInfo.state : null,
                    zip: (DataService.patientInfo && DataService.patientInfo.zip) ? DataService.patientInfo.zip : null,
                    gender: (DataService.patientInfo && DataService.patientInfo.gender) ? DataService.patientInfo.gender : null,
                    dateOfBirth: (DataService.patientInfo && DataService.patientInfo.dob) ? formatDate(DataService.patientInfo.dob) : null,
                    //
                    // Contact Info.
                    //
                    phoneNumber: (DataService.contactDetails && DataService.contactDetails.phoneNumber) ? DataService.contactDetails.phoneNumber : null,
                    caregiverName: (DataService.contactDetails && DataService.contactDetails.caregiverName) ? DataService.contactDetails.caregiverName : null,
                    contactTime: (DataService.contactDetails && getContactTimes()) ? getContactTimes() : null,
                    email: (DataService.contactDetails && DataService.contactDetails.emailAddress) ? DataService.contactDetails.emailAddress : null,
                    //
                    // Doctor Info.
                    //
                    doctorName: (DataService.doctorInfo && DataService.doctorInfo.name) ? DataService.doctorInfo.name : null,
                    doctorDiagnosis: (DataService.doctorInfo && DataService.doctorInfo.diagnosis) ? DataService.doctorInfo.diagnosis : null,
                    doctorPhoneNumber: (DataService.doctorInfo && DataService.doctorInfo.phoneNumber) ? DataService.doctorInfo.phoneNumber : null,
                    doctorCity: (DataService.doctorInfo && DataService.doctorInfo.city) ? DataService.doctorInfo.city : null,
                    doctorState: (DataService.doctorInfo && DataService.doctorInfo.state) ? DataService.doctorInfo.state : null,
                    doctorZip: (DataService.doctorInfo && DataService.doctorInfo.zip) ? DataService.doctorInfo.zip : null,
                    //
                    // Insurance Info.
                    //
                    insuranceCompanyName: (DataService.insurance && DataService.insurance.name) ? DataService.insurance.name : null,
                    insurancePolicyNumber: (DataService.insurance && DataService.insurance.policyNumber) ? DataService.insurance.policyNumber : null,
                    insurancePhoneNumber: (DataService.insurance && DataService.insurance.phoneNumber) ? DataService.insurance.phoneNumber : null,
                    patientFlowFiles: getPatientFiles()
                };
            }
            else if (DataService.isNurseFlow()) {
                payloadData = {

                    //  Nurse Details
                    nurseFullName: (DataService.nurseDetails && DataService.nurseDetails.name) ? DataService.nurseDetails.name : null,
                    nursePhoneNumber: (DataService.nurseDetails && DataService.nurseDetails.phoneNumber) ? DataService.nurseDetails.phoneNumber : null,
                    facilityName: (DataService.nurseDetails && DataService.nurseDetails.facility) ? DataService.nurseDetails.facility : null,
                    facilityCity: (DataService.nurseDetails && DataService.nurseDetails.city) ? DataService.nurseDetails.city : null,
                    facilityState: (DataService.nurseDetails && DataService.nurseDetails.state) ? DataService.nurseDetails.state : null,
                    facilityZip: DataService.nurseDetails.zip,

                    //  Patient Info

                    patientName: (DataService.patientInfo && DataService.patientInfo.name) ? DataService.patientInfo.name : null,
                    patientAddress1: (DataService.patientInfo && DataService.patientInfo.address1) ? DataService.patientInfo.address1 : null,
                    patientAddress2: (DataService.patientInfo && DataService.patientInfo.address2) ? DataService.patientInfo.address2 : null,
                    patientCity: (DataService.patientInfo && DataService.patientInfo.city) ? DataService.patientInfo.city : null,
                    patientState: (DataService.patientInfo && DataService.patientInfo.state) ? DataService.patientInfo.state : null,
                    patientZip: (DataService.patientInfo && DataService.patientInfo.zip) ? DataService.patientInfo.zip : null,
                    patientGender: (DataService.patientInfo && DataService.patientInfo.gender) ? DataService.patientInfo.gender : null,
                    patientDateOfBirth: (DataService.patientInfo && DataService.patientInfo.dob) ? formatDate(DataService.patientInfo.dob) : null,

                    //  Patient Insurance

                    insuranceProviderName: (DataService.nursePatientInsurance && DataService.nursePatientInsurance.name) ? DataService.nursePatientInsurance.name : null,
                    insurancePolicyNumber: (DataService.nursePatientInsurance && DataService.nursePatientInsurance.policyNumber) ? DataService.nursePatientInsurance.policyNumber : null,
                    insurancePhoneNumber: (DataService.nursePatientInsurance && DataService.nursePatientInsurance.phoneNumber) ? DataService.nursePatientInsurance.phoneNumber : null,


                    //  Patient Doctor Info

                    doctorName: (DataService.nursePatientDoctor && DataService.nursePatientDoctor.name) ? DataService.nursePatientDoctor.name : null,
                    doctorCity: (DataService.nursePatientDoctor && DataService.nursePatientDoctor.city) ? DataService.nursePatientDoctor.city : null,
                    doctorState: (DataService.nursePatientDoctor && DataService.nursePatientDoctor.state) ? DataService.nursePatientDoctor.state : null,
                    doctorZip: (DataService.nursePatientDoctor && DataService.nursePatientDoctor.zip) ? DataService.nursePatientDoctor.zip : null,
                    doctorPhoneNumber: (DataService.nursePatientDoctor && DataService.nursePatientDoctor.phoneNumber) ? DataService.nursePatientDoctor.phoneNumber : null,
                    diagnosisList: (DataService.nursePatientDoctor) ? getDiagnoses() : null,

                    //  Product Request
                    productRequests: (DataService.productRequest && DataService.productRequest.requestedItems) ? DataService.productRequest.requestedItems : null,

                    // Files upload
                    nurseFlowFiles: DataService.files
                };
            }
            //
            // System Info
            //
            payloadData.storeId = DataService.storeId || 'online';
            payloadData.userType = DataService.startRequest.userType;
            payloadData.versionNumber = getVersionNumber();
            return payloadData;
        },

        nativeAppBaseUrl: function() {
          return 'http://rascal-dev.cfapps.io/'; // 'http://rascal-dev.cfapps.io/' - 'https://rascal-dev.apps.nonprod.cloudplatform.cardinalhealth.net'
        }
    };
});
