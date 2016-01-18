import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import {Subject, ReplaySubject} from 'rxjs/rx';
import {Customer } from '../models/customer.ts'
let customerData: Customer[] = [];
let data: ReplaySubject<Customer> = new ReplaySubject<Customer>();
let id = 10;
@Injectable()
export class DataService {

    constructor(private http: Http) {
        console.log("constructor called");
        if (customerData.length == 0) {
            this.http.get('./customers.json')
                .map((res: Response) => res.json()).subscribe((d: Customer[]) => {

                    customerData = d;
                    customerData.forEach((cust: Customer) => {
                        //customerData.push(cust);
                        data.next(cust);
                        console.log('adding');
                    });
                    console.log('done fetching data ' + customerData.length);
                })
        }
    }

    ngOnInit() {

    }
    getCustomers() {
        return data;
    }
    getID() {
        return id++;
    }
    addCustomer(cust: Customer) {
        console.log("adding a new customer");
        customerData.push(cust);
        console.log("customer length"+customerData.length)
        data.next(cust);
    }
}
