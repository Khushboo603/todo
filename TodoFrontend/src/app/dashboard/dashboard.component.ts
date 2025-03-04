import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  form: FormGroup
  constructor(private api: ApiService, private fb: FormBuilder) {
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
}
