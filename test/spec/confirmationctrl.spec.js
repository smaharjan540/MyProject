describe('Confirmation Controller', function () {
  var $scope, dService;

  describe('Patient Flow', function () {
    beforeEach(module('rascal'));
    beforeEach(inject(function ($rootScope, $controller) {
      $scope = $rootScope.$new();
      dService = { isNurseFlow: function () { return false; } };

      $controller('ConfirmationCtrl', {
        $scope: $scope,
        DataService: dService
      });
    }));

    it('buildPatientNeeds() creates a summary from the contents of DataService', function () {
      $scope.buildPatientNeeds().should.equal('');
      dService.patientNeeds = {
        categories: {
          incontinence: {title:'Incontinence',checkboxValue:false},
          ostomy: {title:'Ostomy',checkboxValue:false},
          wound: {title:'Wound',checkboxValue:false},
          diabetes: {title:'Diabetes',checkboxValue:false},
          insulin: {title:'Insulin',checkboxValue:false},
          urological: {title:'Urological',checkboxValue:false},
          health: {title:'Health',checkboxValue:false}
        },
        complete:true
      };
      $scope.buildPatientNeeds().should.equal('');
      dService.patientNeeds.categories.ostomy.checkboxValue = true;
      $scope.buildPatientNeeds().should.equal('Ostomy');
      dService.patientNeeds.categories.insulin.checkboxValue = true;
      $scope.buildPatientNeeds().should.equal('Ostomy, Insulin');
      dService.patientNeeds.categories.health.checkboxValue = true;
      $scope.buildPatientNeeds().should.equal('Ostomy, Insulin, Health');
      dService.patientNeeds.categories.wound.checkboxValue = true;
      dService.patientNeeds.specialRequest = 'blah';
      $scope.buildPatientNeeds().should.equal('Ostomy, Wound, Insulin, Health, blah');
    });

    it('buildPatientInfo() creates a summary from the contents of DataService', function () {
      $scope.buildPatientInfo().should.deep.equal([]);
      dService.patientInfo = {
        name: 'Bob Boberson',
        address1: '123 Easy Street',
        address2: 'Building T',
        city: 'Nowhere',
        state: 'KS',
        zip: '99999',
        dob: new Date('1212-12-24T05:00:00.000Z'),
        gender: 'Male',
        complete: true
      };
      $scope.buildPatientInfo().should.deep.equal([
        'Bob Boberson',
        '123 Easy Street Building T',
        'Nowhere, KS 99999',
        'Male, 12/24/1212'
      ]);
    });

    it('buildContactDetails() creates a summary from the contents of DataService', function () {
      $scope.buildContactDetails().should.deep.equal([]);
      dService.contactDetails = {
        phoneNumber:'1212121212',
        caregiverName:'',
        emailAddress:'',
        morning:false, afternoon:true, evening:true,
        isPhoneNumberInvalid:false,
        complete:true
      };
      $scope.buildContactDetails().should.deep.equal([
        '(121) 212-1212',
        'Best time to contact - Afternoons, Evenings'
      ]);
      dService.contactDetails.caregiverName = 'Nice Nurse';
      dService.contactDetails.emailAddress = 'name@email.com';
      dService.contactDetails.morning = true;
      dService.contactDetails.afternoon = false;
      dService.contactDetails.evening = false;
      $scope.buildContactDetails().should.deep.equal([
        'Nice Nurse: (121) 212-1212',
        'Best time to contact - Mornings',
        'name@email.com'
      ]);
    });

    it('buildDoctorInfo() creates a summary from the contents of DataService', function () {
      $scope.buildDoctorInfo().should.deep.equal([]);
      dService.doctorInfo = {
        name: 'Dr. Acula',
        phoneNumber: '1234567890',
        city: 'Transylvania',
        state: 'TX',
        zip: 66666,
        diagnosis: 'Vampirism'
      };
      $scope.buildDoctorInfo().should.deep.equal([
        'Dr. Acula',
        '(123) 456-7890',
        'Transylvania, TX 66666',
        'Diagnosis - Vampirism'
      ]);
    });

    it('buildInsurance() creates a summary from the contents of DataService', function () {
      $scope.buildInsurance().should.deep.equal([]);
      dService.insurance = {
        name: 'Cardinal Health',
        policyNumber: '99999999',
        phoneNumber: '5555555555',
        takeDetails: true
      };
      $scope.buildInsurance().should.deep.equal([
        'Cardinal Health',
        'Policy # - 99999999',
        'Phone # - (555) 555-5555'
      ]);
      dService.insurance = {
        takeDetails: false,
        takePhoto: true
      };
      $scope.buildInsurance().should.deep.equal(['Pictures']);
    });
  });

  describe('Nurse Flow', function () {
    beforeEach(module('rascal'));
    beforeEach(inject(function ($rootScope, $controller) {
      $scope = $rootScope.$new();
      dService = { isNurseFlow: function () { return true; } };

      $controller('ConfirmationCtrl', {
        $scope: $scope,
        DataService: dService
      });
    }));

    it('buildNurseDetails() creates a summary from the contents of Nurseflow DataService', function () {
      $scope.buildNurseDetails().should.deep.equal([]);
      dService.nurseDetails = {
        name : 'Rina Gurung',
        phoneNumber : '4444444444',
        facility : 'Nationwide',
        city : 'Fairfield',
        state : 'IA',
        zip: '23454'
      };

      $scope.buildNurseDetails().should.deep.equal([
        'Rina Gurung',
        '(444) 444-4444',
        'Nationwide',
        'Fairfield, IA 23454'
      ]);

    });

    it('buildNursePatientDoctorDetails() creates a summary from the contents of Nurseflow DataService', function () {
      $scope.buildNursePatientDoctorDetails().should.deep.equal([]);

      dService.nursePatientDoctor = {
        name : 'Rina Gurung',
        phoneNumber : '4444444444',
        facility : 'Nationwide',
        city : 'Fairfield',
        state : 'IA',
        zip : '52557',
        dcode1 : 'D1',
        ddesc1 : 'DESC1',
        dcode2 : 'D2',
        ddesc2 : 'DESC2',
        dcode3 : 'D3',
        ddesc3 : 'DESC3'
      };
      $scope.buildNursePatientDoctorDetails().should.deep.equal([
        'Rina Gurung',
        '(444) 444-4444',
        'Fairfield, IA 52557',
        'D1-DESC1, D2-DESC2, D3-DESC3'
      ]);
      dService.nursePatientDoctor = {
        name : 'Rina Gurung',
        phoneNumber : '4444444444',
        facility : 'Nationwide',
        city : 'Fairfield',
        state : 'IA',
        zip : '52557',
        dcode1 : 'D1',
        ddesc1 : 'DESC1',
        dcode2 : 'D2',
        ddesc2 : 'DESC2',
        dcode3 : 'D3'
      };

      $scope.buildNursePatientDoctorDetails().should.deep.equal([
        'Rina Gurung',
        '(444) 444-4444',
        'Fairfield, IA 52557',
        'D1-DESC1, D2-DESC2, D3'
      ]);

    });

    it('buildNursePatientInsuranceDetails() creates a summary from the contents of Nurseflow DataService', function () {
      $scope.buildNursePatientInsuranceDetails().should.deep.equal([]);
      dService.nursePatientInsurance = {
        name: 'Cardinal Health',
        policyNumber: '99999999',
        phoneNumber: '5555555555'
      };

      $scope.buildNursePatientInsuranceDetails().should.deep.equal([
        'Cardinal Health',
        'Policy # - 99999999',
        'Phone No. - (555) 555-5555'
      ]);
    });

    it('buildProductRequests() creates a summary from the contents of Nurseflow DataService', function () {
      $scope.buildProductRequests().should.deep.equal([]);
      dService.productRequest = {};
      dService.productRequest.requestedItems = [
        {itemNumber:'one', description:'onedescription', quantity: '1'},
        {itemNumber:'two', description:'twodescription', quantity: '2'}
      ];
      $scope.buildProductRequests().should.deep.equal([
        'one, onedescrip.., 1',
        'two, twodescrip.., 2'
      ]);
      dService.productRequest.requestedItems = [
        {itemNumber:'one', description:'', quantity: '1'},
        {itemNumber:'two', description:'twodescription', quantity: '2'}
      ];
      $scope.buildProductRequests().should.deep.equal([
        'one, .., 1',
        'two, twodescrip.., 2'
      ]);

    });
  });
});
