
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SideNavComponent} from "./components/side-nav-component";
import {NavItemComponent} from "./components/nav-item-component";
import {LayoutComponent} from "./components/layout-component";
import {AppComponent} from "./containers/app.component";
import {PageNotFoundComponent} from "./containers/page-not-found.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared-module";

export const COMPONENTS = [
    AppComponent,
    PageNotFoundComponent,
    LayoutComponent,
    NavItemComponent,
    SideNavComponent,
];

@NgModule({
    'imports': [CommonModule, RouterModule, SharedModule],
    'declarations': COMPONENTS,
    'exports': COMPONENTS
})
export class CoreModule {}