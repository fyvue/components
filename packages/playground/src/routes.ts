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
