'use strict';

describe('Flow Service', function () {
  var service, $state;

  beforeEach(module('rascal'));

  beforeEach(inject(function (FlowService, _$state_) {
    service = FlowService;
    $state = _$state_;
  }));

  it('flow() returns the flow corresponding to the user type supplied', function () {
    var nurseFlow = service.flow('nurse');
    var nursePages = ['Start', 'Introduction', 'Your Details', 'Patient Information', 'Insurance', 'Patient\'s Doctor', 'Product Request', 'Confirmation'];
    nurseFlow.should.be.instanceof(Array);
    nurseFlow.length.should.equal(8);
    nurseFlow.map(function(page) { return page.label }).should.deep.equal(nursePages);

    var patientFlow = service.flow('patient');
    var patientPages = ['Start', 'Introduction', 'Product Needs', 'Patient Information', 'Contact Details', 'Doctor Information', 'Insurance', 'Confirmation'];
    patientFlow.should.be.instanceof(Array);
    patientFlow.length.should.equal(8);
    patientFlow.map(function(page) { return page.label }).should.deep.equal(patientPages);
  });

});
