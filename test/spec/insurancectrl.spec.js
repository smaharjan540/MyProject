'use strict';

describe('Insurance Controller', function () {

  var $controller, $scope, dService, $cordovaCamera;

  beforeEach(module('rascal'));

  beforeEach(inject(function (_$controller_, $rootScope, _$cordovaCamera_) {
    $controller = _$controller_;
    $scope = $rootScope.$new();
    $cordovaCamera = _$cordovaCamera_;

    dService = {
      isNurseFlow: function () { return false; },
      isNativeApp: function () { return true; }
    };
    $controller('InsuranceCtrl', {
      $scope: $scope,
      DataService: dService
    });
  }));

  beforeEach(inject(function (_$controller_, $rootScope, _$cordovaCamera_) {
    $controller = _$controller_;
    $scope = $rootScope.$new();
    $cordovaCamera = _$cordovaCamera_;

    dService.isNativeApp = function () { return false; };
    $controller('InsuranceCtrl', {
      $scope: $scope,
      DataService: dService
    });
  }));

  it('onInsuranceEditChng() should enable continuing if both pictures are taken', function() {
    $scope.data.takePhoto = true;
    //Test 1
    $scope.data.frontImageBase64String = '';
    $scope.onInsuranceEditChng();
    $scope.btnIndexZero.disabled.should.equal(true);
    $scope.data.complete.should.equal(false);
    //Test 2
    $scope.data.frontImageBase64String = 'data:image/jpeg;base64asdfasdfasdf';
    $scope.data.backImageBase64String = '';
    $scope.onInsuranceEditChng();
    $scope.btnIndexZero.disabled.should.equal(true);
    $scope.data.complete.should.equal(false);
    //Test 3
    $scope.data.frontImageBase64String = 'data:image/jpeg;base64asdfasdfasdf';
    $scope.data.backImageBase64String = 'data:image/jpeg;base64asdflasjdflaksdf';
    $scope.onInsuranceEditChng();
    $scope.btnIndexZero.disabled.should.equal(false);
    $scope.data.complete.should.equal(true);
    //Test 4
    $scope.data.frontImageBase64String = undefined;
    $scope.data.backImageBase64String = undefined;
    $scope.onInsuranceEditChng();
    $scope.btnIndexZero.disabled.should.equal(true);
    $scope.data.complete.should.equal(false);
  });

  it('onInsuranceEditChng() should always enable continue if pictures are not being taken', function(){
    $scope.data.takePhoto = false;
    //Test 1
    $scope.onInsuranceEditChng();
    $scope.btnIndexZero.disabled.should.equal(false);
    $scope.data.complete.should.equal(true);
    //Test 2
    $scope.data.name = "Sujan";
    $scope.data.policyNumber = "PPPPPP";
    $scope.data.groupNumber = "GGGGGG";
    $scope.data.phoneNumber = "5555555555";
    $scope.onInsuranceEditChng();
    $scope.btnIndexZero.disabled.should.equal(false);
    $scope.data.complete.should.equal(true);
  });

  it('validate() phoneNumber', function(){

    //Test 1
    $scope.takePhoto = false;
    $scope.data.phoneNumber = "5555555555";
    $scope.validate().should.equal(true);
    //Test 2
    $scope.data.phoneNumber = "555555555";
    $scope.validate().should.equal(false);

  });

  it('updateData()', function(){
    //Test 1
    $scope.data.name = "Sujan Maharjan";
    $scope.data.policyNumber = "PPPPPP";
    $scope.data.groupNumber = "GGGGGG";
    $scope.data.phoneNumber = "5555555555";
    $scope.updateData();
    $scope.allRequiredFieldsAreFilled().should.equal(true);
    //Test 2
    $scope.data.name = "";
    $scope.updateData();
    $scope.allRequiredFieldsAreFilled().should.equal(false);
  });

  it('onPhoneNumberFocus()', function(){
    $scope.onPhoneNumberFocus()
    expect($scope.phoneValid).to.be.true;
  });

   it('previewPicture()', function(){
     $scope.previewPicture('FRONTSIDE')
     $scope.imageSide.should.equal('FRONTSIDE');
   });

});
