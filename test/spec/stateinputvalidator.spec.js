'use strict';

describe('State Input Validator Directive', function () {
  var $compile, $scope;

  beforeEach(module('rascal'));

  beforeEach(inject(function(_$compile_, $rootScope){
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  it('inputs that are real states are valid', function () {
    var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
      'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    makeForm('test-states');
    $scope.isEntryValid( states, 'O').should.be.true;
    $scope.isEntryValid( states, 'OH').should.be.true;
  });

  function makeForm (name) {
    getCompiledElement(
        '<form name="form">' +
        '<input state-input ng-model="state" name="' + name + '" />' +
        '</form>'
    );
  }

  function getCompiledElement (text) {
    var compiledElement = $compile(text)($scope);
    $scope.$apply();
    return compiledElement;
  }
});
