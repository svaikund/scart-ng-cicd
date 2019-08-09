import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products ;
  product;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.products=this.cartService.products;
  }

  addToCart(product) {
    let msg=product.name + ' added to the cart, keep going!';
    window.alert(msg);
    this.cartService.addToCart(product);
  }

  ngOnInit() {
   this.route.paramMap.subscribe(params => {
      this.product = this.products[params.get('productId')];
  });
}


}
