import { Component } from '@angular/core';
import { CustomersService } from '../customers.service';

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

  onSubmit(): void {
    this.customersService.saveDataCustomer(
      {
        name: this.name,
        surname: this.surname,
        age: this.age
      }
    );
  }
}
