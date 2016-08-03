'use strict';

describe('Nurse Details Controller', function () {
  var $controller, $scope, dService;

  beforeEach(module('rascal'));

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    dService = { startRequest: { userType: 'nurse' } };
    $controller('NurseDetailsCtrl', {
      $scope: $scope,
      DataService: dService
    });
  }));

  it('adds a nurseDetails section to DataService on init', function () {
    expect(dService.nurseDetails).not.to.be.undefined;
  });

  it('if DataService already has a nurseDetails section, don\'t overwrite it', function () {
    dService.nurseDetails = {
      name: 'karma',
      state: 'TX'
    };

    $controller('NurseDetailsCtrl', {
      $scope: $scope,
      DataService: dService
    });

    dService.nurseDetails.name.should.equal('karma');
    dService.nurseDetails.state.should.equal('TX');
  });

  it('allRequiredFieldsAreFilled should only return true if scope.form has all the necessary fields', function () {
    var requiredFields = {
      name: 'blah',
      phoneNumber: '1234567890',
      facility: 'test',
      city: 'Townsville',
      state: 'KS'
    };

    function testEachField(blueprint) {
      Object.keys(blueprint).forEach(function (exclude) {
        var enteredForm = {};
        Object.keys(blueprint).filter(function (f) { return f !== exclude; }).forEach(function (field) {
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

  it('updateData applies the form\'s information to DataService', function () {
    $scope.form.name = 'blah';
    $scope.form.phoneNumber = '1234567890';
    $scope.form.facility = 'test';
    $scope.form.city = 'Townsville';
    $scope.form.state = 'KS';
    $scope.updateData();
    dService.nurseDetails.complete.should.be.true;
    dService.nurseDetails.should.equal($scope.form);
  });

  it('form updates DataService whenever a field is changed', function () {
    $scope.form.name = 'Bob Dole';
    $scope.$digest();
    dService.nurseDetails.name.should.equal('Bob Dole');
  });

});
