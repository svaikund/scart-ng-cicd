import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items;
  checkoutForm;

  constructor( private cartService: CartService, private formBuilder: FormBuilder, private rtr: Router ) {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      buyerName: '',
      shippingAddress: '',
    });
  }

  handleClick() {
    this.rtr.navigate(['']);

  }

  getRandomId() {
    return Math.floor((Math.random() *6)+1);
  }

  onSubmit(customerData) {
    // Process checkout data here
    customerData.items = this.items;
    if (customerData.items.length == 0){
      window.alert('your cart is empty');
    } else {
      customerData.orderId = this.getRandomId();
      customerData.shippingType= this.cartService.shippingType;
      this.cartService.submitCart(customerData);
      this.items = this.cartService.clearCart();
      this.checkoutForm.reset();
    }

  }
}
