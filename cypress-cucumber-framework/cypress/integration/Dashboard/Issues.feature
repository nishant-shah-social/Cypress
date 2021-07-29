@issueFeature
Feature: Check issues page

      Background:

      @neednewissue @issuespage
      Scenario: Verify that all fields are shown in the Conversation Tab
          When I see issue created on the dashboard
          Then I should be able to click on sidebar toggle to close it
          And I should see fields in Conversation Tab

      @neednewissue @issuespage
      Scenario Outline: Verify that all fields are shown in the metadata Tab
          When I see issue created on the dashboard
          Then I should be able to click on sidebar toggle to close it
          And I should see fields in Metadata Tab for <platform> platform
          Examples:
              |platform|
              |"Web"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can use Reply to send a message to a user
          When I see issue created on the dashboard
          And I should be able to send <message> to user from conversation tab using reply
          And I should be able to see <message> in the conversation window
          Examples:
              |message|
              |"*The* quick _brown_ fox jumps over the lazy [dog](http://www.google.com)."|


      @neednewissue @issuespage
      Scenario Outline: Verify that admin can use Reply & Resolve to resolve an issue
          When I see issue created on the dashboard
          Then I should be able to click on sidebar toggle to close it
          And I should be able to send <message> to user from conversation tab using reply and resolve
          And I should be able to see <message> in the conversation window
          And I should be able see Resolved status in conversation window with timestamp
          Examples:
              |message|
              |"Sending response to user from dashboard for reply and resolve"|

      @neednewissue @issuespage
      Scenario: Verify that admin can assign an issue to himself
          When I see issue created on the dashboard
          Then I should be able to click on sidebar toggle to close it
          And I should be able to assign issue to myself

      @neednewissue @issuespage
      Scenario: Verify that admin can use "/" to Quick Reply to send a message to a user and message shown in conversation window.
          When I see issue created on the dashboard
          Then I should be able to send message using quick reply

      @neednewissue @issuespage
      Scenario: Verify that admin can search Quick Reply to send a message to a user and message shown in conversation window.
          When I see issue created on the dashboard
          Then I should be able to search and send message using quick reply

      @neednewissue @issuespage
      Scenario: Verify that admin can search FAQ to send a message to a user and message shown in conversation window.
          When I see issue created on the dashboard
          Then I should be able to search FAQ and send message


      @neednewissue @issuespage
      Scenario Outline: Verify that admin can send attachments to a user and message shown in conversation window.
            When I see issue created on the dashboard
            Then I should be able to click on sidebar toggle to close it
            And I should be able to attach file with name <filename> and type <extension> and send <message>
            Examples:
                |filename|extension|message|
                |"image.png"|"png"|"Attaching the file for your reference"|
                |"PdfFile.pdf"|"pdf"|"Attaching the file for your reference"|
                |"Spreadsheet.xlsx"|"xlsx"|"Attaching the file for your reference"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can resolve issue by sending attachments to a user and message shown in conversation window.
            When I see issue created on the dashboard
            Then I should be able to click on sidebar toggle to close it
            And I should be able to attach file with name <filename> and type <extension> and send <message> & resolve the issue
            Examples:
                |filename|extension|message|
                |"image.png"|"png"|"Attaching the file for your reference"|
                |"PdfFile.pdf"|"pdf"|"Attaching the file for your reference"|
                |"Spreadsheet.xlsx"|"xlsx"|"Attaching the file for your reference"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can add a private note in the conversation
            When I see issue created on the dashboard
            Then I should be able to click on sidebar toggle to close it
            And I should be able to add a private note with a <message>
            Examples:
                |message|
                |"Adding a private note for testing purpose"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can use “@” to tag a team member in private note
            When I see issue created on the dashboard
            Then I should be able to click on sidebar toggle to close it
            And I should be able to add a private note with and tag team member <team_member> with <message>
            Examples:
                |team_member|message|
                |"Sameer Maral"|"Please have a look at this issue"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can a search and send emoji to a user
            When I see issue created on the dashboard
            Then I should be able to send an <emoji> to a user
            Examples:
                |emoji|
                |"face with"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can search the issue using the issue title
            When I see issue created on the dashboard
            Then I should be able to search the issue using issue title <title>
            And I should be able to see correct number of searched issues contains <title>
            And I should be see <title> in title of each of the issue
            Examples:
                |title|
                |"\"test\""|

      @neednewissue @issuespage
      Scenario Outline: Verify that number of searched issues shown correctly on the dashboard
            When I see issue created on the dashboard
            Then I should be able to search the issue using issue title <title>
            And I should be able to see correct number of searched issues contains <title>
            Examples:
                |title|
                |"\"create\""|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can assign issue from default queue to another queue
            When I see issue created on the dashboard
            Then I should be able to click on sidebar toggle to close it
            And I should click on <header> and assign issue to <assigned>
            Examples:
                |header|assigned|
                |"Queues"|"SamLostAccountQueue"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can assign issue from default to another member
            When I see issue created on the dashboard
            Then I should be able to click on sidebar toggle to close it
            And I should click on <header> and assign issue to <assigned>
            Examples:
                |header|assigned|
                |"Members"|"Sameer Maral"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can reject the issue
          When I see issue created on the dashboard
          Then I should be able to click on sidebar toggle to close it
          And I should be able to send <message> to user from conversation tab using reply
          And I should see be able to click on <option>
          And I should be able to see rejected message for <option>
          Examples:
              |message|option|
              |"this is agent replying to user via dashboard and rejecting this issue "|"Reject"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can mark the issue as duplicate and reject the issue
          When I see issue created on the dashboard
          Then I should be able to click on sidebar toggle to close it
          And I should be able to send <message> to user from conversation tab using reply
          And I should see be able to click on <option>
          And I should be mark the issue as duplicate
          And I should be able to see rejected message for <option>
          Examples:
              |message|option|
              |"this is agent replying to user via dashboard and rejecting this issue "|"Mark as Duplicate and Reject"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can mark the issue as resolved from More option
          When I see issue created on the dashboard
          Then I should be able to click on sidebar toggle to close it
          And I should be able to send <message> to user from conversation tab using reply
          And I should see be able to click on <option>
          And I should be to see CSAT survey modal and click on Resolve button
          And I should be able see Resolved status in conversation window with timestamp
          Examples:
              |message|option|
              |"this is agent replying to user via dashboard and rejecting this issue "|"Resolve"|

       @neednewissue @issuespage
       Scenario Outline: Verify that admin can redact messages and attachments
            When I see issue created on the dashboard
            Then I should be able to click on sidebar toggle to close it
            And I should be able to attach file with name <filename> and type <extension> and send <message>
            And I should be able to send <message> to user from conversation tab using reply
            And I should be able to attach file with name <filename> and type <extension> and send <message>
            And I should be able to attach file with name <filename> and type <extension> and send <message>
            And I should be able to send <message> to user from conversation tab using reply
            And I should be able to send <message> to user from conversation tab using reply
            And I should be able to send <message> to user from conversation tab using reply
            And I should be able to attach file with name <filename> and type <extension> and send <message>
            And I should be able to attach file with name <filename> and type <extension> and send <message>
            And I should see be able to click on <option>
            And I should be able to Redact first <count> messages and tag a team member <team_member> and add a private note <note>
            Examples:
                |filename|extension|message|option|count|team_member|note|
                |"image.png"|"png"|"Attaching the file for your reference"|"Messages and Attachments Redaction"|"1"|"Sameer Maral"|"Tagging you in this issue"|
                |"image.png"|"png"|"Attaching the file for your reference"|"Messages and Attachments Redaction"|"7"|"Sameer Maral"|"Tagging you in this issue"|
                |"image.png"|"png"|"Attaching the file for your reference"|"Messages and Attachments Redaction"|"All"|"Sameer Maral"|"Tagging you in this issue"|

       @neednewissue @issuespage
       Scenario Outline: Verify that admin can redact all messages and attachments and shown in the logs
            When I see issue created on the dashboard
            Then I should be able to click on sidebar toggle to close it
            And I should be able to send <message> to user from conversation tab using reply
            And I should be able to attach file with name <filename> and type <extension> and send <message>
            And I should see be able to click on <option>
            And I should be able to redact all messages and attachments from conversation and see the count in the logs
            Examples:
                |filename|extension|message|option|
                |"image.png"|"png"|"Attaching the file for your reference"|"Messages and Attachments Redaction"|

      @neednewissue @issuespage
      Scenario: Verify that all fields are shown when issue opened using permanent link
          When I see issue created on the dashboard
          Then I should see be able to open issue using issue permanent link
          And I should be able to see all the fields

      @neednewissue @issuespage
      Scenario Outline: Verify that admin is able to nagivate to Issue list
          When I see issue created on the dashboard
          Then I should see be able to open issue using issue permanent link
          And I should be able to send <message> to user from conversation tab using reply
          And I should be able to return to issues list in the dashboard
          Examples:
              |message|
              |"this is agent replying to user via dashboard and returnds to dashboard"|

      @neednewissue @issuespage
      Scenario Outline: Verify that admin can send a message to user when issue is opened using permanent link
          When I see issue created on the dashboard
          Then I should see be able to open issue using issue permanent link
          And I should be able to send <message> to user from conversation tab using reply
          And I should be able to see <message> in the conversation window
          Examples:
              |message|
              |"this is agent replying to user via dashboard"|