'use strict';

describe('Product Request Controller', function () {

  var $controller, $scope, dService;

  beforeEach(module('rascal'));

  beforeEach(inject(function (_$controller_, $rootScope) {
    $controller = _$controller_;
    $scope = $rootScope.$new();
    dService = { isNurseFlow: function () { return true; } };
    $controller('ProductRequestCtrl', {
      $scope: $scope,
      DataService: dService
    });
  }));

  it('adds a productRequest section to DataService on init', function () {
    expect(dService.productRequest).not.to.be.undefined;
  });

  it('checkMandatoryRequestItemsFields()', function(){
    $scope.requestItems = [
        {itemNumber:'one', description:'onedescription', quantity: '1'},
        {itemNumber:'two', description:'twodescription', quantity: '2'},
        {itemNumber:'', description:'', quantity: '3'},
        {}
    ];
    $scope.checkFormFields();
  });

  it('checkFormFields() should return true if all rows in requestedItems are filled correctly', function(){
    $scope.form.requestedItems= [
        {itemNumber:'one', description:'onedescription', quantity: '1'},
        {itemNumber:'two', description:'twodescription', quantity: '2'},
        {itemNumber:'', description:'', quantity: '3'}
    ];
    $scope.checkFormFields();
    $scope.form.complete.should.be.false;
    $scope.btnIndexZero.disabled.should.be.true;
    $scope.form.requestedItems= [
      {itemNumber:'one', description:'onedescription', quantity: '1'},
      {},
      {itemNumber:'two', description:'twodescription', quantity: '2'}
    ];
    $scope.checkFormFields();
    $scope.form.complete.should.be.true;
    $scope.btnIndexZero.disabled.should.be.false;
    $scope.form.requestedItems= [
      {itemNumber:'one', description:'', quantity: '1'},
      {itemNumber:'', description:'twodescription', quantity: '2'}
    ];
    $scope.checkFormFields();
    $scope.form.complete.should.be.true;
    $scope.btnIndexZero.disabled.should.be.false;
  });

  it('$watch requestedItems with digest', function(){
    $scope.$digest();
    $scope.form.requestedItems = [
        {itemNumber:'one', description:'onedescription', quantity: '1'},
        {itemNumber:'two', description:'twodescription', quantity: '2'},
        {itemNumber:'', description:'threedescription', quantity: '3'},
        {description:'threedescription', quantity: '3'}
    ];
    //Test 1
    $scope.$digest();
    expect($scope.form.complete).to.be.true;
    //Test 2
    $scope.form.requestedItems.push({itemNumber:'four', description:'fourdescription', quantity:'4'});
    $scope.$digest();
    expect($scope.form.complete).to.be.true;
    //Test 3
    $scope.form.requestedItems.push({itemNumber:'four', quantity:'4'});
    $scope.$digest();
    expect($scope.form.complete).to.be.true;
    //Test 4
    $scope.form.requestedItems.push({});
    $scope.$digest();
    expect($scope.form.complete).to.be.true;
    //Test 5
    $scope.form.requestedItems.push({itemNumber:'five', description:'fivedescription'});
    $scope.$digest();
    expect($scope.form.complete).to.be.false;
  });
});
