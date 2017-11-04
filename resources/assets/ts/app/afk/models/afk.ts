import {User} from "../../users/models/user";
import {Event} from "../../events/models/event";

export class Afk
{
    id: number;
    user_id: number;
    user: User;
    reason: string;
    to_date: Date;
    from_date: Date;
    affected_events:Event[];
    created_at: Date;
    updated_at: Date;

    constructor(user:User = null) {
        if (user) {
            this.user_id = user.id;
            this.user = user;
        }
        this.reason = "";
        this.affected_events = [];
    }
}