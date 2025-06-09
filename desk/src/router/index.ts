import { useScreenSize } from "@/composables/screen";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { isCustomerPortal } from "@/utils";
import { createRouter, createWebHistory } from "vue-router";
const { isMobileView } = useScreenSize();

export const AGENT_PORTAL_CONTACT_LIST = "ContactList";
export const AGENT_PORTAL_CUSTOMER_LIST = "CustomerList";
export const AGENT_PORTAL_TICKET = "TicketAgent";
export const AGENT_PORTAL_TICKET_LIST = "TicketsAgent";
export const AGENT_PORTAL_KNOWLEDGE_BASE = "DeskKBHome";

export const CUSTOMER_PORTAL_LANDING = "TicketsCustomer";
export const AGENT_PORTAL_LANDING = AGENT_PORTAL_TICKET_LIST;
export const LOGIN_PAGE = "/login?redirect-to=/helpdesk";

// type the meta fields
declare module "vue-router" {
  interface RouteMeta {
    auth?: boolean;
    agent?: boolean;
    admin?: boolean;
    public?: boolean;
    onSuccessRoute?: string;
    parent?: string;
  }
}

const routes = [
  {
    path: "",
    component: () => import("@/pages/HRoot.vue"),
  },
  // Customer portal routing
  {
    path: "",
    name: "CustomerRoot",
    // component: () => import("@/pages/CLayout.vue"), // old customer portal
    component: () => import("@/pages/CustomerPortalRoot.vue"),
    meta: {
      auth: true,
      public: true,
    },
    children: [
      // handle tickets routing
      {
        path: "my-tickets",
        children: [
          {
            path: "",
            name: "TicketsCustomer",
            component: () => import("@/pages/ticket/Tickets.vue"),
          },
          {
            path: "new/:templateId?",
            name: "TicketNew",
            component: () => import("@/pages/ticket/TicketNew.vue"),
            props: true,
            meta: {
              onSuccessRoute: "TicketCustomer",
              parent: "TicketsCustomer",
            },
          },
          {
            path: ":ticketId",
            name: "TicketCustomer",
            component: () => import("@/pages/ticket/TicketCustomer.vue"),
            props: true,
          },
        ],
      },
      {
        path: "kb-public",
        name: "CustomerKnowledgeBase",
        component: () =>
          import("@/pages/knowledge-base/KnowledgeBaseCustomer.vue"),
      },
      {
        path: "kb-public/:categoryId",
        name: "Articles",
        component: () => import("@/pages/knowledge-base/Articles.vue"),
        props: true,
      },
      {
        path: "kb-public/articles/:articleId",
        name: "ArticlePublic",
        component: () => import("@/pages/knowledge-base/Article.vue"),
        props: true,
      },
    ],
  },
  // Agent Portal Routing
  {
    path: "",
    name: "AgentRoot",
    component: () => import("@/pages/desk/AgentRoot.vue"),
    meta: {
      auth: true,
      agent: true,
      admin: false,
      public: false,
    },
    children: [
      {
        path: "tickets",
        name: AGENT_PORTAL_TICKET_LIST,
        component: () => import("@/pages/ticket/Tickets.vue"),
      },
      {
        path: "notifications",
        name: "Notifications",
        component: () => import("@/pages/MobileNotifications.vue"),
      },
      {
        path: "tickets/new/:templateId?",
        name: "TicketAgentNew",
        component: () => import("@/pages/ticket/TicketNew.vue"),
        props: true,
        meta: {
          onSuccessRoute: "TicketAgent",
          parent: "TicketsAgent",
        },
      },
      {
        path: "tickets/:ticketId",
        name: "TicketAgent",
        component: () =>
          import(`@/pages/ticket/${handleMobileView("TicketAgent")}.vue`),
        props: true,
      },
      {
        path: "kb",
        name: "AgentKnowledgeBase",
        component: () =>
          import("@/pages/knowledge-base/KnowledgeBaseAgent.vue"),
      },
      {
        path: "kb/articles/:articleId",
        name: "Article",
        component: () => import("@/pages/knowledge-base/Article.vue"),
        props: true,
      },
      {
        path: "articles/new/:id",
        name: "NewArticle",
        component: () => import("@/pages/knowledge-base/NewArticle.vue"),
        props: true,
      },
      {
        path: "customers",
        name: AGENT_PORTAL_CUSTOMER_LIST,
        component: () => import("@/pages/desk/customer/Customers.vue"),
      },
      {
        path: "contacts",
        name: AGENT_PORTAL_CONTACT_LIST,
        component: () => import("@/pages/desk/contact/Contacts.vue"),
      },
      {
        path: "canned-responses",
        name: "CannedResponses",
        component: () => import("@/pages/CannedResponses.vue"),
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/pages/dashboard/Dashboard.vue"),
      }
    ],
  },
  // Additonal routes
  {
    path: "/:pathMatch(.*)*",
    name: "Invalid Page",
    component: () => import("@/pages/InvalidPage.vue"),
  },
];

const handleMobileView = (componentName) => {
  return isMobileView.value ? `Mobile${componentName}` : componentName;
};

export const router = createRouter({
  history: createWebHistory("/helpdesk/"),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  isCustomerPortal.value = to.meta.public;
  if (authStore.isLoggedIn) {
    await authStore.init();
  }

  if (!authStore.isLoggedIn) {
    window.location.href = LOGIN_PAGE;
  } else if (to.name === "TicketAgent" && !authStore.isAgent) {
    const ticketId = to.params.ticketId;
    next({
      name: "TicketCustomer",
      params: { ticketId },
    });
  } else {
    next();
  }
});

router.afterEach(async (to) => {
  if (to.meta.public) return;
  const userStore = useUserStore();
  await userStore.users.fetch();
});
