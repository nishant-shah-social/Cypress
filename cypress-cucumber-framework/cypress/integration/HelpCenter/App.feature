@HelpCenter @App
Feature: Features around App page of Help Center 2.0

      Background:

          Given I am on the Help Center 2.0

    Scenario: Verify user is able to see all the faq sections for an app
          When I select the app "testapp" from the app dropdown
          And I select the platform "Web" from the platform dropdown
          And I scroll to "Select a Category" title
          Then I should see correct list of FAQ sections under Select a Category title

   