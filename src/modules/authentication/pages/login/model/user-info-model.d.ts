export interface userData {
  users: Userinfo[];
  total: number;
}

export interface Userinfo {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}
