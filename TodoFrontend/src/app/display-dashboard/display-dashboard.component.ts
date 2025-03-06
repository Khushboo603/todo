import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-dashboard',
  imports: [],
  templateUrl: './display-dashboard.component.html',
  styleUrl: './display-dashboard.component.css'
})
export class DisplayDashboardComponent implements OnInit{
  constructor(private store: Store<{counter:{counter:number}}>) {}

  counterDisplay!: number;
  ngOnInit(): void {
    this.store.select('counter').subscribe(data => {
      this.counterDisplay = data.counter
    })
  }
}
