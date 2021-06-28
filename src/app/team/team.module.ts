import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Components */
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';

/* Routing */
import { TeamRoutingModule } from './team-routing.module';
import { TeamFormComponent } from './team-form/team-form.component';

@NgModule({
  declarations: [TeamComponent, TeamListComponent, TeamFormComponent],
  imports: [CommonModule, TeamRoutingModule, FormsModule, ReactiveFormsModule],
})
export class TeamModule {}
