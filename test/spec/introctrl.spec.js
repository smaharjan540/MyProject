'use strict';

describe('Introduction Controller', function () {
  var $scope, $controller, dService;

  beforeEach(module('rascal'));

  beforeEach(inject(function (_$controller_) {
    $scope = {};
    $controller = _$controller_;
    dService = { isNurseFlow: function () { return false; } };
    $controller('IntroCtrl', {
      $scope: $scope,
      DataService: dService
    });
  }));

  it('acceptTerms enables the continue button and saves to DataService', function () {
    $scope.acceptTerms();
    dService.intro.complete.should.be.true;
    $scope.btnIndexZero.disabled.should.be.false;
  });

  it('acceptTerms disables the continue button and saves to DataService if it had already been accepted', function () {
    $scope.accept = true;
    $scope.acceptTerms();
    dService.intro.complete.should.be.false;
    $scope.btnIndexZero.disabled.should.be.true;
  });

  it('initializes from DataService', function () {
    dService.intro = { complete: false };
    $controller('IntroCtrl', {
      $scope: $scope,
      DataService: dService
    });
    $scope.accept.should.be.false;
    dService.intro = { complete: true };
    $controller('IntroCtrl', {
      $scope: $scope,
      DataService: dService
    });
    $scope.accept.should.be.true;
  });

  it('if in the patient flow, then the continue button will go to the patient needss page', function () {
    dService.isNurseFlow = function () { return false; };
    $controller('IntroCtrl', {
      $scope: $scope,
      DataService: dService
    });
    $scope.btnIndexZero.href.should.equal('patientNeeds');
  });

  it('if in the nurse flow, then the continue button will go to the nurse details page', function () {
    dService.isNurseFlow = function () { return true; };
    $controller('IntroCtrl', {
      $scope: $scope,
      DataService: dService
    });
    $scope.btnIndexZero.href.should.equal('nurseDetails');
  });
});
