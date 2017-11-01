
import * as fromRoot from '../../reducers';

export interface UsersState {
}

export interface State extends fromRoot.State {
    'users': UsersState;
}

export const reducers = {

};