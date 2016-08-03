'use strict';

describe('Truncate Filter', function () {
  var $filter;

  beforeEach(module('rascal'));

  beforeEach(inject(function(_$filter_){
    $filter = _$filter_;
  }));

  it('returns empty string when no input is given', function () {
    $filter('truncate')().should.equal('');
  });

  it('returns empty string when an empty string is given', function () {
    $filter('truncate')('').should.equal('');
  });

  it('returns the same string when no length is given', function () {
    $filter('truncate')('blah').should.equal('blah');
  });

  it('returns the same string when its length is less than max length', function () {
    $filter('truncate')('blah', 6).should.equal('blah');
  });

  it('returns the same string when its length is less than max length', function () {
    $filter('truncate')('blah', 4).should.equal('blah');
  });

  it('returns a truncated string with an ellipsis when its length is greater than max length', function () {
    $filter('truncate')('blah', 3).should.equal('bla...');
    $filter('truncate')('super long text', 3).should.equal('sup...');
    $filter('truncate')('super long text', 7).should.equal('super l...');
  });

});
