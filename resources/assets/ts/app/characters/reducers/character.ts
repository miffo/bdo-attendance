import * as character from "../actions/character";

import {Character} from "../models/character";

export interface State {
    character: Character;
}

export const initialState: State = {
    character: null
};

export function reducer(state = initialState, action:character.Actions):State {
    switch (action.type) {
        case character.UNSELECT: {
            return {
                character: null
            };
        }
        case character.LOAD: {
            return {
                character: action.payload.character
            };
        }
        default: {
            return state;
        }
    }
}