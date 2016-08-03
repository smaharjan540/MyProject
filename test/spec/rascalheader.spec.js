'use strict';

describe('Header Directive', function () {
  var $compile, $scope, $state, dService;

  beforeEach(module('rascal'));

  beforeEach(inject(function(_$compile_, $rootScope, _$state_, DataService){
    $compile = _$compile_;
    $scope = $rootScope.$new();
    $state = _$state_;
    dService = DataService;
  }));

  it('replaces the element with the correct content', function () {
    var element = getCompiledElement('<rascal-header hide-quit-button="true"></rascal-header>');
    element.isolateScope().hideQuitButton.should.equal('true');
    element.html().should.contain('<img class="med-connect-logo" src="images/MedConnect_CH.jpeg">');
  });

  it('closeTimeoutModal closes the modal', function () {
    var element = getCompiledElement('<rascal-header></rascal-header>');
    var hideSpy = chai.spy.on(element.isolateScope().timeoutModal, 'hide');
    element.isolateScope().closeTimeoutModal();
    expect(hideSpy).to.have.been.called();
  });

  it('showQuitModal shows the modal', function () {
    var element = getCompiledElement('<rascal-header></rascal-header>');
    var showSpy = chai.spy.on(element.isolateScope().quitModal, 'show');
    element.isolateScope().showQuitModal();
    expect(showSpy).to.have.been.called();
  });

  it('closeQuitModal closes the modal', function () {
    var element = getCompiledElement('<rascal-header></rascal-header>');
    var hideSpy = chai.spy.on(element.isolateScope().quitModal, 'hide');
    element.isolateScope().closeQuitModal();
    expect(hideSpy).to.have.been.called();
  });

  it('quitSession closes the timeout and quit modals, clears DataService, then goes to the landing page', function () {
    var element = getCompiledElement('<rascal-header></rascal-header>');
    var timeoutHideSpy = chai.spy.on(element.isolateScope().timeoutModal, 'hide');
    var quitHideSpy = chai.spy.on(element.isolateScope().quitModal, 'hide');
    var stateSpy = chai.spy.on($state, 'go');
    dService.blah = 'blah';
    element.isolateScope().quitSession();
    expect(timeoutHideSpy).to.have.been.called();
    expect(quitHideSpy).to.have.been.called();
    expect(stateSpy).to.have.been.called();
    expect(dService.blah).to.not.exist;
  });

  function getCompiledElement (text) {
    var compiledElement = $compile(text)($scope);
    $scope.$apply();
    return compiledElement;
  }
});
