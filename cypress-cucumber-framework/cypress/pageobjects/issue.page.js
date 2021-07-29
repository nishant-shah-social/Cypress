/**
 * Page Object repository for Issues Page
 * @author Sameer Maral <sameer.maral@helpshift.com>
 * @created Apr 13, 2020
 */

/// <reference types ="Cypress" />

export class IssuePage {
  /**
  * define elements
  */
  get issueIcon() {return cy.get('.issues');}
  get issueListItem(){ return cy.getEl('issue-list__item'); }
  get myOpenIssues(){return cy.get('.js-filter-title').contains('My Open Issues');}
  get allIssues(){return cy.get('.js-filter-title').contains('All Issues');}
  get issueSidebarToggle() { return cy.get('.hs-page__sidebar-toggle');}
  get conversationTab()   { return cy.getEl('issue-preview__conv-tab'); }
  get customIssueTab() { return cy.getEl('issue-preview__cif-tab'); }
  get metadataTab() {return cy.getEl('issue-preview__metadata-tab');}
  get otherIssuesTab() { return cy.getEl('issue-preview__other-issues-tab');}
  get issueTags() { return cy.get('.hs-issue-header__tags');}
  get issueLink() {return cy.getEl('issue-preview__issue-details-link');}
  get issueUserName() {return cy.get('.hs-issue-header__name');}
  get issueUserEmail() { return cy.get('.hs-issue-header__email'); }
  get issueQueueName() { return cy.get('.hs-issue-header__queue-name');}
  get issueTextArea() { return cy.get('.hs-message-box__textarea');}
  get issueQuickReply() { return cy.get('.hs-message-box-toolbar__quick-replies-wrapper');}
  get issueFAQ() { return cy.get('.hs-message-box-toolbar__faq-title');}
  get issueAttachment() { return cy.get('.file-select__input');}
  get issueAttachmentFooter () {return cy.get('.hs-message-box-toolbar__upload-label');}
  get issueEmoji() { return cy.get('.hs-message-box-toolbar__emoji-icon-wrapper');}
  get issueTextDirection() { return cy.get('.hs-message-box-toolbar__text-direction-title');}
  get issueAssignToMe() { return cy.get('.qa-3p-atm');}
  get issueNote() { return cy.get('.hs-issue-footer__actions--secondary > :nth-child(2) > .hs-button');}
  get issueShowLogs() { return cy.get('.hs-issue-footer__logs > .hs-button');}
  get issueMoreOption() {return cy.get('.popover__title > .hs-button');}
  get issueReply() { return cy.get('.hs-issue-reply__send');}
  get issueReplyResolve() { return cy.get ('.hs-issue-reply__send-resolve');}
  get issueConversation() { return cy.get('.hs-issue-view__messages');}
  get issueDisplayedStatus() { return cy.get('.hs-issue-state__status');}
  get issueStatusTitle() { return cy.get('.hs-issue-state__title');}
  get issueStatusTick() { return cy.get('.hs-issue-state__status-icon');}
  get issueStatusDate() { return cy.get('.hs-issue-state__meta');}
  get issueAssigned() { return cy.get('.hs-issue-footer__dropdown > .hs-dropdown > .hs-dropdown__title');}
  get userName() { return cy.get('.popover__title > .hs-main-nav__item');}
  get quickSearchItem() { return cy.get('.hs-quick-search__item');}
  get issuePageQuickReplySerachBox() { return cy.get('.hs-search-box__input');}
  get issuePageQuickReplySearchResult(){ return cy.get('.hs-quick-replies__row');}
  get issueFaqSearch() { return cy.get('.canned-faq-popup__faq-search');}
  get issueFaqResult() { return cy.get('.canned-faq-popup__list-panel');}
  get issueReolvedModatResolveButton() { return cy.get ('.qa-csat-modal-submit');}
  get issueNoteTextArea() {return cy.get('.hs-issue-reply__textarea');}
  get issueNoteSendButton() {return cy.get('.hs-issue-reply__send');}
  get issueNoteCancelButton() { return cy.get('.hs-issue-reply__actions > .hs-button--hollow');}
  get issueAddedNotes() { return cy.get('.hs-msg--note');}
  get privateNoteTitle(){ return cy.get('.hs-issue-note-box__title-text');}
  get issueMentionList() { return cy.get('.hs-issue-mention-list');}
  get issueMentionUser() { return cy.get('.hs-issue-mention-list__item');}
  get issueEmojiWidget() { return cy.get('.hs-emoji-widget');}
  get issueEmojiSerach() {return cy.get ('.hs-emoji-widget__search-input');}
  get emojiSearchResults() {return cy.get ('.hs-emoji-widget__search-results');}
  get emojiClass() { return cy.get('.hs-emoji-widget__grid-category-cell');}
  get issueHideFaq() { return cy.get('.hs-faq-suggestions__actions > :nth-child(3)');}
  get issueShowLogsRefresh() { return cy.get('.hs-issue-view__refresh-logs-link > strong');}
  get issuesSystemLogs() {return cy.get('.hs-msg--log');}
  get issueNoteInfoText() {return cy.get('.hs-issue-reply__info-text');}
  get issueSearchBox() { return cy.get('.hsql-html')}
  get issueSearchBoxPlaceholder() { return cy.get('.ion-magnifier hsql-builder__placeholder-icon')}
  get issueSearchSubmit() {return cy.get ('.hsql-builder__button--submit');}
  get issueList() { return cy.getEl('issue-list__list');}
  get issueLinkFromIssueList() { return cy.getEl('issue-list__item');}
  get issueTitle() { return cy.get('.hs-issue__title')}
  get issueSearchedCount() {return cy.get('.issues-list-header__count');}
  get issueContentBody() {return cy.get('.hs-content__body');}
  get issueLoadMoreissues() { return cy.get('.hs-issue-list__load-more');}
  get dataqa() {return cy.get('[data-qa-id="infinitelybeta_issue_20190511115010423-7dac959d947d5e8"]')}
  get issueAssignSearch () {return cy.get('.hs-dropdown__search-input');}
  get issueAssignHeaderTabs() {return cy.get ('.hs-dropdown__tabs-header-wrapper');}
  get issueAssignSearchResults() { return cy.get('.hs-dropdown__option-list');}
  get issueMoreOptionList() { return cy.get('.popover__menu-list');}
  get issueResolveModal() {return cy.get('.qa-csat-modal');}
  get issueReolvedModatTitle() {return cy.get('.hs-modal__title');}
  get issueResolveModalStarIcon() {return cy.get('.icon');}
  get issueResolveModalDescrption(){ return cy.get('.hs-modal__body');}
  get issueResolveModalCheckBox() {return cy.get('#no-show-csat');}
  get issueResolveModalCheckBoxDescription() {return cy.get('.hs-modal__footer-checkbox > label');}
  get issueReolvedModatCancelButton() {return cy.get('.hs-button--secondary');}
  get issueUploadedImageFile() { return cy.get('.hs-msg__attachment > .avatar')}
  get issueUploadOtherFile() { return cy.get('.hs-msg__attachment-name');}
  get issueRedactAllMessages() { return cy.get('.hs-issue-redaction-footer').contains('Select all messages');}
  get issueRedactAllAttachments() { return cy.get('.hs-issue-redaction-footer__select-attachments-btn');}
  get issueRedactCancelButton() {return cy.get('.hs-button--hollow');}
  get issueRedactButton() {return cy.get('.qa-footer-redact-btn');}
  get issueRedactFooterNote() {return cy.get('.hs-issue-redaction-footer__note');}
  get issueRedactMessageCount() {return cy.get('.hs-issue-redaction-footer__msg-count');}
  get issueRedactAttachmentCount() {return cy.get('.hs-issue-redaction-footer__attachment-count');}
  get issueRedactMessageCheckBox() {return cy.get('.hs-msg__redaction-checkbox > .hs-checkbox__fake-box')}
  get issueRemainingAttachments() {return cy.get('.hs-msg__attachments-title > .hs-checkbox > .hs-checkbox__fake-box')}
  get issueRedactAttachmentCheckBox() {return cy.get('.hs-checkbox > .hs-checkbox__fake-box')}
  get issueRedactMessageChecked() { return cy.get('.hs-msg__redaction-wrapper--selected');}
  get issueMessageWrapper() {return cy.get('.hs-issue-view__messages-wrapper');}
  get issueMessagebody() {return cy.get('.hs-msg__body');}
  get issueViewScollButton() {return cy.get('.hs-issue-view__scroll-btn');}
  get issueRedactModalConfirmationBox() {return cy.get('.hs-modal--confirm-box');}
  get issueRedactionModalTitle() {return cy.get('.hs-modal__title');}
  get issueRedactModalCloseButton() {return cy.get('.hs-modal__close-icon');}
  get issueRedactModalDescription() {return cy.get('.hs-modal__body');}
  get issueRedactModalPrivateNoteTitle() {return cy.get('.hs-issue-redaction-cb__private-note-heading');}
  get issueRedactModalPrivateNoteWrapperHeading() {return cy.get('.hs-issue-redaction-cb__private-note-wrapper');}
  get issueRedactModalPrivateNoteDescription() {return cy.get('.hs-private-notes-box__description');}
  get issueRedactModalPrivateNoteTextArea(){return cy.get('textarea');}
  get issueRedactModalCancelButton() {return cy.get('.hs-modal__footer > .hs-button--hollow');}
  get issueRedactModalRedactButton() {return cy.get('.qa-redact-btn');}
  get issueRedactedIcon() {return cy.get('.hs-msg > .hs-msg__body > .ion-redaction')}
  get issueRedactMessagenBody() {return cy.get('.hs-msg');}
  get issueRedactedMessageText() {return cy.get('.hs-msg > .hs-msg__body > span');}
  get issueRedactedAttachmentText() {return cy.get('.hs-msg__attachments-title > span');}
  get issueRedactAttachmentIcon() {return cy.get('.hs-msg__attachment > .ion-redaction')}
  get issueRedactAttachmentNumber() {return cy.get('.hs-msg__attachment-wrapper redacted');}
  get issueMessageBody() {return cy.get('.hs-msg > .hs-msg__body')}

  // objects from Issue Info page
  get issueInfoUsertab() {return cy.getEl('issue-details__info-tab');}
  get issueInfoCIFTab() {return cy.getEl('issue-details__cif-tab');}
  get issueInfoMetadataTab() {return cy.getEl('issue-details__metadata-tab');}
  get backToIssuesLink() { return cy.get('.hs-content__back-link-text');}
  get issueInfoNumber() { return cy.get('.hs-content__title'); }
  get issueInfoTitle() {return cy.get('.hs-content__title');}
  get issueInfoDetail() {return cy.get ('.hs-issue-info__details');}
  get issueInfoPlatformIcon() {return cy.get('.hs-i-app-info__platform-icon');}
  get issueInfoDeviceOS() {return cy.get('.hs-i-app-info__device-os');}
  get issueInfoQueueName() {return cy.get('.hs-i-app-info__queue-name');}
  get issueInfoDefaultQueueLabel() {return cy.get('.hs-i-app-info__queue-label');}
  get issueInfoUserName() {return cy.get('.hs-i-user-info__name');}
  get issueInfoEmaiL() {return cy.get('.hs-i-user-info__email');}
  get issueInfoUpdateButton() {return cy.get('.hs-i-user-info > .hs-button');}
  get issueInfoOtherIssue() {return cy.get('.hs-other-issues__wrapper');}
  get issueInfoTags() {return cy.get('.hs-token-placeholder');}

  // duplicate issue screen
  get issueDuplicateClose() {return cy.get('.hs-modal__close-icon')}
  get issueDuplicateRejectTitle() { return cy.get('.hs-modal__title');}
  get issueStepIndicator(){ return cy.get('.hs-step-indicator');}
  get issuesStepIndicatorNumber() { return cy.get('.hs-step-indicator__step-number');}
  get issueDuplicateTitleH4() {return cy.get('.hs-mark-duplicate-modal__step-wrapper');}
  get issueDuplicateDescription() {return cy.get('.hs-mark-duplicate-modal__step-desc-txt');}
  get issueDuplicateNumber() {return cy.get('.hs-mark-duplicate-modal__dup-issue-title-wrapper > h5')}
  get issueRejectedText() {return cy.get('.hs-mark-duplicate-modal__rejected-txt');}
  get otherIssuesHeader() {return cy.get('.hs-other-issues__header');}
  get otherIssuesDescription() {return cy.get('.hs-other-issues')}
  get otherIssuesList() {return cy.get('.hs-other-issues__list');}
  get otherIssue() {return cy.getEl('issue-list__item')}
  get otherIssueTitle() { return cy.get('.hs-issue__title')}
  get nextButton() {return cy.get('.hs-modal__footer-buttons > .hs-button');}
  get issueSelectErrorMEessage() {return cy.get('.hs-modal__footer-left-content');}
  get issueCallOutDescription() {return cy.get('.hs-callout__description').contains('is being marked');}
  get issueReplyBox() {return cy.get('.hs-mark-duplicate-modal__reply-box-wrapper');}
  get issueReplyTextHeader() { return cy.get('.hs-mark-duplicate-modal__reply-txt-wrapper');}
  get issueReplyInfoHeader() {return cy.get('.hs-mark-duplicate-modal__reply-txt-wrapper > .hs-dropdown > .hs-dropdown__title');}
  get issueReplyTextArea() {return cy.get('.hs-message-box__textarea');}
  get issueReplyQuickReply() {return cy.get('.hs-message-box-toolbar__quick-replies-wrapper');}
  get issueReplyFAQ() {return cy.get('.hs-message-box-toolbar__faq-title');}
  get issueReplyTextDirection() {return cy.get('.hs-message-box-toolbar__text-direction-title');}
  get issueReplyCleatTextButton() {return cy.get('.hs-issue-reply__clear-txt-btn')}
  get issueCalloutIcon(){return cy.get('.hs-callout__icon');}
  get issueFooterCallOutDescription() {return cy.get('.hs-callout--compact > .hs-callout__description-wrapper > .hs-callout__description')}
  get issueDuplicatePreviousButton() { return cy.get('.hs-modal__footer-buttons > .hs-button--hollow');}
  get issueMarkDuplicateButton() { return cy.get('.hs-button--secondary');}
  get issueAttachMentsTitle() {return cy.get('.hs-msg__attachments-title');}

  //Objects for Metadata tab
  get issueTitleMetaDataTab() {return cy.get('.hs-issue-info__title');}
  get issueLanguage() {return cy.get('.hs-i-app-info__device-lang');}
  get issueUserAvatarMetaDataTab() {return cy.get('.hs-simple-avatar__image');}
  get issueUserNameMetaDataTab() {return cy.get('.hs-i-user-info__name');}
  get issueUserEmailMetaDataTab() {return cy.get('.hs-i-user-info__email');}
  get issueUserUpdateButton() { return cy.get('.hs-i-user-info > .hs-button');}
  get issueCutomDataTitle() { return cy.get('.hs-i-metadata__title')}
  get issuePlatform(){ return cy.get('.hs-i-metadata__col-link');}
  get issueQueueNameMetaDataTab() {return cy.get('.hs-i-app-info__queue');}
  get issueMetaDataTableRow() { return cy.get('.hs-i-metadata__table-row');}

}
export const issuePage = new IssuePage();

