import {Character} from "./character";
import {Afk} from "./afk";
import {SignUp} from "./sign_up";

export class User
{
    id: number;
    family_name: string;
    name: string;
    email: string;
    default_character_id: number;
    characters: Character[];
    default_character: Character;
    afk: Afk[];
    sign_ups: SignUp[];

    constructor() {
        this.characters = [];
        this.afk = [];
        this.sign_ups = [];
    }
}