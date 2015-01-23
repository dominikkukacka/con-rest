var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function definitions() {
  this.Given(/^I navigate to(?: a page)? "([^"]*)"$/, function navigateTo(url, next) {
    browser.get('#/' + url);
    next();
  });

  this.When(/^entering the (.*) with "(.*)"$/, function enterInput(input, value, next) {
    element(by.model('request.' + input))
      .element(by.model('value')).sendKeys(value);
    next();
  });

  this.When(/^clicking the "(.*)" button$/, function clickButton(buttonText, next) {
    element(by.buttonText(buttonText)).click();
    next();
  });

  this.Then(/^the form header should become "(.*)"$/, function checkFormHeader(header, next) {
    expect(element(by.cssContainingText('h3', header)).isPresent()).to.become(true).and.notify(next);
  });
};
