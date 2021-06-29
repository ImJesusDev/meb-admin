import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Components */
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';

/* Routing */
import { TeamRoutingModule } from './team-routing.module';
import { TeamFormComponent } from './team-form/team-form.component';
import { ClientAdminListComponent } from './client-admin-list/client-admin-list.component';
import { ClientAdminFormComponent } from './client-admin-form/client-admin-form.component';

@NgModule({
  declarations: [TeamComponent, TeamListComponent, TeamFormComponent, ClientAdminListComponent, ClientAdminFormComponent],
  imports: [CommonModule, TeamRoutingModule, FormsModule, ReactiveFormsModule],
})
export class TeamModule {}
