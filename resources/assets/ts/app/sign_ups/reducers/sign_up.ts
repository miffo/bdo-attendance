
import * as signUp from "../actions/sign_up";

import {SignUp} from "../models/sign_up";

export interface State {
    sign_up: SignUp
}

export const initialState: State = {
    sign_up: null
};

export function reducer(state = initialState, action: signUp.Actions): State {
    switch (action.type) {
        case signUp.LOAD: {
            return {
                sign_up: action.payload
            }
        }
        default: {
            return state;
        }
    }
}