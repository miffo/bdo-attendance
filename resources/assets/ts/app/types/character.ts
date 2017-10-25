import {User} from "./user";

export class CharacterClass {
    id: number;
    name: string;
}

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
}