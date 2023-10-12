export interface DateInterval {
  $between: [any, any];
}
export interface FetchResult {
  [key: string]: any;
  fvReject?: boolean;
  //raw: any;
  status: any;
}
export interface FyHeadLazy {
  name?: string;
  title?: string;
  image?: string;
  imageType?: string;
  imageWidth?: string;
  imageHeight?: string;
  description?: string;
  published?: string;
  modified?: string;
  keywords?: string;
  type?: "blog" | "search" | "article" | "website";
  searchAction?: string;
  next?: string;
  prev?: string;
  canonical?: string;
  locale?: string;
  robots?: string;
  url?: string;
  canonical?: string;
  isAdult?: boolean;
  locale?: string;
  alternateLocales?: string[];
}
export type modelValueType = string | number | string[] | undefined;
export type checkboxValueType = any[] | Set<any> | undefined | boolean;
export interface Paging {
  page_no: number;
  results_per_page: number;
  page_max: number;
  page_max_relation: string;
  count: number;
}
export interface BreadcrumbLink {
  name: string;
  to?: string;
}
export type NavLink = {
  to: string;
  isExternal?: boolean;
  name: string;
  childrens?: NavLink[];
  icon?: Component;
  id?: string;
};
export type NavLinkComp = {
  to: string;
  isExternal?: boolean;
  name: string;
  childrens?: NavLinkComp[];
  icon?: {
    component: Component;
    props: any;
  };
};

export interface TableData {
  [key: string]: any;
}

export interface TableHeaders {
  [key: string]: string;
}

export interface TableSortable {
  [key: string]: boolean;
}
export interface StepperStep {
  title: string;
  description?: string;
}
export interface StepperSteps {
  list: StepperStep[];
  current: number;
}
export interface ConfirmModalData {
  title: string;
  desc: string;
  onConfirm: Function;
}

export interface FetchError extends Error {
  status?: number;
  fvReject?: boolean;
}
