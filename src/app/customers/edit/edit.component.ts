import { Component, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { CustomersService } from '../customers.service';
import { Customer, Customers } from '../models/customer';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnDestroy {

  name: string;
  surname: string;
  age: number;
  id: number;
  sub1: Subscription;

  constructor(
    private router: ActivatedRoute,
    private customersService: CustomersService) {

    router.params.pipe(
      switchMap((params: any) => {
        return customersService.getCustomer(params.id);
      })
    ).subscribe((data: Customer) => {
      this.name = data.name;
      this.surname = data.surname;
      this.age = data.age;
      this.id = data.id;
    });
  }

  onSubmit(): void {
    const customer: Customer = {
      name: this.name,
      surname: this.surname,
      age: this.age
    };
    this.customersService.editCustomer(this.id, customer).pipe(
      switchMap(() => {
        return this.customersService.list();
      }),
      map((data: Customers) => {
        this.customersService.updateList(data);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
