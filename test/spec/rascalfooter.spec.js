'use strict';

describe('Footer Directive', function () {
  var $compile, $scope;

  beforeEach(module('rascal'));

  beforeEach(inject(function(_$compile_, $rootScope){
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  it('replaces the element with the correct content', function () {
    $scope.btnIndexZero = {
      title: 'TestZero',
      disabled: true,
      visible: true,
      href: 'contactDetails'
    };
    $scope.btnIndexOne = {
      title: 'TestOne',
      disabled: false,
      visible: true,
      href: 'patientNeeds'
    };
    var element = getCompiledElement('<rascal-footer btn-index-zero="btnIndexZero" btn-index-one="btnIndexOne"></rascal-footer>');
    element.isolateScope().btnIndexZero.title.should.equal("TestZero");
    element.isolateScope().btnIndexOne.title.should.equal("TestOne");
  });

  it('enables and disables the quit button according to its scope', function () {
    $scope.btnIndexZero = {
      title: 'TestZero',
      disabled: true,
      visible: true,
      href: 'contactDetails'
    };
    $scope.btnIndexOne = {
      title: 'TestOne',
      disabled: false,
      visible: true,
      href: 'patientNeeds'
    };
    var element = getCompiledElement('<rascal-footer btn-index-zero="btnIndexZero" btn-index-one="btnIndexOne"></rascal-footer>');
    element.isolateScope().btnIndexZero.disabled.should.be.true;
    element.find('button')[0].disabled.should.be.true;
    $scope.btnIndexZero.disabled = false;
    $scope.$apply();
    element.isolateScope().btnIndexZero.disabled.should.be.false;
    element.find('button')[0].disabled.should.be.false;
  });

  function getCompiledElement (text) {
    var compiledElement = $compile(text)($scope);
    $scope.$apply();
    return compiledElement;
  }
});
