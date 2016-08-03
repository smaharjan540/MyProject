'use strict';

describe('Thanks Controller', function () {

  beforeEach(module('rascal'));

  var $controller, $state, $timeout, DataService;

  beforeEach(inject(function(_$controller_, _$state_, _$timeout_, _DataService_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $state = _$state_;
    $timeout = _$timeout_;
    DataService = _DataService_;

  }));


  it('should have certain functionality and text', function () {
    var $scope = {};
    var controller = $controller('ThanksCtrl', { $scope: $scope });
    expect($scope.pageTimeout).to.equal(30*1000);
    expect($scope.buttonText).to.equal('Start Again');
    expect($scope.thanksCopy).not.to.equal('');
    expect($scope.startAgain).to.be.not.null;
    expect($scope.clearDataHandler).to.be.not.null;
  });

  it('clearDataHandler should call $state.go (home)', function () {
    var $scope = {};
    var goCalled = false;
    var $state = { go:function() {
      goCalled = true;
    }};
    $controller('ThanksCtrl', { $scope: $scope, $state: $state});
    $scope.clearDataHandler();
    expect(goCalled).to.be.true;

  });
  it('startAgain calls DataService.clearData and callback is clearDataHandler', function () {
    var $scope = {};
    var $state = {go:function() {
    }};
    var $timeout = function() {};
    var args = null;
    var DataService = {clearData: function() {args = arguments[0]}};
    $controller('ThanksCtrl', { $scope: $scope, $state: $state, $timeout: $timeout, DataService:DataService});
    $scope.startAgain();
    expect(args).to.equal($scope.clearDataHandler);

  });

});
