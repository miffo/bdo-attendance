import {SignUp} from "./sign_up";
import {User} from "./user";

export class Event
{
    id: number;
    event_date: Date;
    last_sign_up_date: Date;
    name: string;
    description: string;
    sign_ups: SignUp[];
    attendees: User[];
    created_at: Date;
    updated_at: Date;
}