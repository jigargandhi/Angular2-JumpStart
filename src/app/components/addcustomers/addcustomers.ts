import { Component, Inject } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS, FormBuilder, Validators, ControlGroup } from 'angular2/common';
import { RouterLink,Router } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import {NgForm, NgControl}    from 'angular2/common';
import {DataService} from '../../services/data.service';
import {Customer} from '../../models/customer';
@Component({
    //providers: [DataService],

    templateUrl: 'app/components/addcustomers/addcustomers.html',
    directives: [CORE_DIRECTIVES, NgForm, FORM_DIRECTIVES]
})
export class AddCustomer {
    private customerForm: ControlGroup;
    constructor(private dataservice: DataService, @Inject(FormBuilder) private fb: FormBuilder, private router:Router) {
        this.customerForm = fb.group({
            fname: ["", Validators.required],
            lname: ["", Validators.required],
            gender: ["male"],
            city: [""],
            statename: ["", Validators.required],
            stateabbr: ["", Validators.required],
            orderTotal: [0, Validators.required],
           
        });

    }

    onSubmit() {
        var newCust: Customer = {
            id: this.dataservice.getID(),
            firstName: this.customerForm.controls.fname.value,
            lastName: this.customerForm.controls.lname.value,
            gender: this.customerForm.controls.gender.value,
            city: this.customerForm.controls.city.value,
            state: {
                abbreviation: this.customerForm.controls.stateabbr.value,
                name: this.customerForm.controls.statename.value

            },
            orderTotal: +this.customerForm.controls.orderTotal.value
        }



        this.dataservice.addCustomer(newCust);
        this.router.navigate(["Customers"]);
    }
    addCustomer(cust: Customer) {

    }
}