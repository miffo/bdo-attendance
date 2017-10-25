import { Event } from "./event";
import {Character} from "./character";
import {User} from "./user";

export class SignUp
{
    id: number;
    event_id: number;
    event: Event;
    character_id: number;
    character: Character;
    user_id: number;
    user: User;
    attending: boolean;
    comment: string;
    created_at: Date;
    updated_at: Date;
}