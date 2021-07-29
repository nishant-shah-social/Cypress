/// <reference types ="Cypress" />

export class AppPage {
    /**
    * define elements
    */
    get categoryTitle(){ return cy.get('.faq-sections-block-header');}
    get sectionNames(){ return cy.get('.faq-section-name'); }
    get appDropdown(){return cy.get('.hc-static-dropdown__widget-title'); }
    get appStaticDropdown(){return cy.get('.hc-static-dropdown--apps-dropdown'); }
    get appListContainer(){return cy.get('.hc-static-dropdown__popover-list');}
    
    get sectionPageFaqs(){return cy.get('.link section-faq');}

    get faqPageFaqTitle(){return cy.get('.faq-title');}
    get faqPageFaqBody(){return cy.get('.article-body');}
    get language(){return cy.get('.hc-static-dropdown--language-dropdown');}
    get breadcrumbs(){return cy.get('link faq-breadcrumb-link');}
  }
  export const appPage = new AppPage();
  
  