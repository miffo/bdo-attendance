import {Component, Input} from "@angular/core";

@Component({
    selector: 'event-detail-view',
    template: `
{{event}}
`,
    styles: [`
    `]
})
export class EventDetailViewComponent
{
    @Input() event: Event;
    @Input() isEventInCollection: number;
}