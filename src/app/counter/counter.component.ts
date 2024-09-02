import { Component, OnInit } from '@angular/core';
import { concat, concatMap, from, interval, Observable, of, take, throwError } from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  constructor() {

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


  // 4. combine observables
  const numberObservable$ = of(1,2,3,4);
  const names$ = from(['Rhoda', 'Jacobs', 'Alice', 'Jessica']);

  // combined observable
  const combinedObservable$ = concat(numberObservable$, names$);

  // subscribe
  combinedObservable$.subscribe({
    next: value => console.log('Value: ', value),
    error: err => console.error(err),
    complete: () => console.log('Combined observable completed')
  })
  
  

// 5. error handling
const errorObservable$ = of(1, 2, 3).pipe(
  concatMap((value) => {
    if (value === 3) {
      return throwError('An Error occurred after emitting 3');
    }
    return of(value);
  })
);

errorObservable$.subscribe({
  next: (value) => console.log('Emmited value:', value),
  error: (error) => console.error(error),
  complete: () => console.log('Error Observable completed'),
})
}}

