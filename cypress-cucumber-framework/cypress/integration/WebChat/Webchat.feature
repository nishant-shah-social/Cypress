@webchatFeature
Feature: Report an Issue using webchat

      As a user of the  Application
      I want to use web chat from contact us page
      so that I can submit issue for resolution

      Background:

          Given I am on the application support page

    @webchat
    Scenario: Verify that user can see the title of the chat widget
          When I open Web chat
          Then I should see title of the widget as 'Infinitelybeta Support'

    @webchat
    Scenario: Verify that event request data is captured successfuuly in a file.
          When I open Web chat
          Then Events route request sent to API server
          Then I verify the data sent in the request

    @ignore
    Scenario Outline: Verify that user can open the web chat widget and attach a file
          When I open Web chat
          When I type in <query> and sends issue description
          And I attach screen shot in the chat
          Then I should see <query> and image in the chat window
          Examples:
              |query|
              | "Can you please let me know the process to request a refund??"|
    @ignore
    Scenario Outline: Verify that user can send style text
          When I open Web chat
          When I type in <query> and sends issue description
          Then I should see <query> and image in the chat window
          Examples:
              |query|
              |"The quick brown fox jumps over the lazy dog."|
              |"*The* quick _brown_ fox jumps over the lazy [dog](http://www.google.com)."|
              |"_The *quick brown* fox_ jumps over the lazy dog."|
              |"_The quick *brown [fox](https://www.youtube.com) jumps* over the lazy dog_"|
              |"_The quick *brown [fox*](https://www.google.com) jumps over the lazy dog_"|




