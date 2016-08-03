'use strict';

describe('Patient Needs Controller', function () {
  var $controller, $scope, dService;

  beforeEach(module('rascal'));

  beforeEach(inject(function (_$controller_, $rootScope) {
    $controller = _$controller_;
    $scope = $rootScope.$new();
    dService = { isNurseFlow: function () { return false; } };
    $controller('PatientNeedsCtrl', {
      $scope: $scope,
      DataService: dService
    });
  }));

  it('adds a patientNeeds section to DataService on init', function () {
    expect(dService.patientNeeds).not.to.be.undefined;
  });

  it('if DataService already has a patientNeeds section, don\'t overwrite it', function () {
    $controller('PatientNeedsCtrl', {
      $scope: $scope,
      DataService: dService
    });

    dService.patientNeeds.categories.wound.checkboxValue.should.be.false;
    dService.patientNeeds.categories.insulin.checkboxValue.should.be.false;

    dService.patientNeeds = {
      categories: {
        incontinence: { checkboxValue: false },
        ostomy: { checkboxValue: false },
        wound: { checkboxValue: true },
        diabetes: { checkboxValue: false },
        insulin: { checkboxValue: true },
        urological: { checkboxValue: false },
        health: { checkboxValue: false }
      }
    };

    $controller('PatientNeedsCtrl', {
      $scope: $scope,
      DataService: dService
    });

    dService.patientNeeds.categories.wound.checkboxValue.should.be.true;
    dService.patientNeeds.categories.insulin.checkboxValue.should.be.true;
    $scope.needs.categories.wound.checkboxValue.should.be.true;
    $scope.needs.categories.insulin.checkboxValue.should.be.true;
  });

  it('can tell if one of the checkboxes has been selected', function () {
    dService.patientNeeds.complete = false;
    $scope.$apply();
    $scope.needs.complete.should.be.false;
    $scope.needs.categories.health.checkboxValue = true;
    $scope.$apply();
    $scope.needs.complete.should.be.true;
    $scope.needs.categories.health.checkboxValue = false;
    $scope.$apply();
    $scope.needs.complete.should.be.false;
    $scope.needs.categories.insulin.checkboxValue = true;
    $scope.$apply();
    $scope.needs.complete.should.be.true;
  });

  it('watches the display variable to know when to update DataService with new data', function () {
    $scope.needs.categories.wound.checkboxValue = true;
    $scope.$apply();
    dService.patientNeeds.categories.wound.checkboxValue.should.be.true;
    dService.patientNeeds.categories.urological.checkboxValue.should.be.false;
    dService.patientNeeds.complete.should.be.true;
    $scope.needs.categories.wound.checkboxValue = false;
    $scope.$apply();
    dService.patientNeeds.categories.wound.checkboxValue.should.be.false;
    dService.patientNeeds.categories.health.checkboxValue.should.be.false;
    dService.patientNeeds.complete.should.be.false;
  });
});
