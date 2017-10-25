import { User } from "./user";

export class Afk
{
    id: number;
    user_id: number;
    user: User;
    reason: string;
    to_date: Date;
    from_date: Date;
    created_at: Date;
    updated_at: Date;
}