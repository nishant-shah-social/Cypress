/**
 * Route configuration for cypress
 * @author Vaibhav Kakade <vaibhavkakade@helpshift.com>
 * @created Jan 30, 2020
 */

/**
 * Route key is map of view name to be matched with route config
 */
const ROUTE_KEYS = {
  APP_SETTINGS: "APP_SETTINGS",
  ISSUES: "ISSUES",
  CAMPAIGNS: "CAMPAIGNS",
  FAQS: "FAQS",
  RTO: "RTO",
  ANNOUNCEMENT: "ANNOUNCEMENT",
  ANALYTICS: "ANALYTICS",
  APIS: "APIS",
  AUTO_ASSIGNMENT: "AUTO_ASSIGNMENT",
  AUTOMATIONS: "AUTOMATIONS",
  BILLING: "BILLING",
  BLOCKED_EMAILS: "BLOCKED_EMAILS",
  BOTS: "BOTS",
  CIFS: "CIFS",
  CSAT: "CSAT",
  DOWNLOAD_SDK: "DOWNLOAD_SDK",
  EMAIL_SUPPORT: "EMAIL_SUPPORT",
  EXTERNAL_API_REQUESTS: "EXTERNAL_API_REQUESTS",
  GROUPS: "GROUPS",
  INTEGRATIONS: "INTEGRATIONS",
  PERMISSIONS: "PERMISSIONS",
  QUEUES: "QUEUES",
  QUICK_REPLIES: "QUICK_REPLIES",
  REOPEN_TIME_WINDOW: "REOPEN_TIME_WINDOW",
  TAGS: "TAGS",
  TEAMS: "TEAMS",
  TEXT_TEMPLATES: "TEXT_TEMPLATES",
  WEB_SUPPORT_PORTAL: "WEB_SUPPORT_PORTAL"
};

/**
 * Route config is map of view and routes config
 * It contains
 * 1. Redirect url after login
 * 2. [Optional] View xhr url to wait for
 * 3. [Optional/Mandaroy] Alias for view xhr url. Mandatory if view xhr is passed.
 * 4. [Optional] Data used for stubbing
 */
const ROUTE_CONFIG = {
  // @TODO - Figure out how to make app name configurable
  // Currently this app is present on smaug.helpshift.com so tests would pass
  [ROUTE_KEYS.APP_SETTINGS]: {
    redirect: "/admin/settings/apps/my-app/",
    route: "/xhr/view/app-details/*",
    alias: "appSettingsMainXhr"
  },
  [ROUTE_KEYS.ISSUES]: {
    route: "/xhr/view/issues/*",
    alias: "issuesXhr"
  },
  [ROUTE_KEYS.CAMPAIGNS]: {
    redirect: "/admin/campaigns/",
    route: "/xhr/view/campaign-cohort/*",
    data: "fixture:campaigns/base",
    alias: "campaignsViewXhr"
  },
  [ROUTE_KEYS.FAQS]: {
    redirect: "/admin/faq/",
    route: "/xhr/view/faq/*",
    alias: "faqViewXhr"
  },
  [ROUTE_KEYS.RTO]: {
    redirect: "/admin/real-time-operations/",
    route: "/xhr/live-metrics/*",
    alias: "rtoViewXhr"
  },
  [ROUTE_KEYS.ANALYTICS]: {
    redirect: "/admin/analytics/overview/",
    route: "/xhr/view/analytics/overview/",
    alias: "analyticsViewXhr",
    data: "fixture:analytics/base"
  },
  [ROUTE_KEYS.ANNOUNCEMENT]: {
    redirect: "/admin/settings/org/announcements/",
    route: "/xhr/view/settings/announcements/",
    alias: "announcementViewXhr"
  },
  [ROUTE_KEYS.APIS]: {
    redirect: "/admin/settings/api/",
    route: "/xhr/view/settings/api/",
    alias: "apisViewXhr"
  },
  [ROUTE_KEYS.AUTO_ASSIGNMENT]: {
    redirect: "/admin/settings/workflows/auto-assignment/",
    route: "/xhr/view/settings/configurations/",
    alias: "autoAssignmentViewXhr"
  },
  [ROUTE_KEYS.AUTOMATIONS]: {
    redirect: "/admin/settings/workflows/automations/",
    route: "/xhr/view/settings/automations/",
    alias: "automationsViewXhr"
  },
  [ROUTE_KEYS.BILLING]: {
    redirect: "/admin/settings/billing/",
    route: "/xhr/view/settings/billing/",
    data: "fixture:billing",
    alias: "billingViewXhr"
  },
  [ROUTE_KEYS.BLOCKED_EMAILS]: {
    redirect: "/admin/settings/blocked-email/",
    route: "/xhr/view/settings/blocked-email-and-domain/",
    alias: "blockedEmailsViewXhr"
  },
  [ROUTE_KEYS.BOTS]: {
    redirect: "/admin/settings/workflows/bots/",
    route: "/xhr/view/settings/chatbots/*",
    alias: "botsViewXhr"
  },
  [ROUTE_KEYS.CIFS]: {
    redirect: "/admin/settings/workflows/custom-issue-fields/",
    route: "/xhr/view/settings/custom-issue-fields/",
    alias: "cifViewXhr"
  },
  [ROUTE_KEYS.CSAT]: {
    redirect: "/admin/settings/csat/",
    route: "/xhr/view/settings/csat/",
    alias: "csatViewXhr"
  },
  [ROUTE_KEYS.DOWNLOAD_SDK]: {
    redirect: "/admin/settings/download-sdk/",
    route: "/xhr/view/settings/sdk/",
    alias: "downloadSdkViewXhr"
  },
  [ROUTE_KEYS.EMAIL_SUPPORT]: {
    redirect: "/admin/settings/email/",
    route: "/xhr/view/settings/email/",
    alias: "emailSupportViewXhr"
  },
  [ROUTE_KEYS.EXTERNAL_API_REQUESTS]: {
    redirect: "/admin/settings/external-apis/",
    route: "/xhr/view/settings/external-apis/",
    data: "fixture:externalApiRequest",
    alias: "externalApiRequestViewXhr"
  },
  [ROUTE_KEYS.GROUPS]: {
    redirect: "/admin/settings/org/groups/",
    route: "/xhr/view/settings/groups/",
    alias: "groupsViewXhr"
  },
  [ROUTE_KEYS.INTEGRATIONS]: {
    redirect: "/admin/settings/integrations/",
    route: "/xhr/view/settings/integration/",
    data: "fixture:integrations",
    alias: "integrationsViewXhr"
  },
  [ROUTE_KEYS.PERMISSIONS]: {
    redirect: "/admin/settings/org/permissions/",
    route: "/xhr/view/settings/permissions/",
    alias: "permissionsViewXhr"
  },
  [ROUTE_KEYS.QUEUES]: {
    redirect: "/admin/settings/workflows/queues/",
    route: "/xhr/view/settings/queues/",
    alias: "queuesViewXhr"
  },
  [ROUTE_KEYS.QUICK_REPLIES]: {
    redirect: "/admin/settings/workflows/quick-replies/",
    route: "/xhr/view/settings/quick-replies/",
    alias: "quickRepliesViewXhr"
  },
  [ROUTE_KEYS.REOPEN_TIME_WINDOW]: {
    redirect: "/admin/settings/workflows/reopen-time-window/",
    route: "/xhr/view/settings/user-reopen-window/",
    data: "fixture:reopenTimeWindow",
    alias: "reopenTimeWindowViewXhr"
  },
  [ROUTE_KEYS.TAGS]: {
    redirect: "/admin/settings/workflows/tags/",
    route: "/xhr/view/settings/tags/",
    alias: "tagsViewXhr"
  },
  [ROUTE_KEYS.TEAMS]: {
    redirect: "/admin/settings/org/teams/",
    route: "/xhr/view/settings/teams/",
    alias: "teamsViewXhr"
  },
  [ROUTE_KEYS.TEXT_TEMPLATES]: {
    redirect: "/admin/settings/workflows/text-templates/",
    route: "/xhr/view/settings/text-templates/",
    alias: "textTemplatesViewXhr"
  },
  [ROUTE_KEYS.WEB_SUPPORT_PORTAL]: {
    redirect: "/admin/settings/web/",
    route: "/xhr/view/settings/web/",
    alias: "webSupportPortalViewXhr"
  }
};

module.exports = {
  ROUTE_KEYS,
  ROUTE_CONFIG
};
