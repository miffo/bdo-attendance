import {Component, Input} from "@angular/core";

import {Event} from "../models/event";

@Component({
    'selector': 'event-list-row',
    template: `
    `,
    styles: [`
    `]
})
export class EventListRowComponent
{
    @Input() events: Event[];
}
