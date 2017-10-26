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

    constructor(event:Event, user:User, character:Character = null) {
        this.event_id = event.id;
        this.event = event;
        this.user_id = user.id;
        this.user = user;
        if (character) {
            this.character_id = character.id
            this.character = character;
        } else {
            this.character_id = user.default_character_id;
            this.character = user.default_character;
        }
        this.attending = true;
        this.comment = "";
    }
}