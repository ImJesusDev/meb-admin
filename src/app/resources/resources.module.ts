import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/* State */
import { reducers, effects } from './state';

/* General Components */
import { TableModule } from '@molecules/table/table.module';
import { ContainerModule } from '@atoms/container/container.module';
import { BackArrowModule } from '@atoms/back-arrow';
import { SharedModule } from '@shared/shared.module';
import { ModalModule, ModalComponent } from '@atoms/modal';

/* Components */
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourcesFormComponent } from './resources-form/resources-form.component';
import { ComponentsComponent } from './components/components.component';
import { DocumentsComponent } from './documents/documents.component';
import { AddComponentModalComponent } from './add-component-modal/add-component-modal.component';
import { AddDocumentModalComponent } from './add-document-modal/add-document-modal.component';

@NgModule({
  declarations: [
    ResourcesComponent,
    ResourcesListComponent,
    ResourcesFormComponent,
    ComponentsComponent,
    DocumentsComponent,
    AddComponentModalComponent,
    AddDocumentModalComponent,
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('resources', reducers),
    EffectsModule.forFeature(effects),
    TableModule,
    SharedModule,
    ContainerModule,
    BackArrowModule,
    ModalModule
  ],
  providers: [
    ModalComponent
  ]
})
export class ResourcesModule { }
