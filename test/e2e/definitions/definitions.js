var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function definitions() {
  this.Given(/^I navigate to(?: a page)? "([^"]*)"$/, function navigateTo(url, next) {
    browser.get(url);
    next();
  });

  this.Then(/^the $/)
};
