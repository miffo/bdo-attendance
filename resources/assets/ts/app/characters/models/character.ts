import {User} from "../../users/models/user";
import {CharacterClass} from "./character_class";

export class Character
{
    id: number;
    user_id: number;
    class_id: number;
    class_name: string;
    character_class: CharacterClass;
    name: string;
    level: number;
    user: User;
    created_at: Date;
    updated_at: Date;

    constructor(user:User, cClass:CharacterClass) {
        this.user_id = user.id;
        this.user = user;
        this.class_id = cClass.id;
        this.class_name = cClass.name;
        this.character_class = cClass;
        this.name = "";
        this.level = 0;
    }
}