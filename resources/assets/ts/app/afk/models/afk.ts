import { User } from "../../users/models/user";

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

    constructor(user:User) {
        this.user_id = user.id;
        this.user = user;
        this.reason = "";
    }
}