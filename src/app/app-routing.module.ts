import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {LandingComponent} from "./components/landing/landing.component";
import {ProjectComponent} from "./components/landing/portfolio/project/project.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'projet/:projectId',
    component: ProjectComponent,
    data : {animation : 'showProject'}
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
