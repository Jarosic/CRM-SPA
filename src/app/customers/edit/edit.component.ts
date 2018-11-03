import { Component, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CustomersService } from '../customers.service';
import { Customer, Customers } from '../models/customer';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnDestroy {

  id: number;
  sub1: Subscription;
  form: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private redirect: Router,
    private customersService: CustomersService
  ) {
      this.form = new FormGroup({
        'name' : new FormControl('', [Validators.required, Validators.minLength(2)]),
        'surname' : new FormControl('', [Validators.required, Validators.minLength(2)]),
        'age' : new FormControl('', Validators.required)
      });
    this.router.params.pipe(
      switchMap((params: any) => {
        return customersService.getCustomer(params.id);
      })
    ).subscribe((data: Customer) => {
        this.id = data.id;
        this.form.patchValue({
        name: data.name,
        surname: data.surname,
        age: data.age
      });
    });
  }

  onSubmit(): void {

    this.customersService.editCustomer(this.id, this.form.value).pipe(
      switchMap(() => {
        return this.customersService.list();
      }),
      map((data: Customers) => {
        this.customersService.updateList(data);
      })
    ).subscribe();
    this.redirect.navigate(['/']);
  }

  get name() { return this.form.get('name'); }
  get surname() { return this.form.get('surname'); }
  get age() { return this.form.get('age'); }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
