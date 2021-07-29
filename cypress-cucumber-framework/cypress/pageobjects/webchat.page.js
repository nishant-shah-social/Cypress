/// <reference types ="Cypress" />

export class WebChatPage {
  /**
  * define elements
  */
  get chatHeader(){ return cy.get('.hs-header');}
  get userIdDashboard(){ return cy.get('span.hs-issue-header__uid');}
  get messageItem() {return cy.get('.hs-message__item-wrapper');}
}
export const webChatPage = new WebChatPage();

