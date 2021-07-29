/**
* These are the steps created to test Issues Page
* @author Nishant Shah <nishant.shah@helpshift.com>
* @created Feb 11, 2021
*/

/// <reference types ="Cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import {appPage} from "../../../pageobjects/HelpCenter/app.page.js"
import {adminPage} from "../../../pageobjects/admin.page.js"
//import {appDetails} from "AppDetails.js"

Given('I am on the Help Center 2.0', () => {
    cy.launchHelpCenter();
  });

When('I select the app {string} from the app dropdown', (app) => {

});

And('I scroll to {string} title', (title) => {

});

And('I select the platform {string} from the platform dropdown', (platform) => {

});

Then('I should see correct list of FAQ sections under Select a Category title', () => {
    
    //let apps = [];
    // appPage.appDropdown.click();
    // appPage.appListContainer
    //     .find('hc-static-dropdown__item-title').each(($el, index, $list)=>{
    //         cy.wrap($el)
    //             .invoke('text')
    //                 .then(text =>{
    //                     apps.push(text);
    //                 });
    // });

    let appsWithIds = [];
    let apps = [];

//     appPage.appStaticDropdown.click();
//     appPage.appStaticDropdown
//         .within(($appStaticDropdown)=>{
//             cy.get('script')
//                 .invoke('text')
//                     .then(text =>{
//                             appsWithIds = JSON.parse(text);
//                     });
//         }).then(() => {
//             appsWithIds.forEach(app => {
//                 cy.visit(Cypress.env('webhelpcenterurl') + app.url);
//                 let sectionsList = [];
//                 let lang_sections = new Map();
//                 appPage.sectionNames.each(($el,index,$list)=>{
//                     cy.wrap($el)
//                         .invoke('attr','href')
//                             .then(href => {
//                                 sectionUrl = Cypress.env('webhelpcenterurl')+href;
//                                 cy.visit(sectionUrl);     
//                                 appPage.sectionPageFaqs.each(($el,index,$list)=>{
//                                     cy.wrap($el)
//                                         .invoke('attr','href')
//                                             .then(faqhref => {
//                                                 let faqslist = [];
//                                                 faqUrl = Cypress.env('webhelpcenterurl') + faqhref;
//                                                 cy.visit(faqUrl);
//                                                 appPage.language.click();
                                            
//                                                 appPage.language.within(($appLanguageStaticDropdown)=>{
//                                                     cy.get('script')
//                                                         .invoke('text')
//                                                             .then(text =>{
//                                                                     languages = JSON.parse(text);
//                                                                     languages.forEach((lang)=>{
//                                                                         faqUrl = Cypress.env('webhelpcenterurl') + lang.url;
//                                                                         cy.visit(faqUrl);

//                                                                         appPage.faqPageFaqTitle.then(($title)=>{
//                                                                             faqTitle = $title.text();
//                                                                             appPage.faqPageFaqBody.then(($faqBody)=>{
//                                                                                 faqBody = $faqBody.text();
//                                                                                 ln = lang.url.split("/")[1];
//                                                                                 faq = new faqs(faqTitle,faqBody,ln);
//                                                                                 faqslist.push(faq);
//                                                                                 appPage.breadcrumbs.eq(1).then(($breadcrumb)=>{
//                                                                                     lang_sections[ln]=$breadcrumb.text();
//                                                                                 });
//                                                                             });
//                                                                         })
                                                                        
//                                                                     });
//                                                             });
//                                                 }).then(()=>{
//                                                     //sectionId = faqhref.split("/")
//                                                     sectionFAQs = faqslist;
//                                                     sectionDetails = lang_sections;
//                                                     appSection = new section(sectionId, sectionFAQs, FAQssectionName, sectionDetails);
//                                                     sectionsList.push(appSection);
//                                                 });
//                                             });
//                                 });
//                             });

//                 }).then(()=>{
//                     appName = app.title;
//                     appSections = sectionsList;
//                     myapp = new AppDetails(appName,appSections);
//                 })
//             });

//             });
//         });
    
//     appPage.appListContainer
//     .find('hc-static-dropdown__item-title').each(($el, index, $list)=>{
//         cy.wrap($el)
//             .invoke('text')
//                 .then(text =>{
//                     apps.push(text);
//                 });
// });
    
    let actualSections = [];
    appPage.sectionNames.each(($el,index,$list) => {
        cy.wrap($el)
            .invoke('text')
                .then(text=>{
                    actualSections.push(text);
                })
     }).then(()=> expect(actualSections).to.deep.eq(["Troubleshooting",
                                                     "Billing Info",
                                                     "Video Conference",
                                                     "Known Issues",
                                                     "FAQ Suggestions",
                                                     "Free Charge",
                                                     "Claims",
                                                     "Tango",
                                                     "JOB TODAY",
                                                     "InterNations",
                                                     "Technical Issues",
                                                     "Top Support Questions",
                                                     "Billing",
                                                     "<script>alert(\"hello\")</script>",
                                                     "Deep links"]))   
                                                    });
