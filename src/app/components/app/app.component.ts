import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig, AsyncRoute } from 'angular2/router';
import { CustomersComponent } from '../customers/customers.component';
import { OrdersComponent } from '../orders/orders.component';
//import {System} from '../../../node_modules/systemjs/dist/systemjs';
import { AddCustomer } from '../addcustomers/addcustomers';
import {DataService} from '../../services/data.service';
declare var System:any;
@Component({ 
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
  
})
@RouteConfig([
  { path: '/', as: 'Customers', component: CustomersComponent, useAsDefault: true },
  { path: '/orders/:id', as: 'Orders', component: OrdersComponent    },
  new AsyncRoute({
      path:'/add',
      loader:()=> System.import('../../src/app/components/addcustomers/addcustomers').then(m=>m["AddCustomer"]),
      name:'AddCustomers'
  }),
  //{ path: '/add', as: 'AddCustomers', component: AddCustomer    }
])
export class AppComponent {

}
