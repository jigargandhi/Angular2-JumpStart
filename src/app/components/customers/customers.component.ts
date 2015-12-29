import { Component, ChangeDetectionStrategy} from 'angular2/core';
import { CORE_DIRECTIVES, AsyncPipe } from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';
import { DataService } from '../../services/data.service';
import { Sorter } from '../../utils/sorter';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { SortByDirective } from '../../directives/sortby.directive';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import {Customer} from '../../models/Customer';
@Component({ 
  selector: 'customers', 
  //providers: [DataService],
  templateUrl: 'app/components/customers/customers.component.html',
  directives: [CORE_DIRECTIVES, RouterLink, FilterTextboxComponent, SortByDirective],
  pipes: [CapitalizePipe, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPushObserve, 
})
export class CustomersComponent {

  title: string;
  filterText: string;
  listDisplayModeEnabled: boolean;
  customers: any[] = [];
  filteredCustomers: any[] = [];
  sorter: Sorter;
  observable: Observable<Customer>;
  time: Subject<number>;
      //( observer => { setInterval(_ => observer.next(new Date().getTime()), 500); });

  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
    this.listDisplayModeEnabled = false;
    this.observable = this.dataService.getCustomers();
    this.time = new Subject<number>();
    //this.observable
    this.dataService.getCustomers()
        .subscribe((customer:Customer) => {
          this.customers.push(customer);
          this.filteredCustomers.push(customer);
          this.time.next(customer.id);
        });

   
    this.sorter = new Sorter();
  }

  changeDisplayMode(mode: string) {
      this.listDisplayModeEnabled = (mode === 'List');
  }

  filterChanged(data: string) {
    if (data && this.customers) {
        data = data.toUpperCase();
        let props = ['firstName', 'lastName', 'address', 'city', 'orderTotal'];
        let filtered = this.customers.filter(item => {
            let match = false;
            for (let prop of props) {
                //console.log(item[prop] + ' ' + item[prop].toUpperCase().indexOf(data));
                if (item[prop]&&item[prop].toString().toUpperCase().indexOf(data) > -1) {
                  match = true;
                  break;
                }
            };
            return match;
        });
        this.filteredCustomers = filtered;
    }
    else {
      this.filteredCustomers = this.customers;
    }
  }

  deleteCustomer(id: number) {

  }
  
  addCustomer(){
     
  }

  sort(prop: string) {
      this.sorter.sort(this.filteredCustomers, prop);
  }

}
