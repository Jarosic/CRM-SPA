import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

import { CustomersComponent } from './customers.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { CustomersService } from './customers.service';
import { DetailsComponent } from './details/details.component';
import { FilterPipe } from './filter.pipe';




const routes: Route[] = [
  { path: '', component: CustomersComponent, children: [
    { path: 'customers', component: ListComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'add', component: AddComponent },
    { path: 'edit/:id', component: EditComponent }
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    CustomersComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    DetailsComponent,
    FilterPipe
  ],
  exports: [RouterModule],
  providers: [CustomersService]
})
export class CustomersModule { }
