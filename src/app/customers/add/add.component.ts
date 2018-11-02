import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomersService } from '../customers.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent {
  constructor(private customersService: CustomersService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.customersService.saveDataCustomer(form.value);
    this.router.navigate(['/']);
  }
}
