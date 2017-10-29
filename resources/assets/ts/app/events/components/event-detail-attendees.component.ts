import {Component, Input} from "@angular/core";
import {User} from "../../core/types/user";

@Component({
    selector: 'event-detail-attendees',
    template: `
{{attendees}}
    `,
    styles: [`
    `]
})
export class EventDetailAttendeesComponent {
    @Input() attendees: User[];
}