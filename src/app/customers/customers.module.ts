import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { CustomersComponent } from './customers.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { CustomersService } from './customers.service';
import { DetailsComponent } from './details/details.component';




const routes: Route[] = [
  { path: '', component: CustomersComponent, children: [
    { path: 'customers', component: ListComponent },
    { path: 'details', component: DetailsComponent },
    { path: 'add', component: AddComponent },
    { path: 'edit', component: EditComponent }
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    CustomersComponent, 
    ListComponent, 
    AddComponent,
    EditComponent,
    DetailsComponent
  ],
  exports: [RouterModule],
  providers: [CustomersService]
})
export class CustomersModule { }
