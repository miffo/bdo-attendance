import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

import * as user from "../actions/user";

import {User} from "../models/user";
import {Character} from "../../characters/models/character";

export interface State extends EntityState<User> {
    selectedUserId:number|null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user:User) => user.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedUserId: null
});

export function reducer(state = initialState, action:user.Actions): State {
    switch (action.type) {
        case user.SELECT: {
            return {
                ...state,
                selectedUserId: action.payload
            }
        }
        case user.LOAD: {
            let newState:State = {
                ...adapter.addOne(action.payload.user, state),
                selectedUserId: state.selectedUserId,
            };
            return {
                ...adapter.updateOne({id:action.payload.user.id, changes:action.payload.user}, newState),
                selectedUserId: state.selectedUserId,
            };
        }
        case user.LOAD_ALL_SUCCESS: {
            return {
                ...adapter.addMany(action.payload.users.map((user:User) => {
                    let newUser = new User(), defaultCharacter = new Character(user, user.default_character.character_class);
                    newUser.id = user.id;
                    newUser.email = user.email;
                    newUser.name = user.name;
                    newUser.family_name = user.family_name;
                    defaultCharacter.name = user.default_character.name;
                    defaultCharacter.level = user.default_character.level;
                    newUser.default_character = defaultCharacter;
                    return newUser;
                }), state),
                selectedUserId: state.selectedUserId
            }
        }
        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedUserId;