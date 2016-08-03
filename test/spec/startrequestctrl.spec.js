describe('Start Request Controller', function () {
  var controller;
  var $scope = {};
  var dService = {
    isNativeApp: function () { return false; }
  };

  beforeEach(module('rascal'));

  beforeEach(inject(function ($controller) {
    controller = $controller('StartRequestCtrl', {
      $scope: $scope,
      DataService: dService
    });
  }));

  it('setSelected should set which option the user selected onto the DataService', function () {
    ['nurse', 'patient', 'caregiver'].forEach(function (option) {
      $scope.setSelected(option);
      dService.startRequest.userType.should.equal(option);
      $scope.setSelected(option);
      dService.startRequest.userType.should.equal(option);
      $scope.setSelected(option);
      dService.startRequest.userType.should.equal(option);
    });

  });

  it('selectedClass gives a css class for whether or not a specific option is currently selected', function () {
    ['nurse', 'patient', 'caregiver'].forEach(function (option) {
      $scope.userType = option;
      $scope.selectionClass(option).should.equal('btn-selected');
      $scope.selectionClass('blah').should.equal('btn-unselected');
    });
  });

  it('anOptionIsSelected tells whether or not an option has been selected at all', function () {
    $scope.userType = '';
    $scope.anOptionIsSelected().should.be.false;
    $scope.userType = 'patient';
    $scope.anOptionIsSelected().should.be.true;
  });

});
