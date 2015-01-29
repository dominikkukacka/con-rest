var expect = require('chai').expect;
var Yadda = require('yadda');
var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;

var dictionary = new Dictionary()
  .define('NUM', /(\d+)/);

module.exports = English.library(dictionary)
  .given('I navigate to(?: a page)? "([^"]*)"', function navigateTo(url) {
    browser.get('#/' + url, 4000);
  })
  .given('I have at least $NUM workflow item(:s){0,1} in the list', function confirmItems(amount) {
    expect(element.all(by.css('workflow-list-item')).count())
      .to.be.above(amount);
  })
  .when('entering the (.*) with "(.*)" on (.*)', function enterInput(input, value, model) {
    var inputElement = element(by.model(model + '.' + input))
      .element(by.model('value'));
    inputElement.click();
    inputElement.clear();
    inputElement.sendKeys(value);
  })
  .when('clicking the button with "(.*)" action', function clickButton(action) {
    element(by.css('[ng-click="' + action + '()"]')).click();
  })
  .when('I click on workflow item #$NUM', function clickOnItem(itemNumber) {
    element(by.css('workflow-list-item:nth-child(' + itemNumber + ')'))
      .element(by.css('[ng-click="toggleRequestDetails()"]')).click();
  })
  .then('the form header should become "(.*)"', function checkFormHeader(header) {
    expect(element(by.cssContainingText('h3', header)).isPresent()).to.become(true);
  })
  .then('I should see the details of workflow #$NUM', function detailsOfNumberOne(workflowIndex) {
    var listName = element.all(by.css('workflow-list-item'))
      .then(function returnElement(foundElements) {
        return foundElements[workflowIndex]
          .element(by.binding('workflow.name')).getText();
      });
    var detailName = element.all(by.css('workflow h2'));
    protractor.promise.filter(detailName, function filter(header) {
        return header.isDisplayed();
      })
      .then(function filter(foundHeaders) {
        for (var i = 0; i < foundHeaders.length; i++) {
          if (foundHeaders[i].isDisplayed()) {
            return foundHeaders[i];
          }
        }
      })
      .then(function(visibleHeader) {
        return visibleHeader.getText();
      })
      .then(function assert(otherName) {
        expect(listName).to.become(otherName);
      });
  });
