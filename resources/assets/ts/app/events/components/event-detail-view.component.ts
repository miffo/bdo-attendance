import {Component, Input} from "@angular/core";

@Component({
    selector: 'event-detail-view',
    template: `
<div>
    Description:
    <span>
        {{event.description}}
    </span>
    
    Event date:
    <span>
        {{event.event_date}}
    </span>


    Last sign up date:
    <span>
        {{event.last_sign_up_date}}
    </span>
    
    created at:
    <span matTooltip="Updated: {{event.updated_at}}">
        {{event.created_at}}
    </span>
</div>`,
    styles: [`
    `]
})
export class EventDetailViewComponent
{
    @Input() event: Event;
    @Input() isEventInCollection: number;
}