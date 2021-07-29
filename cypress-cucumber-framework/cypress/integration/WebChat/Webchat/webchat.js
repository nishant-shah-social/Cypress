import { Given, When, Then, After } from "cypress-cucumber-preprocessor/steps"
import {adminPage} from "../../../pageobjects/webchat.page.js"


Given('I am on the application support page', () => {
  cy.createUserId();
});

When ('I open Web chat', () => {
  cy.iframe('').as('chatIcon');
  cy.get('@chatIcon').find('button').click();
});

When('I type in {string} and sends issue description', (query) => {
  cy.iframewidget('#hs-web-sdk-iframe').as('chatWidget');
  cy.get('@chatWidget').find('.hs-chat-footer__text-area').type(query);
  cy.get('@chatWidget').find('.ion-send').click();
});

When ('I attach screen shot in the chat', () => {
  cy.get('@chatWidget').find('.hs-dnd-wrapper').attachFile('image.png', { subjectType: 'drag-n-drop' });
});

Then('I should see {string} and image in the chat window', (query) => {
  cy.get('@chatWidget').should('contain.text', query);
});

Then('I should see title of the widget as {string}', (title) => {
  cy.iframewidget('#hs-web-sdk-iframe').as('chatWidget');
  cy.get('@chatWidget').find('.hs-header').should('have.text', title)
});

Then('Events route request sent to API server', () => {
  cy.intercept('POST','/events/v1/infinitelybeta/websdk/', (req) => {
      let requestBody = req.body}).as("requests");
});

Then ('I verify the data sent in the request', () => {
  cy.wait("@requests").its('request.body').then((params)=>{
    let updatedRequestBody = params.replace(/%5B/g, "[")
                                   .replace(/%7B/g, "{")
                                   .replace(/%22/g, '"')
                                   .replace(/%3A/g, ":")
                                   .replace(/%2C/g, ",")
                                   .replace(/%7D/g, "}")
                                   .replace(/%5D/g, "]")
    console.log(updatedRequestBody)
    let splitRequestBody = updatedRequestBody.split("&")
    var keyArray = [];
    var valueArray = [];

    for ( var i=0; i < splitRequestBody.length; i++ ) {
      var separateArray = splitRequestBody[i].split("=");
      keyArray.push(separateArray[0]); // before the dot
      valueArray.push(separateArray[1]); // after the dot
      }
    var jsonRequest = {};
    keyArray.forEach(function (k, i) {
      jsonRequest[k] = valueArray[i];
  })
    cy.writeFile('cypress/fixtures/webchatLaunchRequestData.json', {jsonRequest})
  })

});

Then('I should see issue description and image in the chat window', () => {
  cy.get('@chatWidget').should('contain', 'lost');
});


