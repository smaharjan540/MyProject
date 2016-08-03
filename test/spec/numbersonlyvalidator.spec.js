'use strict';

describe('Numbers Only Validator Directive', function () {
  var $compile, $scope;

  beforeEach(module('rascal'));

  beforeEach(inject(function(_$compile_, $rootScope){
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  it('counts an empty input as valid', function () {
    $scope.nums = '';
    makeForm('empt');
    $scope.form.empt.$modelValue.should.equal('');
    $scope.form.empt.$valid.should.be.true;
  });

  it('inputs that are made up of numeric characters are valid', function () {
    $scope.nums = '76543';
    makeForm('numeric');
    $scope.form.numeric.$modelValue.should.equal('76543');
    $scope.form.numeric.$valid.should.be.true;
  });

  it('inputs that have non numeric characters are invalid', function () {
    $scope.nums = '276t8';
    makeForm('place');
    $scope.form.place.$modelValue.should.equal('276t8');
    $scope.form.place.$valid.should.be.false;
  });

  function makeForm (name) {
    $compile(
        '<form name="form">' +
        '<input numbers-only ng-model="nums" name="' + name + '" />' +
        '</form>'
    )($scope);
    $scope.$apply();
  }

});
