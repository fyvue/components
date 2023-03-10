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
export interface TableHeaders {
  [key: string]: string;
}
export interface TableData {
  [key: string]: any;
}
