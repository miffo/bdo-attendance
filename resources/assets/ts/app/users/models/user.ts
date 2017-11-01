import {Afk} from "../../afk/models/afk";
import {Character} from "../../characters/models/character";
import {Event} from "../../events/models/event";
import {SignUp} from "../../sign_ups/models/sign_up";

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
    attended: Event[];

    constructor() {
        this.characters = [];
        this.afk = [];
        this.sign_ups = [];
        this.attended = [];
    }
}