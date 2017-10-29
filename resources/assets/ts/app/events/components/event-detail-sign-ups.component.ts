import {Component, Input} from "@angular/core";

import {SignUp} from "../../core/types/sign_up";

@Component({
    selector: 'event-detail-sign-ups',
    template: `
{{signUps}}
    `,
    styles: [`
    `]
})
export class EventDetailSignUpsComponent {
    @Input() signUps: SignUp[];
}