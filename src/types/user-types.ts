export type User = {
  username: string;
  userId: number;
  password: string;
};

export type CreateUser = Omit<User, "userId">;

export type LoginRequest = Omit<User, "userId">;
export type UserWithoutPassword = Omit<User, "password">;
