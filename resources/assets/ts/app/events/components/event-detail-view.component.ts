import {Component, Input} from "@angular/core";

@Component({
    selector: 'event-detail-view',
    template: `
<div>
    <span>
        {{event.description}}
    </span>
    <span>
        {{event.event_date}}
    </span>
    <span>
        {{event.last_sign_up_date}}
    </span>
    <span matTooltip="Updated: {{event.updated_at}}">
        {{event.created_at}}
    </span>
</div>
`,
    styles: [`
    `]
})
export class EventDetailViewComponent
{
    @Input() event: Event;
    @Input() isEventInCollection: number;
}