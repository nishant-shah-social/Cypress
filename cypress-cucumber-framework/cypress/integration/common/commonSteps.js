/// <reference types ="Cypress" />
import { Then } from "cypress-cucumber-preprocessor/steps";
import { adminPage } from "../../pageobjects/admin.page";
import { issuePage } from "../../pageobjects/issue.page";
import {ROUTE_KEYS} from "../../constants/routes.js";

const IN_APP_URL_REGEX = /\/admin\/issues\/+/;
const IN_APP_URL_ISSUENUMBER_REGEX = /\/admin\/issues\/[0-5]+/;

When ('I see issue created on the dashboard', () => {
  cy.intercept('GET', '/xhr/view/issues/?', {
    statusCode: 200,
  });
  cy.location().should((loc) => {
     const result = IN_APP_URL_ISSUENUMBER_REGEX.test(loc.pathname)
     expect(result).to.equal(true);
   });
  issuePage.allIssues.click({force: true})
  adminPage.issueItem.first().click();
});

Then('I see {string} in the title', title => {
  cy.title().should("include", title);
});

Then('I should be able to logout from dashboard', () =>{
  cy.logout();
});




