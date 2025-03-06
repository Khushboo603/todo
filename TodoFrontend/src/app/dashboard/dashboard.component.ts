import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DisplayDashboardComponent } from "../display-dashboard/display-dashboard.component";
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../service/store/counter.actions';
import { MaterialModule } from '../Material.Module';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, DisplayDashboardComponent, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  form: FormGroup
  constructor(private api: ApiService, private fb: FormBuilder, private store: Store<{counter: {counter: number}}>) {
    this.api.get().subscribe(res => {
      console.log(res)
    });

    this.form = this.fb.group({
      title : [''],
      details: [''],
      date: ['']
    })
  }

  submit() {
    console.log(this.form.value);
    this.api.post(this.form.value).subscribe(res => {
      console.log(res);
    })
  }

  onIncrement() {
    this.store.dispatch(increment());
  }
  onDecrement() {
    this.store.dispatch(decrement());
  }
  onReset() {
    this.store.dispatch(reset());
  }
}
