
import * as fromRoot from '../../reducers';

export interface SignUpState {
}

export interface State extends fromRoot.State {
    'sign_ups': SignUpState;
}

export const reducers = {

};