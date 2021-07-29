
/**
* These are the steps created to test Issues Page
* @author Sameer Maral <sameer.maral@helpshift.com>
* @created Apr 13, 2020
*/

/// <reference types ="Cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import {issuePage} from "../../../pageobjects/issue.page.js"
import {adminPage} from "../../../pageobjects/admin.page.js"

const IN_APP_URL_ISSUENUMBER_REGEX = /\/admin\/issues\/[0-5]+/;

// @TODO - Check the UI depending on the role: Agent, admin, supervisor
// Currently we are testing only for admin role

let dupissueNumber;
let countAttachmentsNumber;
let countcheckboxnumber;
let countcheckboxcheckednumber;
let countBuildNumber;
let storedUserId;


Then('I should be able to click on sidebar toggle to close it', () =>{
    // Clicks on the Sidebar toggle
    issuePage.issueSidebarToggle.click()
})


Then ('I should see fields in Conversation Tab', () => {

    //Check if username field is visible
    issuePage.issueUserName.should('be.visible');
    //Check if useremail field is visible
    issuePage.issueUserEmail.should('be.visible');
    //Check if queue field is visible
    issuePage.issueQueueName.should('be.visible');
    //Check if Tags field is visible
    issuePage.issueTags.should('be.visible');
    //Check if TextArea field is visible
    //and have a placeholder
    issuePage.issueTextArea.should('be.visible')
        .should('have.attr', 'placeholder', 'Enter your reply or type \"\/\" to insert a quick reply');
    //Check if Quick Reply field is visible
    issuePage.issueQuickReply.should('be.visible');
    //Check if FAQ field is visible
    issuePage.issueFAQ.should('be.visible');
    //Check if Attachment field is visible
    issuePage.issueAttachmentFooter.should('be.visible');
    //Check if Emoji field is visible
    issuePage.issueEmoji.should('be.visible');
    //Check if TextDirection field is visible
    issuePage.issueTextDirection.should('be.visible');
    //Check if Assign to me button is visible
    issuePage.issueAssignToMe.should('be.visible');
    //Check if Note button is visible
    issuePage.issueNote.should('be.visible');
    //Check if Show Logs button is visible
    issuePage.issueShowLogs.should('be.visible');
    //Check if More options button is visible
    issuePage.issueMoreOption.should('be.visible');

    });

    Then('I should see fields in Metadata Tab for {string} platform', (platform) => {

        // Clik on Metadat tab
        issuePage.metadataTab.click();
        //Check if title field is visible
        issuePage.issueTitleMetaDataTab.should('be.visible');
        //Check if issue details field is visible
        issuePage.issueInfoDetail.should('be.visible');
        issuePage.issueInfoDetail.should('contain.text', 'Reported via Helpshift API')
        //Check if Platform Icon field is visible
        issuePage.issueInfoPlatformIcon.should('be.visible');
        //Check if Deviceos field is visible
        issuePage.issueInfoDeviceOS.should('be.visible')
        issuePage.issueInfoDeviceOS.should('have.text', platform)
        //Check if Language field is visible
        issuePage.issueLanguage.should('be.visible');
        issuePage.issueLanguage.should('have.text', 'English')
        //Check if queue field is visible
        issuePage.issueQueueNameMetaDataTab.should('be.visible');
        issuePage.issueQueueNameMetaDataTab.should('have.text', 'DefaultQueue')
        //Check if user avatar field is visible
        issuePage.issueUserAvatarMetaDataTab.should('be.visible');
        //Check if user name field is visible
        issuePage.issueUserNameMetaDataTab.should('be.visible');
        //Check if user email field is visible
        issuePage.issueUserEmailMetaDataTab.should('be.visible');
        //Check if update info button is visible
        //issuePage.issueUserUpdateButton.should('be.visible');
        //issuePage.issueUserUpdateButton.should('have.text','UPDATE INFO')
        issuePage.issueCutomDataTitle.eq(0).should('have.text', 'Custom Data')
        issuePage.issueMetaDataTableRow.eq(0).should('contain', 'Platform').should('contain', 'Web')
        issuePage.issueCutomDataTitle.eq(1).should('have.text', 'Other')
        issuePage.issueMetaDataTableRow.eq(1).should('contain', 'Language').should('contain', 'English')

    });

Then ('I should be able to send {string} to user from conversation tab using reply', (message) => {

    //Admin types a message
    //TODO: Write wrapper methods reusable Methods in issue.page.js
    issuePage.issueTextArea.type(message);
    issuePage.issueReply.should('be.visible').and('have.text', 'Reply')
    issuePage.issueReply.click();

});

Then ('I should be able to send {string} to user from conversation tab using reply and resolve', (message) => {

    issuePage.issueTextArea.type(message);
    issuePage.issueReplyResolve.should('be.visible').and('have.text', 'Reply & Resolve')
    issuePage.issueReplyResolve.click();
    issuePage.issueResolveModal.should('be.visible')
    issuePage.issueReolvedModatResolveButton.should('be.visible').and('have.text', 'Resolve')
    issuePage.issueReolvedModatResolveButton.click();
    cy.wait(500);

});

Then('I should be able to see {string} in the conversation window', (message) =>{

    issuePage.issueListItem.first().click({force: true})
    issuePage.issueConversation.as('conversation');
    cy.get('@conversation').should('contain.text', message);


});

Then('I should be able see Resolved status in conversation window with timestamp', () =>{

    cy.wait(500);
    issuePage.issueDisplayedStatus.should('be.visible');
    issuePage.issueStatusTitle.should('have.css', 'color').and('eq', 'rgb(46, 153, 82)');
    issuePage.issueStatusTitle.should('have.text', 'Resolved');
    issuePage.issueStatusTick.should('be.visible');
    issuePage.issueStatusDate.should('be.visible');

});

Then('I should be able to assign issue to myself', () => {

        issuePage.issueAssignToMe.should('have.text', 'Assign to me')
        issuePage.issueAssignToMe.click();
        issuePage.userName.then(($user) => {
        const username = $user.text()
        issuePage.issueAssigned.should('have.text', username);
        issuePage.issueShowLogs.should('have.text', 'Show Logs')
        issuePage.issueShowLogs.click({force:true});
        cy.wait(2000)
        //issuePage.issueHideFaq.click({force:true})
        issuePage.issueShowLogsRefresh.click({force:true});
        cy.wait(2000)
        let message = username+" changed assignee from Unassigned to "+username

        issuePage.issueMessageBody
        .should(($p) => {
            // return an array of texts from all of the p's
            let texts = $p.map((i, el) => // https://on.cypress.io/$
            Cypress.$(el).text())

            // jquery map returns jquery object
            // and .get() convert this to simple array
            texts = texts.get()
            expect(texts[(texts.length-1)]).to.deep.eq(message)
        })

      })

});

Then ('I should be able to send message using quick reply', () => {

    issuePage.issueTextArea.type('/');
    issuePage.quickSearchItem.click({ multiple: true, force: true});
    issuePage.issueTextArea.then(($text) => {
    const quickreply = $text.text();
    issuePage.issueReply.click();
    issuePage.issueConversation.as('conversation');
    cy.get('@conversation').should('contain.text', quickreply);

     });

});

Then('I should be able to search and send message using quick reply', () => {

    issuePage.issueQuickReply.click();
    issuePage.issuePageQuickReplySerachBox.type('Order');
    issuePage.issuePageQuickReplySearchResult.first().click();
    issuePage.issueTextArea.then(($text) => {
        const quickreply = $text.text();
        issuePage.issueReply.click();
        issuePage.issueConversation.as('conversation');
        cy.get('@conversation').should('contain.text', quickreply);
       });
});

Then('I should be able to search FAQ and send message', () =>{
    issuePage.issueFAQ.click();
    issuePage.issueFaqSearch.type('Hello Test');
    cy.wait(3000);
    issuePage.issueFaqResult.first().click();
    issuePage.issueTextArea.then(($text) => {
        const faqtext = $text.text();
        issuePage.issueReply.click();
       issuePage.issueConversation.as('conversation');
       cy.get('@conversation').should('contain.text', faqtext);

       });
})


Then('I should be able to attach file with name {string} and type {string} and send {string}',(filename, extension, message) => {

    cy.wait(2000);
    issuePage.issueAttachment.attachFile(filename, {force: true });
    issuePage.issueReply.should('have.class', 'hs-button--disabled');
    issuePage.issueTextArea.type(message);
    issuePage.issueReply.should('not.have.class', 'hs-button--disabled');
    issuePage.issueReply.click();
    cy.wait(2000);
    if (extension === "png" || extension === "jpeg")
    {
        issuePage.issueUploadedImageFile.each(($el, $list)=>{
            cy.wrap($el).should('have.class', 'avatar')
            cy.wrap($el).should('have.attr', 'title', filename)
            cy.wrap($el).should('have.attr', 'src')
        issuePage.issueAttachMentsTitle.should('contain.text', 'Attachment')

        })
    }
    else
    {
        issuePage.issueUploadOtherFile.each(($el, $list)=>{
            cy.wrap($el).should('have.class', 'hs-msg__attachment-name')
            cy.wrap($el).should('have.text', filename)
        issuePage.issueAttachMentsTitle.should('contain.text', 'Attachment')
        })
    }

    issuePage.issueAttachMentsTitle.then(($count)=>{
        let countAttachments = $count.length
        countAttachmentsNumber = countAttachments
        cy.log('Number of attachments are' + countAttachments)
    })

});


Then('I should be able to attach file with name {string} and type {string} and send {string} & resolve the issue',(filename, extension, message) => {

    cy.wait(2000);
    issuePage.issueAttachment.attachFile(filename, {force: true});
    issuePage.issueReplyResolve.should('have.class', 'hs-button--disabled');
    issuePage.issueTextArea.type(message);
    issuePage.issueReplyResolve.should('not.have.class', 'hs-button--disabled');

    issuePage.issueReplyResolve.click();
    issuePage.issueReolvedModatResolveButton.click();
    cy.wait(2000);

    if (extension === 'png' || extension === 'jpeg')
    {
        issuePage.issueUploadedImageFile.each(($el, $list)=>{
            cy.wrap($el).should('have.class', 'avatar')
            cy.wrap($el).should('have.attr', 'title', filename)
            cy.wrap($el).should('have.attr', 'src')
        issuePage.issueAttachMentsTitle.should('contain.text', 'Attachment')

        })

    }

    else
    {
        issuePage.issueUploadOtherFile.each(($el, $list)=>{

            cy.wrap($el).should('have.class', 'hs-msg__attachment-name')
            cy.wrap($el).should('have.text', filename)
        issuePage.issueAttachMentsTitle.should('contain.text', 'Attachment')
        })
    }

    issuePage.issueAttachMentsTitle.then(($count)=>{
        let countAttachments = $count.length
        cy.log('Number of attachments are' + countAttachments)
    })

    issuePage.issueDisplayedStatus.should('be.visible');
    issuePage.issueStatusTitle.should('have.css', 'color').and('eq', 'rgb(46, 153, 82)');
    issuePage.issueStatusTitle.should('have.text', 'Resolved');
    issuePage.issueStatusTick.should('be.visible');
    issuePage.issueStatusDate.should('be.visible');

});


Then ('I should be able to add a private note with a {string}', (message) => {


    issuePage.issueNote.click();
    issuePage.privateNoteTitle.should('have.text', 'Private Note')
    issuePage.issueNoteTextArea.should('be.visible').should('have.attr', 'placeholder', 'Enter your note');
    issuePage.issueNoteInfoText.should('have.text', '@mention people to notify them')
    issuePage.issueNoteSendButton.should('have.class', 'hs-button--disabled')
    issuePage.issueNoteCancelButton.should('not.have.class', 'hs-button--disabled')
    issuePage.issueNoteTextArea.type(message);
    issuePage.issueNoteSendButton.should('not.have.class', 'hs-button--disabled')
    issuePage.issueNoteSendButton.click();
    cy.wait(500);
    issuePage.issueConversation.as('conversation');
    cy.get('@conversation').should('contain.text', message);
    cy.wait(500)
    issuePage.issueAddedNotes.first().should('be.visible')
    issuePage.issueAddedNotes.first().should('have.css', 'background-color').and('eq', 'rgb(255, 245, 224)');
    issuePage.issueAddedNotes.first().should('have.css', 'border-color').and('eq', 'rgb(255, 200, 89)');

});

Then ('I should be able to add a private note with and tag team member {string} with {string}', (team_member, message) => {


    issuePage.issueNote.click();
    issuePage.issueNoteTextArea.type('@'+team_member)
    cy.wait(200)
    issuePage.issueMentionList.should('be.visible')
    issuePage.issueMentionUser.first().click();
    issuePage.issueNoteTextArea.type(message);
    issuePage.issueNoteSendButton.click();
    issuePage.issueConversation.as('conversation');
     cy.get('@conversation').should('contain.text', team_member+" "+message);


});

Then('I should be able to send an {string} to a user', (emojiDescription) => {

    issuePage.issueEmoji.click();
    issuePage.issueEmojiWidget.should('be.visible');
    issuePage.issueEmojiSerach.type(emojiDescription)
    let genArr = Array.from({length:1},(v,k)=>k+1)
    cy.wrap(genArr).each(() => {
        issuePage.emojiClass.click({ multiple: true, force: true})
        issuePage.issueEmoji.click();
    })
    issuePage.issueReply.click();
    issuePage.issueTextArea.then(($text) => {
        const emojis = $text.text();
       issuePage.issueConversation.as('conversation');
      cy.get('@conversation').should('contain.text', emojis);

       });

});

Then ('I should see be able to open issue using issue permanent link', () => {

    issuePage.issueLink.should('be.visible');
    issuePage.issueLink.then(($issueNumber) => {
        let issueNo = $issueNumber.text().replace('#','');
        issuePage.issueLink.click()
        cy.url().should('include', 'admin/issue/'+issueNo+'/');
        issuePage.issueInfoNumber.should('contain.text', issueNo);
    })

})


Then ('I should be able to see all the fields', () => {

    issuePage.issueInfoUsertab.should('be.visible');
    issuePage.issueInfoCIFTab.should('be.visible')
    issuePage.issueInfoMetadataTab.should('be.visible')
    issuePage.backToIssuesLink.should('be.visible');
    issuePage.issueInfoTitle.should('be.visible');
    issuePage.issueInfoDetail.should('be.visible');
    issuePage.issueInfoPlatformIcon.should('be.visible');
    issuePage.issueInfoDeviceOS.should('be.visible');
    issuePage.issueInfoQueueName.should('be.visible');
    issuePage.issueInfoDefaultQueueLabel.should('have.text', 'Queue');
    issuePage.issueInfoUserName.should('be.visible');
    issuePage.issueInfoEmaiL.should('be.visible');
    //issuePage.issueInfoUpdateButton.should('be.visible');
    issuePage.issueInfoOtherIssue.should('be.visible');
    issuePage.issueInfoTags.should('be.visible');
    issuePage.issueTextArea.should('be.visible').should('have.attr', 'placeholder', 'Enter your reply or type \"\/\" to insert a quick reply');
    issuePage.issueQuickReply.should('be.visible');
    issuePage.issueFAQ.should('be.visible');
    issuePage.issueAttachmentFooter.should('be.visible');
    issuePage.issueEmoji.should('be.visible');
    issuePage.issueTextDirection.should('be.visible');
    issuePage.issueAssignToMe.should('be.visible');
    issuePage.issueNote.should('be.visible');
    issuePage.issueShowLogs.should('be.visible');
    issuePage.issueMoreOption.should('be.visible');
});

Then('I should be able to return to issues list in the dashboard', () => {

    issuePage.backToIssuesLink.click();
    cy.location().should((loc) => {
        const result = IN_APP_URL_ISSUENUMBER_REGEX.test(loc.pathname)
        expect(result).to.equal(true);
      });
   // cy.url().should('eq', Cypress.config().baseUrl+'admin/issues/0-5/');

})

Then('I should be able to search the issue using issue title {string}',(title) =>{

    issuePage.issueSearchBox.should('be.visible')
    cy.wait(1000)
    issuePage.issueSearchBox.type('title:')
    cy.wait(1000)
    issuePage.issueSearchBox.type('contains:')
    cy.wait(1000)
    issuePage.issueSearchBox.type(title);
    issuePage.issueSearchSubmit.click();
    cy.wait(2000);

})

Then('I should be see {string} in title of each of the issue', (title) =>{

    const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
    let finalTitle = title.replace(/\"/g, "")
    issuePage.issueTitle
    .should(($p) => {
        let texts = $p.map((i, el) =>
        Cypress.$(el).text())
        texts = texts.get()
        for(let i=0; i<texts.length; i++)
        {
            expect(normalizeText(texts[i])).to.contain(normalizeText(finalTitle))
        }
    })
})


Then ('I should be able to see correct number of searched issues contains {string}', () =>{
    //catch around less than 51
        let numberOfChildren = 51
        issuePage.issueSearchedCount.then(($count) => {
            const total = $count.text().replace(' Issues', '')
            let loopcount = Math.round((total-numberOfChildren)/24) + 1
            for (let i = 1; i <= loopcount; i++) {

                issuePage.issueContentBody.scrollTo('bottom')
                    .wait(2000)
                    .then(() => numberOfChildren += 24)
                 }
        })
        issuePage.issueList.children().then(($el) =>{
            issuePage.issueSearchedCount.should('have.text', Cypress.$($el).length+" Issues")
        })
})


Then('I should click on {string} and assign issue to {string}', (header, assigned) =>{

    issuePage.issueAssigned.click();
    issuePage.issueAssigned.should('have.text', 'Default')
    issuePage.issueAssignHeaderTabs.should('contain.text', 'Queues')
    issuePage.issueAssignHeaderTabs.should('contain.text', 'Members')
    issuePage.issueAssignHeaderTabs.contains(header).click();
    issuePage.issueAssignSearch.type(assigned).type('{enter}');
    issuePage.issueAssigned.should('have.text', assigned)
    if ( header === 'Queues')
    {
    issuePage.issueQueueName.should('have.text',assigned)
    }
});

Then('I should see be able to click on {string}', (option) =>{

    issuePage.issueLink.as('issueNumber')
    issuePage.issueMoreOption.should('be.visible').and('have.class', 'hs-issue-footer__more-options')
    issuePage.issueMoreOption.click()
    issuePage.issueMoreOptionList.contains(option).click()

})

Then('I should be able to see rejected message for {string}', (option) => {


    issuePage.issueDisplayedStatus.should('have.css', 'background-color').and('eq', 'rgb(87, 96, 102)');
    issuePage.issueStatusTitle.should('have.text', 'Rejected');
    issuePage.issueStatusTick.should('be.visible');
    issuePage.issueStatusDate.should('be.visible');
    if (option ===  'Mark as Duplicate and Reject')
    {
        issuePage.issueConversation.as('conversation');
    cy.get('@conversation').should('contain.text', dupissueNumber);
    }

})


Then('I should be mark the issue as duplicate', () =>{


    issuePage.issueDuplicateRejectTitle.should('be.visible').and('have.text', 'Mark as Duplicate and Reject');
    issuePage.issueDuplicateClose.should('be.visible');
    issuePage.issuesStepIndicatorNumber.should('be.visible').and('contain.text', '1')
    issuePage.issuesStepIndicatorNumber.should('have.css', 'background-color').and('eq', 'rgb(61, 128, 204)');
    issuePage.issueStepIndicator.should('contain.text', 'Select Original Issue')
    issuePage.issueStepIndicator.should('contain.text', 'of the user')
    issuePage.issueStepIndicator.should('contain.text', 'Confirm Duplicate Issue')
    issuePage.issueStepIndicator.should('contain.text', 'and optionally send a message')
    issuePage.issueDuplicateNumber.then(($issueNumber) => {
        let duplicateissueNumber = $issueNumber.text().replace('Issue ', '')
        cy.get('@issueNumber').should('contain.text', duplicateissueNumber)
    })
    issuePage.issueDuplicateTitleH4.should('be.visible').and('contain.text', 'Duplicate Issue being Rejected');
    issuePage.issueDuplicateDescription.should('be.visible').and('contain.text', 'This Issue will be marked as duplicate of the selected original Issue and will be rejected.');
    issuePage.issueRejectedText.should('be.visible').and('have.text', 'Will Be Rejected')
    issuePage.otherIssuesHeader.should('be.visible').and('have.text', 'Select Original Issue')
    issuePage.otherIssuesDescription.should('be.visible').and('contain.text', 'Select the user\'s original Issue that is similar to the duplicate Issue and on which they would receive help. The selected original Issue will not be affected.')
    issuePage.otherIssuesList.should('be.visible')
    issuePage.otherIssuesList.children().first().then(($duplicateissueNumber)=>{
          let dupissueNo = $duplicateissueNumber.text().substr(0, 5)
          dupissueNumber = dupissueNo;
        })
    issuePage.otherIssuesList.children().first().click()
    issuePage.nextButton.should('be.visible').and('have.text', 'Next')
    issuePage.nextButton.click();
    issuePage.issuesStepIndicatorNumber.should('have.class', 'ion-tick')
    issuePage.issuesStepIndicatorNumber.should('have.css', 'background-color').and('eq', 'rgb(255, 255, 255)');
    issuePage.issuesStepIndicatorNumber.should('be.visible').and('contain.text', '2')
    issuePage.issueReplyBox.should('be.visible')
    issuePage.issueCallOutDescription.should('be.visible')
    issuePage.issueCallOutDescription.then(($description) =>{
       issuePage.issueCallOutDescription.should('contain.text', 'This Issue is being marked as a duplicate of Issue ' + dupissueNumber)

    })
    issuePage.issueReplyTextHeader.should('be.visible').and('contain.text', 'Reply to user before rejecting the Issue (Optional)')
    issuePage.issueReplyInfoHeader.should('be.visible').and('contain.text', 'Insert User and Issue Info')
    issuePage.issueReplyTextArea.should('be.visible')
    issuePage.issueReplyTextArea.then(($text) => {
        const emailtext = $text.text();
        issuePage.issueReplyTextArea.should('contain.text', dupissueNumber)
            });
    issuePage.issueReplyFAQ.should('be.visible')
    issuePage.issueReplyTextDirection.should('be.visible')
    issuePage.issueReplyCleatTextButton.should('be.visible')
    issuePage.issueCalloutIcon.should('be.visible')
    issuePage.issueFooterCallOutDescription.should('be.visible')
    issuePage.issueFooterCallOutDescription.should('be.visible').and('have.text', 'Once the Issue is marked as duplicate and rejected, it can\'t be re-opened.')
    issuePage.issueDuplicatePreviousButton.should('be.visible').and('have.text', 'Previous')
    issuePage.issueMarkDuplicateButton.should('be.visible').and('have.text', 'Mark as Duplicate and Reject')
    issuePage.issueMarkDuplicateButton.click()

});

Then('I should be to see CSAT survey modal and click on Resolve button', ()=>{
    issuePage.issueResolveModal.should('be.visible')
    issuePage.issueReolvedModatTitle.should('have.text', 'Customer Satisfaction Survey')
    issuePage.issueResolveModalStarIcon.should('be.visible').and('have.class', 'icon')
    issuePage.issueResolveModalDescrption.should('contain.text', 'You are about to resolve this issue.')
    issuePage.issueResolveModalDescrption.should('contain.text', 'As part of your company policy, a satisfaction rating request will be sent to the customer when this issue is resolved.')
    //issuePage.issueResolveModalCheckBox.should('be.visible');
    issuePage.issueResolveModalCheckBoxDescription.should('be.visible').and('have.text', 'Don\'t show this again');
    issuePage.issueReolvedModatCancelButton.should('be.visible').and('have.text', 'Cancel')
    issuePage.issueReolvedModatResolveButton.should('be.visible').and('have.text', 'Resolve')
    issuePage.issueReolvedModatResolveButton.click();
});

Then('I should be able to Redact first {string} messages and tag a team member {string} and add a private note {string}', (count, team_member, message) =>{


    issuePage.issueRedactButton.should('be.disabled')
    issuePage.issueRedactMessageCheckBox.then(($list)=>{
        let countcheckbox = $list.length
        countcheckboxnumber = countcheckbox
        cy.log(countcheckboxnumber)
    })

    issuePage.issueRedactMessageCount.should('contain.text', '0 Messages')
    issuePage.issueRedactAttachmentCount.should('contain.text', '0 Attachments')
    issuePage.issueRedactFooterNote.should('contain.text', '0 Messages & 0 Attachments Selected for Redaction')

    if (count === 'All')
    {
        issuePage.issueRedactMessageCheckBox.click({multiple: true, force: true});
        issuePage.issueRedactMessageCount.should('contain.text', 'All Messages')
        issuePage.issueRedactAttachmentCount.should('contain.text', 'All Attachments')
        issuePage.issueRedactFooterNote.should('contain.text', 'Selected for Redaction')
        issuePage.issueRedactButton.should('not.be.disabled').and('have.text', 'Redact')
        issuePage.issueRedactButton.click()
        issuePage.issueRedactModalConfirmationBox.should('be.visible')
        issuePage.issueRedactModalCloseButton.should('be.visible')
        issuePage.issueRedactionModalTitle.should('be.visible').and('have.text', 'Warning!')
        issuePage.issueRedactModalDescription.should('be.visible')
        issuePage.issueRedactModalDescription.should('contain.text', 'All messages and attachments selected for redaction. You cannot undo this action. Are you sure you want to redact?')
        issuePage.issueRedactModalPrivateNoteTitle.should('be.visible').and('contain.text', 'Specify reason for redacting messages (Optional)')
        issuePage.issueRedactModalPrivateNoteWrapperHeading.should('be.visible').and('contain.text', 'Add Private Note');
        issuePage.issueRedactModalPrivateNoteDescription.should('be.visible').and('contain.text', '@Mention people to notify them');
        issuePage.issueRedactModalPrivateNoteTextArea.should('be.visible')
        issuePage.issueRedactModalPrivateNoteTextArea.type('@')
        issuePage.issueMentionList.should('be.visible')
        issuePage.issueRedactModalPrivateNoteTextArea.clear()
        cy.wait(1000)
        issuePage.issueRedactModalPrivateNoteTextArea.type('@')
        issuePage.issueRedactModalPrivateNoteTextArea.type(team_member)
        cy.wait(200)
        issuePage.issueMentionUser.first().click();
        issuePage.issueRedactModalCancelButton.should('be.visible').and('have.text', 'Cancel')
        issuePage.issueRedactModalRedactButton.should('be.visible').and('have.text', 'Redact')
        issuePage.issueRedactModalPrivateNoteTextArea.type(message)
        issuePage.issueRedactModalRedactButton.click();

    }

    else {
        for (let i = 0; i<parseInt(count); i++)
        {
            issuePage.issueRedactMessageCheckBox.eq(i).click({force: true});


        }
        issuePage.issueRedactMessageChecked.then(($list)=>{
            let countcheckboxchecked = $list.length
            countcheckboxcheckednumber = countcheckboxchecked
            cy.log('countcheckboxcheckednumber is '+countcheckboxcheckednumber)

                issuePage.issueAttachMentsTitle.then(($count)=>{

                    let countAttachments = $count.length
                    countAttachmentsNumber = parseInt(countAttachments)
                })


            issuePage.issueRemainingAttachments.then(($list) => {
                let countRemainingAttachment = $list.length
                cy.log('countRemainingAttachmentNumber is '+ countRemainingAttachment)

            if (countcheckboxcheckednumber == 1 )
            {

                if (countAttachmentsNumber == 1 )

                    {
                    cy.wait(200)
                    let selectedImageCount = countAttachmentsNumber - countRemainingAttachment
                    cy.log('selectedImage count is '+selectedImageCount)
                        if (selectedImageCount == 0)
                        {
                        issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Message')
                        issuePage.issueRedactAttachmentCount.should('contain.text', selectedImageCount+' Attachments')
                        }
                        else if(selectedImageCount == 1)
                        {
                        issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Message')
                        issuePage.issueRedactAttachmentCount.should('contain.text', selectedImageCount+' Attachment')
                        }
                        else {
                        issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Messages')
                        issuePage.issueRedactAttachmentCount.should('contain.text', selectedImageCount+' Attachment')
                        }

                }

                else{
                    issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Message')
                    issuePage.issueRedactAttachmentCount.should('contain.text', '0 Attachments')
                }

            }
            else if (countcheckboxcheckednumber > 1 && countcheckboxcheckednumber == parseInt(count))
            {

                if (countAttachmentsNumber == 1)
                {
                    cy.wait(2000)
                    let selectedImageCount = countAttachmentsNumber - 0
                    cy.log('selectedImage count is '+selectedImageCount)
                        if (selectedImageCount > 1)
                        {
                        issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Messages')
                        issuePage.issueRedactAttachmentCount.should('contain.text', selectedImageCount+' Attachments')
                        }
                        else {
                            issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Messages')
                        issuePage.issueRedactAttachmentCount.should('contain.text', selectedImageCount+' Attachment')
                        }
                }

                else if (countAttachmentsNumber == parseInt(count))

                {
                    issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Messages')
                    issuePage.issueRedactAttachmentCount.should('contain.text', countAttachmentsNumber+' Attachments')
                }
                else (countAttachmentsNumber < parseInt(count))
                {
                    let selectedImageCount = (countAttachmentsNumber) - (countRemainingAttachment)
                    cy.wait(2000)

                        if (selectedImageCount > 1)
                        {
                        issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Messages')
                        issuePage.issueRedactAttachmentCount.should('contain.text', selectedImageCount+' Attachments')
                        }
                        else
                        {
                        issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Messages')
                        issuePage.issueRedactAttachmentCount.should('contain.text', selectedImageCount+' Attachment')
                        }
                }


            }

            issuePage.issueRedactFooterNote.should('contain.text', 'Selected for Redaction')
            issuePage.issueRedactButton.should('not.be.disabled').and('have.text', 'Redact')
            issuePage.issueRedactButton.click()
            issuePage.issueRedactModalConfirmationBox.should('be.visible')
            issuePage.issueRedactModalCloseButton.should('be.visible')
            issuePage.issueRedactionModalTitle.should('be.visible').and('have.text', 'Warning!')
            issuePage.issueRedactModalDescription.should('be.visible')

        if (countcheckboxcheckednumber == 1 )
            {

                if (countAttachmentsNumber == 1)

                    {

                    cy.wait(2000)
                    let selectedImageCount = countAttachmentsNumber - countRemainingAttachment
                    cy.log('selectedImage count is '+selectedImageCount)

                        if (selectedImageCount == 0)
                        {
                        issuePage.issueRedactModalDescription.should('contain.text', countcheckboxcheckednumber+' message  selected for redaction. You cannot undo this action. Are you sure you want to redact?')

                        }
                        else
                        {
                        issuePage.issueRedactModalDescription.should('contain.text', countcheckboxcheckednumber+' message and '+countAttachmentsNumber+' attachment selected for redaction. You cannot undo this action. Are you sure you want to redact?')
                    }

                }

            }

        else if (countcheckboxcheckednumber > 1 && countcheckboxcheckednumber == parseInt(count))
            {
                if (countAttachmentsNumber == 1)
                {
                    cy.wait(2000)
                    let selectedImageCount = countAttachmentsNumber - 0
                    cy.log('selectedImage count is '+selectedImageCount)
                        if (selectedImageCount > 1)
                        {
                        issuePage.issueRedactModalDescription.should('contain.text', countcheckboxcheckednumber+' messages and '+selectedImageCount+' attachments selected for redaction. You cannot undo this action. Are you sure you want to redact?')

                        }
                        else
                        {
                            issuePage.issueRedactMessageCount.should('contain.text', countcheckboxcheckednumber+' Messages')
                        issuePage.issueRedactAttachmentCount.should('contain.text', selectedImageCount+' Attachment')
                        }
                }

                else if (countAttachmentsNumber == parseInt(count))

                    {
                    issuePage.issueRedactModalDescription.should('contain.text', countcheckboxcheckednumber+' messages and '+countAttachmentsNumber+' attachments selected for redaction. You cannot undo this action. Are you sure you want to redact?')

                    }

                else (countAttachmentsNumber < parseInt(count))
                    {
                    let selectedImageCount = (countAttachmentsNumber) - (countRemainingAttachment)
                    cy.wait(2000)

                        if (selectedImageCount > 1)
                        {
                        issuePage.issueRedactModalDescription.should('contain.text', countcheckboxcheckednumber+' messages and '+selectedImageCount+' attachments selected for redaction. You cannot undo this action. Are you sure you want to redact?')

                        }
                        else
                        {
                        issuePage.issueRedactModalDescription.should('contain.text', countcheckboxcheckednumber+' messages and '+selectedImageCount+' attachment selected for redaction. You cannot undo this action. Are you sure you want to redact?')
                        }
                }


            }


        issuePage.issueRedactModalPrivateNoteTitle.should('be.visible').and('contain.text', 'Specify reason for redacting messages (Optional)')
        issuePage.issueRedactModalPrivateNoteWrapperHeading.should('be.visible').and('contain.text', 'Add Private Note');
        issuePage.issueRedactModalPrivateNoteDescription.should('be.visible').and('contain.text', '@Mention people to notify them');
        issuePage.issueRedactModalPrivateNoteTextArea.should('be.visible')
        issuePage.issueRedactModalPrivateNoteTextArea.type('@')
        issuePage.issueMentionList.should('be.visible')
        issuePage.issueRedactModalPrivateNoteTextArea.clear()
        cy.wait(1000)
        issuePage.issueRedactModalPrivateNoteTextArea.type('@')
        issuePage.issueRedactModalPrivateNoteTextArea.type(team_member)
        cy.wait(200)
        issuePage.issueMentionUser.first().click();
        issuePage.issueRedactModalCancelButton.should('be.visible').and('have.text', 'Cancel')
        issuePage.issueRedactModalRedactButton.should('be.visible').and('have.text', 'Redact')
        issuePage.issueRedactModalPrivateNoteTextArea.type(message)
        issuePage.issueRedactModalRedactButton.click();

    })

    })

}


    cy.wait(2000)
    if (count === 'All')
    {
        issuePage.issueRedactedMessageText.each(($el)=>{
        cy.wrap($el).should('contain.text','[Message Redacted]')
    })
    }

    else{
        issuePage.issueRedactedMessageText.should('have.length', count)
        issuePage.issueRedactedMessageText.each(($el)=>{
        cy.wrap($el).should('contain.text','[Message Redacted]')
    })
    }

    if (count === 'All'){

        issuePage.issueRedactedIcon.each(($el)=>{
        cy.wrap($el).should('contain.class','ion-redaction')

    })
    }
    else
    {
        issuePage.issueRedactedIcon.should('have.length', count)
        issuePage.issueRedactedIcon.each(($el)=>{
            cy.wrap($el).should('contain.class','ion-redaction')
        })
    }


    issuePage.issueConversation.as('conversation');
    cy.get('@conversation').should('contain.text', team_member+" "+message);

})


Then ('I should be able to redact all messages and attachments from conversation and see the count in the logs', (message) =>{

    const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
    issuePage.issueRedactAllMessages.click()
    issuePage.issueRedactMessageChecked.then(($list)=>{
        let countcheckboxchecked = $list.length
        countcheckboxcheckednumber = countcheckboxchecked


            issuePage.issueAttachMentsTitle.then(($count)=>{

                let countAttachments = $count.length
                countAttachmentsNumber = parseInt(countAttachments)

            })
            cy.log('countcheckboxcheckednumber is '+countcheckboxcheckednumber)
            cy.log('countAttachmentsNumber is '+countAttachmentsNumber)
    issuePage.issueRedactAllAttachments.should('have.text', 'Deselect all attachments')
    issuePage.issueRedactMessageCount.should('contain.text', 'All Messages')

        if (countAttachmentsNumber == 1){
        issuePage.issueRedactAttachmentCount.should('contain.text', '1 Attachment')
        }
        else{
         issuePage.issueRedactAttachmentCount.should('contain.text', 'All Attachments')
        }
     issuePage.issueRedactFooterNote.should('contain.text', 'Selected for Redaction')
     issuePage.issueRedactButton.should('not.be.disabled').and('have.text', 'Redact')
     issuePage.issueRedactButton.click()

     if (countAttachmentsNumber == 1){
         issuePage.issueRedactModalDescription.should('contain.text', 'All messages and 1 attachment selected for redaction. You cannot undo this action. Are you sure you want to redact?')

     }
     else
     {
         issuePage.issueRedactModalDescription.should('contain.text', 'All messages and attachments selected for redaction. You cannot undo this action. Are you sure you want to redact?')

     }
     issuePage.issueRedactModalPrivateNoteTextArea.type('Redacting all messages and attachments')
     issuePage.issueRedactModalRedactButton.click();
     issuePage.userName.then(($user) => {
         let username = $user.text()
        issuePage.issueShowLogs.click({force:true});

        cy.wait(2000)
        if (countcheckboxcheckednumber == 1 && countAttachmentsNumber == 0)
        {
        let message = username+' redacted '+countcheckboxcheckednumber+ ' message'
        cy.log('Message to be shown  in the logs is '+message)
        issuePage.issueShowLogs.click({force: true});
            issuePage.issueShowLogs.click({force: true});
            cy.wait(2000)
            issuePage.issueMessageBody.each(($p)=>{
            let texts = $p.text();
            if (normalizeText(texts).includes(normalizeText(message)))
                {
                  cy.log('message is shown in the logs')
                }
             })

        }
        else if(countcheckboxcheckednumber == 1 && countAttachmentsNumber == 1)
        {
        let message = username+' redacted '+countcheckboxcheckednumber+ ' message and ' + countAttachmentsNumber + ' attachment'
        cy.log('Message to be shown  in the logs is '+message)
        issuePage.issueShowLogs.click({force: true});
        issuePage.issueShowLogs.click({force: true});
        issuePage.issueShowLogs.click({force: true});
            issuePage.issueShowLogs.click({force: true});
            cy.wait(2000)
            issuePage.issueMessageBody.each(($p)=>{
            let texts = $p.text();
            if (normalizeText(texts).includes(normalizeText(message)))
                {
                  cy.log('message is shown in the logs')
                    // expect(normalizeText(texts)).to.equal(normalizeText(message))
                }
             })
        }
        else if (countcheckboxcheckednumber > 1 && countAttachmentsNumber == 1)
        {
            let message = username+' redacted '+countcheckboxcheckednumber+ ' messages and ' + countAttachmentsNumber + ' attachment'
            cy.log('Message to be shown  in the logs is '+message)
            issuePage.issueShowLogs.click({force: true});
            issuePage.issueShowLogs.click({force: true});
            cy.wait(2000)
            issuePage.issueMessageBody.each(($p)=>{
            let texts = $p.text();
            if (normalizeText(texts).includes(normalizeText(message)))
                {
                  cy.log('message is shown in the logs')
                    // expect(normalizeText(texts)).to.equal(normalizeText(message))
                }
             })
        }
        else
        {
            let message = username+' redacted '+countcheckboxcheckednumber+ ' messages and ' + countAttachmentsNumber + ' attachments'
            cy.log('Message to be shown  in the logs is '+message)
            issuePage.issueShowLogs.click({force: true});
            issuePage.issueShowLogs.click({force: true});
            cy.wait(2000)
            issuePage.issueMessageBody.each(($p)=>{
            let texts = $p.text();
            if (normalizeText(texts).includes(normalizeText(message)))
                {
                  cy.log('message is shown in the logs')
                    // expect(normalizeText(texts)).to.equal(normalizeText(message))
                }
             })
        }
      })
    })
})

When('I open Web chat', () => {


    cy.visit('http://localhost:3000/demo/?domain=sbox-style&pid=sbox-style_platform_20200519094132632-4af83da5a091dab');
    cy.createUserId();
    cy.window().then(win => win.Helpshift("open"));
    // cy.window().then(win => win.helpshiftConfig.userId = 'SamAtuomationnewStyleText-207');
    // cy.window().then(win => win.Helpshift("updateHelpshiftConfig"));
    // cy.wait(2000);
    //cy.iframe('').as('chatIcon');
    //cy.get('@chatIcon').find('button').click();


  });

  When('I open Web chat again', () => {
    cy.visit('http://localhost:3000/demo/?domain=sbox-style&pid=sbox-style_platform_20200519094132632-4af83da5a091dab');
    cy.fixture('data').as('user')
    cy.get('@user').then((user)=>{
        cy.window().then(win => win.helpshiftConfig.userId = user.id);
        cy.window().then(win => win.Helpshift("updateHelpshiftConfig"));
        cy.window().then(win => win.Helpshift("open"));
    })

    //cy.iframe('').as('chatIcon');
    //cy.get('@chatIcon').find('body').find('button').click({force:true});
  });


When('User sends issue title via api', () =>{
   // cy.wait(2000)
    var userMessage = "Hello, how can I track my order?"
    cy.window().then((win => win.Helpshift("setInitialUserMessage", userMessage)))
    cy.window().then(win => win.Helpshift("updateHelpshiftConfig"));
})


  When('I type in {string} and sends issue description', (message) => {
   cy.wait(2000)
    cy.iframewidget('#hs-web-sdk-iframe').as('chatWidget');
    cy.get('@chatWidget').find('.hs-chat-footer__text-area').type(message);
    cy.get('@chatWidget').find('.ion-send').click();
  });

  Then('I should see {string} and image in the chat window', (message) => {

    cy.iframewidget('#hs-web-sdk-iframe').as('chatWidget');
    cy.get('@chatWidget').should('contain.text', message);

  });


  Then('{string} styling using {string} of {string} should be correct', (style, symbol, message) =>{

        let charCount = ((str, letter) => {
            {
                var letter_Count = 0;
                for (var position = 0; position < str.length; position++)
                {
                    if (str.charAt(position) == letter)
                    {
                    letter_Count += 1;
                    }
                }
                return letter_Count;
                }
            })

         if (style === 'Bold') {
            cy.get('@chatWidget').find('.hs-message__item strong').each(($el)=>{
                cy.log($el.text())
            })
            cy.get('@chatWidget').find('.hs-message__item strong').then(($count)=>{
                let countBold = $count.length
                let starCount = charCount(message, '*')
                cy.log('starCount is '+starCount)
                if (starCount > 0 && starCount%2 == 0){
                    cy.log('There are '+(starCount/2)+' '+style +' words')
                    expect(countBold).to.eq(starCount/2)
                }
                else if (starCount == 0 || starCount == 1) {
                    expect(countBold).to.eq(starCount)
                    cy.log('Number of '+style+' is '+starCount)
                }
                else if (starCount%2 == 1) {
                    cy.log('There is an extra '+style+' in the string')
                }
            })
         }

         else if(style === 'Italic')
         {
            cy.get('@chatWidget').find('.hs-message__item em').each(($el)=>{
                cy.log($el.text())
            })
            cy.get('@chatWidget').find('.hs-message__item em').then(($count)=>{
                let countItalic = $count.length

                let underscoreCount = charCount(message, '_')

                 cy.log('underscoreCount is '+underscoreCount)
                  if (underscoreCount > 0 && underscoreCount%2 == 0){
                     cy.log('There are '+(underscoreCount/2)+' '+style +' words')
                     expect(countItalic).to.eq(underscoreCount/2)
                 }
                 else if (underscoreCount == 0 || underscoreCount == 1) {
                     expect(countItalic).to.eq(underscoreCount)
                     cy.log('Number of '+style+' is '+underscoreCount)
                 }
                 else if (underscoreCount%2 == 1) {
                     cy.log('There is an extra '+style+' in the string')
                  }
           })
         }

         else if(style === 'Hyperlink')
         {
            cy.get('@chatWidget').find('.hs-message__item a').each(($el)=>{
                cy.log($el.text())

            })
            cy.get('@chatWidget').find('.hs-message__item a').then(($count)=>{
                let countHyperlink = $count.length

                let linkCount = charCount(message, '[') + charCount(message, ']')
                let linkMention = charCount(message, '(') + charCount(message, ')')
                expect(linkCount).to.eq(linkMention)
                 cy.log('linkCount is '+ linkCount)
                  if (linkCount > 0 && linkCount%2 == 0){
                     cy.log('There are '+(linkCount/2)+' '+style +' words')
                     expect(countHyperlink/2).to.eq(linkCount/2)
                 }
                 else if (linkCount == 0 || linkCount == 1) {
                     expect(countHyperlink/2).to.eq(underscoreCount)
                     cy.log('Number of '+style+' is '+linkCount)
                 }
                 else if (linkCount%2 == 1) {
                     cy.log('There is an extra '+style+' in the string')
                  }
           })
         }

         else
         {
            cy.get('@chatWidget').find('.hs-message__item').last().should('have.text', message);
            cy.log('There is no style text in string')
         }

  })

