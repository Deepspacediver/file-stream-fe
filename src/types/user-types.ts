export type User = {
  username: string;
  userId: number;
  password: string;
};

export type CreateUser = Omit<User, "userId">;
