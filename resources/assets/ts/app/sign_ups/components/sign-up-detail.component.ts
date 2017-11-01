import {Component, Input} from "@angular/core";

import {SignUp} from "../models/sign_up";

@Component({
    selector: 'sign-up-detail',
    template:`
{{signUp.comment}}
    `,
    styles: [`
    `]
})
export class SignUpDetailComponent
{
    @Input() signUp: SignUp;
}