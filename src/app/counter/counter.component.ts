import { Component, OnInit } from '@angular/core';
import { from, interval, of, take } from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnInit{

  ngOnInit() {

    // 1. using of
    const scores$ = of(67, 68, 69, 70)

    scores$.subscribe({
      next: score => console.log('Score',score),
      error: err => console.error(err),
      complete: () => console.log('Obersvable completed')
    })

    // 2. using from
    const colors$ = from(['black', 'pink', 'purple', 'green'])

    colors$.subscribe({
      next: color => console.log('Color: ', color),
      error: err => console.error(err),
      complete: () => console.log('From observable completed')
    })
    
    // 3. using interval
    const interval$ = interval(1000);
    interval$.pipe(take(5))
    .subscribe({
     next: value => console.log('Stream: ' + value, 'Timestamp:' + new Date().toLocaleTimeString()),
     error: err => console.error(err),
     complete: () => console.log('Interval observable completed')
  })
  }
  
}
