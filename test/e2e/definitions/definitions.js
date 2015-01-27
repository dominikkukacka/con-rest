var expect = require('chai').expect;
var English = require('yadda').localisation.English;

module.exports = English.library()
  .given('I navigate to(?: a page)? "([^"]*)"', function navigateTo(url) {
    browser.get('#/' + url, 4000);
  })
  .when('entering the (.*) with "(.*)"', function enterInput(input, value) {
    element(by.model('request.' + input))
      .element(by.model('value')).sendKeys(value);
  })
  .when('clicking the button with "(.*)" action', function clickButton(action) {
    element(by.css('[ng-click="' + action + '()"]')).click();
  })
  .then('the form header should become "(.*)"', function checkFormHeader(header) {
    expect(element(by.cssContainingText('h3', header)).isPresent()).to.become(true);
  });
