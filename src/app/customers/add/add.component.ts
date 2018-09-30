import { Component } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  constructor(private customersService: CustomersService) { }

  name: string;
  surname: string;
  age: number;
  newCustomer = {};

  onSubmit() {
    this.newCustomer = {name: this.name, surname: this.surname, age: this.age}
    this.customersService.createCustomer(this.newCustomer)
      .subscribe(
        (data: Customer) => { console.log(data) },
        error => console.log(error)
      );
  }

}
