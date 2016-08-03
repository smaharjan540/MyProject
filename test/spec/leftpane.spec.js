'use strict';

describe('Left Pane Directive', function () {
  var $compile, $scope, dService, fService;
  var stateSpy;

  beforeEach(module('rascal'));

  beforeEach(inject(function(_$compile_, $rootScope, DataService, FlowService, $state){
    $compile = _$compile_;
    $scope = $rootScope.$new();
    dService = DataService;
    fService = FlowService;
    stateSpy = chai.spy.on($state, 'go');
  }));

  it('creates a list with the relevant flow as elements', function () {
    fService.flow = function () {
      return ['First', 'Second', 'Third', 'Fourth'].map(
          function (text) { return { label: text, href: 'blah' };}
      );
    };
    var element = getCompiledElement('<left-pane></left-pane>');
    var list = element.find('li');
    list.length.should.equal(4);
    angular.element(list[0]).text().should.contain('First');
    angular.element(list[1]).text().should.contain('Second');
    angular.element(list[2]).text().should.contain('Third');
    angular.element(list[3]).text().should.contain('Fourth');
  });

  it('gets the user type from DataService to figure out which flow to display', function () {
    dService.startRequest = { userType: 'caregiver' };
    fService.flow = function (flow) {
      if (flow == 'caregiver') {
        return [{label: 'Test', href: 'test'}];
      }
      else {
        return [];
      }
    };
    getCompiledElement('<left-pane></left-pane>');
    $scope.menuItems.should.be.instanceof(Array);
    $scope.menuItems.length.should.equal(1);
  });

  it('checks DataService to know whether or not a given page has been completed and sets the current page as selected', function () {
    fService.currentState = function () { return 'patientNeeds'; };
    fService.flow = function () {
      return [
        {href: 'startRequest'},
        {href: 'intro'},
        {href: 'patientNeeds'},
        {href: 'patientInfo'}
      ];
    };
    dService.intro = { complete: true };
    dService.patientInfo = { complete: true };
    getCompiledElement('<left-pane></left-pane>');
    var items = $scope.menuItems;
    [0, 1, 2, 3].forEach(function(n) {
      items[n].complete.should.equal(n == 1 || n == 3);
      items[n].selected.should.equal(n == 2);
    });
  });

  it('linkTo does nothing if the given page has not been completed', function () {
    getCompiledElement('<left-pane></left-pane>');
    $scope.linkTo({href: 'blah'});
    stateSpy.should.not.have.been.called();
  });

  it('linkTo links to the given page if it has been completed', function () {
    dService.intro = { complete: true };
    getCompiledElement('<left-pane></left-pane>');
    $scope.linkTo({href: 'intro', complete: true});
    stateSpy.should.have.been.called.with('intro');
  });

  function getCompiledElement (text) {
    var compiledElement = $compile(text)($scope);
    $scope.$apply();
    return compiledElement;
  }
});
