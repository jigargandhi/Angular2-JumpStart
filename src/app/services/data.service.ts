import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import {Subject,ReplaySubject} from 'rxjs/rx.js';
import {Customer } from '../models/customer.ts'
let customerData:Customer[] = [];
let data:ReplaySubject<Customer> = new ReplaySubject<Customer>(); 
console.log("initialized fresh");
@Injectable()
export class DataService {

    constructor(private http: Http) {
	if(customerData.length==0){
	 this.http.get('/src/customers.json')
                        .map((res: Response) => res.json()).subscribe((d:Customer[])=>{
						 
						  customerData=d;
						  customerData.forEach((cust:Customer)=>{
						  //customerData.push(cust);
						   data.next(cust);
						   console.log('adding');
						  });
						  console.log('done fetching data '+customerData.length);
						})
						}
	}
     
	ngOnInit(){
	 
	}	 
    getCustomers() {
        return data;
    }
    addCustomer(cust:Customer){
	  customerData.push(cust);
	  data.next(cust);
	}
}
