import { User } from "./User";

export interface Session {
    User: User;
    token: string;
}