import { Then, Before, After, Given } from "cypress-cucumber-preprocessor/steps";

Before({ tags: "@neednewissue and @issuespage" }, () => {
  cy.login();
  cy.getApiKey()
});

Before({ tags: "@issuespage", }, () => {
  cy.preserveCookies();
  cy.createIssueViaHSAPI();
});

Before({ tags: "@webchat" }, () => {
  cy.launchWebChat();
});
