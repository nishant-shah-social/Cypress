// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload';
import {ROUTE_CONFIG} from "../constants/routes.js";
import { adminPage } from "../pageobjects/admin.page";
import { issuePage } from "../pageobjects/issue.page";

const ENVIRONMENTS = {
  LOCAL: "local",
  STAGE: "stage",
  PROD: "prod"
};

const env = Cypress.env("ENVIRONMENT");
const {host} = Cypress.env(env);

/**
 * Command to login to dashboard
 * @param {object} [config]
 * @param {string} [config.redirect] - the path of page to visit after login
 * More info: https://docs.cypress.io/api/cypress-api/custom-commands.html#Syntax
 */
Cypress.Commands.add("login", (config = {}) => {
  // Before running cypress test on local, please make sure you:
  // 1. Add correct login credentials in cypress.env.json
  //    + Add your domain name, user and password
  // 2. Set correct value of cypress environmental variable
  //    + In you bash profile, set CYPRESS_ENVIRONMENT=local
  //    + Don't forget to source bash profile after making above change
  const env = Cypress.env("ENVIRONMENT");
  const {host} = Cypress.env(env);
  let user = "";
  let pwd = "";

  // For local environment, read the user name and password from cypress.env.json
  // For stage and prod env, the user name and password will be passed from
  // jenkins job.
  // More info: https://docs.cypress.io/guides/guides/environment-variables.html#Option-3-CYPRESS
  if (env === ENVIRONMENTS.LOCAL) {
    const envConfig = Cypress.env(env);
    user = envConfig.user;
    pwd = envConfig.pwd;

  } else {
    user = Cypress.env("JENKINS_SMAUG_USER");
    pwd = Cypress.env("JENKINS_SMAUG_PASSWORD");
  }

  const {redirect = "/login"} = config;
  const url = `${host}${redirect}`;

  cy.visit(url).then(() => {
    cy.url().then((pageUrl) => {
      // If there is no redirection after visiting login page, then only perform
      // login actions. If the user is logged in, visiting login page will redirect
      // them to issues page. In this case, we dont have to do anything.
      if (pageUrl.includes("/login/")) {
        adminPage.usernameInput.type(user, {log: false});
        adminPage.passwordInput.type(pwd, {log: false});
        adminPage.loginButton.click();
      }
    });
  });
});

/**
 * Command to wait for view xhr to complete
 * @param {object} config
 * @param {string} config.route - the route of xhr to wait
 * @param {string} [config.alias] - the route alias to wait
 * @param {string} [config.data] - the route data
 * This is a mandatory param as cypress.wait requires an alias to wait
 */
Cypress.Commands.add("awaitViewXhr", (config = {}) => {
  const env = Cypress.env("ENVIRONMENT");
  const {route, alias, data} = config;

  cy.server();

  if (env === ENVIRONMENTS.LOCAL && data) {
    cy.route(route, data);
  } else if (alias) {
    cy.route(route).as(alias);
    cy.wait(`@${alias}`);
  } else {
    cy.log("Should not stub data in ", env);
  }
});

/**
 * Command to preserve cookies
 * This command will be called from beforeEach block in each spec file
 */
Cypress.Commands.add("preserveCookies", () => {
  // We need to preserve cookies as cypress clears all the cookies before running
  // each test as few tests involve xhr's after page load.
  // Also we want to speed up tests so performing login before each test can be
  // time consuming.
  cy.fixture("cookies").then((cookiesList) => {
    Cypress.Cookies.preserveOnce(...cookiesList);
  });
});


/**
 * Command to click on element and wait for xhr
 * @param {Object} config
 * @param {string} config.route - xhr route
 * @param {string} config.alias - xhr alias
 * @param {Object|string} [config.data] - xhr data to stub
 * @param {string} config.selector - element's selector or an selector alias to click
 * If you are passing selector alias then prefix it with '@'.
 * Check faq spec file for more details.
 */
Cypress.Commands.add("clickAndWaitXhr", (config) => {
  const env = Cypress.env("ENVIRONMENT");
  const {route, alias, data, selector} = config;
  cy.server();
  // cy.route param does not accept null or undefined as second param
  // so we have conditionally call this
  if (env === ENVIRONMENTS.LOCAL && data) {
    cy.route(route, data).as(alias);
  } else {
    cy.route(route).as(alias);
  }
  cy.get(selector).click();
  cy.wait(`@${alias}`);
});

/**
 * Command to login and wait for view xhr
 * @param {string} view - name of the view
 */
Cypress.Commands.add("loginAndAwaitViewXhr", (view) => {
  const {redirect, route, alias, data} = ROUTE_CONFIG[view];

  cy.login({
    redirect
  });
  cy.awaitViewXhr({
    route,
    alias,
    data
  });
});

/**
 * Command to naviagte to route
 * @param {string} route - the route to navigate to
 */
Cypress.Commands.add("navigate", (route) => {
  const env = Cypress.env("ENVIRONMENT");
  const {host} = Cypress.env(env);
  const url = `${host}${route}`;
  cy.visit(url);
});

/**
 * Command to get element by data qa attribute
 * @param {string} selector - name of data qa selector
 */
    Cypress.Commands.add("getEl", (selector) => {
    return cy.get(`[data-qa=${selector}]`);
  });

  /**
   * Command to find descendent element by data qa attribute
   * @param {string} selector - name of data qa selector
   */
  Cypress.Commands.add("findEl", (selector) => {
    return cy.get(`[data-qa=${selector}]`);
  });



  Cypress.Commands.add('iframe', (iframeSelector, elSelector) => {
    return cy
      .get(`iframe${iframeSelector || ''}`, { timeout: 10000 })
      .last()
      .should($iframe => {
        expect($iframe.contents().find(elSelector||'body')).to.exist
      })
      .then($iframe => {
        return cy.wrap($iframe.contents().find('body'))
      })
  });


  Cypress.Commands.add('iframewidget', (iframeSelector, elSelector) => {
    return cy
      .get(`iframe${iframeSelector || ''}`, { timeout: 10000 })
      .first()
      .should($iframe => {
        expect($iframe.contents().find(elSelector||'body')).to.exist
      })
      .then($iframe => {
        return cy.wrap($iframe.contents().find('body'))
      })
  });

  Cypress.Commands.add("createUserId", () => {
        let userid = Math.random().toString(36).substr(2, 7);
        cy.writeFile('cypress/fixtures/data.json', {id: userid})
        cy.window().then(win => win.helpshiftConfig.userId = userid);
        cy.window().then(win => win.Helpshift("updateHelpshiftConfig"));
        cy.wait(2000);
  });

Cypress.Commands.add("logout", () => {
      adminPage.userTab.click();
      adminPage.userLogOutOption.click();
});

Cypress.Commands.add("getApiKey", (config = {}) => {
  const {redirect = "admin/settings/api/"} = config;
  const url = `${host}${redirect}`;
  cy.intercept('/xhr/view/settings/api/').as('api')  // move to routes file
  cy.visit(url)
  cy.wait('@api').then((res) => {
    let apikey= res.response.body.partners[0].keys[0].key;
    let auth = 'Basic ' + new Buffer(apikey).toString('base64');
    cy.wrap(auth).as('authorization')
  });
  cy.get('@authorization').then((authorization)=>{
    Cypress.env("authorization", authorization)
  });
});

Cypress.Commands.add("createIssueViaHSAPI", (config = {}) => {
 //  cy.get('@authorization').then((authorization)=>{
   let auth = Cypress.env("authorization");
   let apiEndPoint = Cypress.env('apiEndPoint');
    cy.fixture('requestData').then(queryParameters => {
      cy.request({
        method: 'POST',
        url: apiEndPoint,
        headers: {
           'Authorization': auth
        },
        qs: queryParameters
      })
  })
  const env = Cypress.env("ENVIRONMENT");
  const {host} = Cypress.env(env);
  const {redirect = "admin/issues/0-5/"} = config;
  const url = `${host}${redirect}`;
  cy.visit(url)
  cy.wait(1000);
  });

  Cypress.Commands.add("launchWebChat", () => {
    let webChatUrl = Cypress.env('webchaturl');
    cy.visit(webChatUrl);
});
