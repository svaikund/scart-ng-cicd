import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})

export class ShippingComponent implements OnInit {
  shippingCosts;
  ishipping;
  form: FormGroup;
  constructor(private cartService: CartService, private formBuilder : FormBuilder, private shiprtr: Router ) {
    this.form = this.formBuilder.group({
      ishipping: ['']
    });
    this.shippingCosts = this.getShippingRates();
    console.log(this.shippingCosts.toString);

    this.ishipping = this.shippingCosts;
}

getShippingRates() {
  return this.cartService.getShippingPrices();
}
  ngOnInit() {
  }

  submit() {
    console.log(this.form.value);
    this.cartService.shippingType=this.form.value;
    this.shiprtr.navigate(['/cart']);
   }

}
