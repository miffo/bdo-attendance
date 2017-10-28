//import {Afk} from "./afk";
//import {Character} from "./character";
//import {Event} from "../../events/models/event";
//import {SignUp} from "./sign_up";

export class User
{
    id: number;
    family_name: string;
    name: string;
    email: string;
    default_character_id: number;
    //characters: Character[];
    //default_character: Character;
    //afk: Afk[];
    //sign_ups: SignUp[];
    attended: Event[];

    constructor() {
        /*this.characters = [];
        this.afk = [];
        this.sign_ups = [];*/
        this.attended = [];
    }
}