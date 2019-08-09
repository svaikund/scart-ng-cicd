import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { orderstatus } from './orderstatus';
import { product } from './product';
import { environment } from '../environments/environment';

export class CartService {
  products = [];
  items = [];
  sitems = [];  
  errorMsg;
  endpoint1 = environment.ep1;
  endpoint2 = environment.ep2;
  endpoint3 = environment.ep3;

  os: orderstatus;
  shippingType;

  constructor(
    private http: HttpClient
  ) {}

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.products = [];
    return this.items;
  }

  ordsts(res){
    this.os = res;
    if (this.os.status == true){
      var msg='Order id ' + this.os.orderId + ' placed successfully';
      window.alert(msg);
    }
  }

  submitCart(orderdata) {
    const url = this.endpoint2 + '/submitorder';
    const postData = JSON.stringify(orderdata);
    console.log('json data', postData);
    const httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Cache-Control' : 'no-cache',
    'Access-Control-Allow-Origin' : '*'
    });

    const options = {
    headers: httpHeaders
    };

    return this.http.post<any>(url, postData, options).subscribe((res) => this.ordsts(res));
  }

  getShippingPrices() {
    // window.alert('getting the shipping data');
    return this.http.get(this.endpoint1 + '/shippingrates');
  }

  getProducts() {
    // window.alert('getting the products data');
    this.http.get(this.endpoint3 + '/products').subscribe((res : any[]) => {
      for(var i = 0; i < res.length; i++){
        this.products.push(res[i] as product);
      }
    });
  }
}
