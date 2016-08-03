'use strict';

describe('Patient Info Controller', function () {
  var $controller, $scope, dService;

  beforeEach(module('rascal'));

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    dService = { isNurseFlow: function () { return false; } };
    $controller('PatientInfoCtrl', {
      $scope: $scope,
      DataService: dService
    });
  }));

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    dService = { isNurseFlow: function () { return true; } };
    $controller('PatientInfoCtrl', {
      $scope: $scope,
      DataService: dService
    });
  }));

  it('pickMale sets the scope\'s gender value to male', function () {
    $scope.pickMale();
    $scope.form.gender.should.equal('Male');
  });

  it('pickFemale sets the scope\'s gender value to female', function () {
    $scope.pickFemale();
    $scope.form.gender.should.equal('Female');
  });

  it('selectionClass()', function(){
    $scope.form = {
        gender: 'Male'
    };
    $scope.selectionClass('Male').should.equal('btn-selected');
    $scope.selectionClass('').should.equal('btn-unselected');
  });

  it('form updates DataService whenever a field is changed', function () {
    $scope.form.name = 'Bob Dole';
    $scope.$digest();
    dService.patientInfo.name.should.equal('Bob Dole');
  });

  it('updateData applies the form\'s information to DataService', function () {
    $scope.form = {
      name: 'blah',
      address1: 'easy street',
      city: 'junkyard',
      state: 'KY',
      zip: '43657',
      dob: '19990101',
      gender: 'Male'
    };
    $scope.updateData();
    dService.patientInfo.should.equal($scope.form);
    $scope.form.complete.should.be.true;
  });

  it('allRequiredFieldsAreFilled should only return true if scope.form has all the necessary fields', function () {
    var requiredFields = {
      name: 'blah',
      address1: 'addr',
      city: 'nowhere',
      state: 'US',
      zip: '23456',
      dob: 'something',
      gender: 'Male'
    };
    function testEachField(blueprint) {
      Object.keys(blueprint).forEach(function (exclude) {
        var enteredForm = {};
        Object.keys(blueprint).filter(function (f) { return f != exclude; }).forEach(function (field) {
          enteredForm[field] = blueprint[field];
        });
        $scope.form = enteredForm;
        $scope.allRequiredFieldsAreFilled().should.be.false;
        $scope.form[exclude] = blueprint[exclude];
        $scope.allRequiredFieldsAreFilled().should.be.true;
      });
    }

    testEachField(requiredFields);
  });

  it('adds a patientInfo section to DataService on init', function () {
    expect(dService.patientInfo).not.to.be.undefined;
  });

  it('if DataService already has a patientInfo section, don\'t overwrite it', function () {
    dService.patientInfo = {
      name: { checkboxValue: true },
      address1: { checkboxValue: true }
    };

    $controller('PatientInfoCtrl', {
      $scope: $scope,
      DataService: dService
    });

    dService.patientInfo.name.checkboxValue.should.be.true;
    dService.patientInfo.address1.checkboxValue.should.be.true;
  });

  it('completeNursePatientInfo()', function(){

    dService.patientInfo={};
    dService.patientInfo={
        complete : true
    };
    dService.nursePatientInfo = {};
    dService.nursePatientInfo = {
        complete : false
    };
    $scope.completeNursePatientInfo();
    expect(dService.nursePatientInfo.complete).to.be.true;

  });

  it('validate() && onStateFocus() && onZipFocus() for state and zip code', function (){
    $scope.patientForm = true;
    //Test 1
    $scope.form.state = "IA";
    $scope.form.zip = "52557";
    expect($scope.validate()).to.be.true;
    $scope.onStateFocus();
    expect($scope.stateValid).to.be.true;
    $scope.onZipFocus();
    expect($scope.zipValid).to.be.true;
    //Test 2
    $scope.form.zip = "888";
    expect($scope.validate()).to.be.false;
    expect($scope.zipValid).to.be.false;
    //Test 3
    $scope.form.zip= "52557";
    $scope.form.state = "I";
    expect($scope.validate()).to.be.false;
    expect($scope.stateValid).to.be.false;
    //Test 4
    $scope.form.zip= undefined;
    $scope.form.state = undefined;
    expect($scope.validate()).to.be.false;
    expect($scope.zipValid).to.be.false;
    expect($scope.stateValid).to.be.false;
  });

});
