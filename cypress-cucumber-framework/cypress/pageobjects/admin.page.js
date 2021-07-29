/// <reference types ="Cypress" />

export class AdminPage {
  /**
  * define elements
  */
  get usernameInput(){ return cy.getEl('login__username');}
  get passwordInput(){ return cy.getEl('login__pwd'); }
  get loginButton(){ return cy.getEl('login__submit'); }
  get userTab(){return cy.get(".popover__title > .hs-main-nav__item");}
  get userLogOutOption() {return cy.contains('Logout');}
  get issueItem(){ return cy.getEl('issue-list__item'); }
  get chatHeader(){ return cy.get('.hs-header');}
  get userIdDashboard(){ return cy.get('span.hs-issue-header__uid');}
  get messageItem() {return cy.get('.hs-message__item-wrapper');}
}
export const adminPage = new AdminPage();

