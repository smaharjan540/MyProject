'use strict';

describe('Data Service', function () {
  var service;

  beforeEach(module('rascal'));

  beforeEach(inject(function (DataService) {
    service = DataService;
  }));

  it('creates an object to be populated with form data', function () {
    expect(service).not.to.be.undefined;
    expect(service.clearData).not.to.be.undefined;
  });

  it('clearData() removes any extra data', function () {
    service.blah = 'blah';
    service.clearData();
    expect(service.blah).to.be.undefined;
    expect(service.clearData).not.to.be.undefined;
  });

  it('clearData() activates its callback function once it is finished', function () {
    var called = false;
    service.clearData(function () { called = true; });
    called.should.be.true;
  });

  it('isNurseFlow() tells whether or not the user is currently on the nurse flow', function () {
    service.isNurseFlow().should.be.false;
    service.startRequest = { userType: 'nurse' };
    service.isNurseFlow().should.be.true;
    service.startRequest = { userType: 'patient' };
    service.isNurseFlow().should.be.false;
  });

  it('isPatientFlow() tells whether or not the user is currently on the patient flow', function () {
    service.isPatientFlow().should.be.false;
    service.startRequest = { userType: 'patient' };
    service.isPatientFlow().should.be.true;
    service.startRequest = { userType: 'nurse' };
    service.isPatientFlow().should.be.false;
    service.startRequest = { userType: 'caregiver' };
    service.isPatientFlow().should.be.true;
  });

  it('isNativeApp tells whether or not ionic is currently running on the android platform', function () {
    service.isNativeApp().should.be.false;
    window.ionic.Platform.platform = function () { return 'android'; };
    service.isNativeApp().should.be.true;
  });

});
