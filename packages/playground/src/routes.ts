export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HomePage.vue"),
  },
  {
    path: "/docs/buttons",
    name: "docs_buttons",
    component: () => import("@/pages/docs/ButtonsPage.vue"),
  },
  {
    path: "/docs/breadcrumb",
    name: "docs_breadcrumb",
    component: () => import("@/pages/docs/BreadcrumbPage.vue"),
  },
  {
    path: "/docs/dateselection",
    name: "docs_dateselection",
    component: () => import("@/pages/docs/DateSelectionPage.vue"),
  },
  {
    path: "/docs/table",
    name: "docs_table",
    component: () => import("@/pages/docs/TablePage.vue"),
  },
  {
    path: "/docs/modal",
    name: "docs_modal",
    component: () => import("@/pages/docs/ModalPage.vue"),
  },
  {
    path: "/docs/klbuserflow",
    name: "docs_klbuserflow",
    component: () => import("@/pages/docs/KlbUserFlowPage.vue"),
  },
  {
    path: "/docs/klbcontact",
    name: "docs_klbcontact",
    component: () => import("@/pages/docs/KlbContactPage.vue"),
  },
  {
    path: "/docs/klblocation",
    name: "docs_klblocation",
    component: () => import("@/pages/docs/KlbLocationPage.vue"),
  },
  {
    path: "/docs/klbpaymentmethod",
    name: "docs_klbpaymentmethod",
    component: () => import("@/pages/docs/KlbPaymentMethodPage.vue"),
  },
  {
    path: "/docs/klbuser",
    name: "docs_klbuser",
    component: () => import("@/pages/docs/KlbUserPage.vue"),
  },
  {
    path: "/docs/klbbillinghistory",
    name: "docs_klbbillinghis",
    component: () => import("@/pages/docs/KlbBillingHistoryPage.vue"),
  },
  {
    path: "/docs/klbpage/:slug",
    name: "docs_klbpage",
    component: () => import("@/pages/docs/KlbPagePage.vue"),
  },
  {
    name: "notFoundView",
    path: "/:path(.*)",
    component: () => import("@/pages/NotFoundPage.vue"),
  },
];
