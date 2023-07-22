export type UserPrivate = {
  uuid: string;
  username: string;
  bio?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  created_at: string;
  logged_at: string;
  roles?: Array<string>;
};
