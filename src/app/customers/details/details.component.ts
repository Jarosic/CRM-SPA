import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  customer: Customer;

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute
    ) {

    this.route.params.pipe(
      switchMap((params: any) => {
        return customersService.getCustomer(params.id);
      })
    ).subscribe((data: Customer) => {
      this.customer = data;
    });
  }
}
