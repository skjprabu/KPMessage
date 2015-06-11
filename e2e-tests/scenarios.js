'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /accountRegistration when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/accountRegistration");
  });


  describe('accountRegistration', function() {

    beforeEach(function() {
      browser.get('index.html#/accountRegistration');
    });


    it('should render accountRegistration when user navigates to /accountRegistration', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('messages', function() {

    beforeEach(function() {
      browser.get('index.html#/messages');
    });


    it('should render messages when user navigates to /messages', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
