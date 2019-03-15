import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface chartSpecs {
  start: number,
  end: number
}

@Injectable({
  providedIn: 'root'
})
export class ChartSyncService {

  constructor() { }

  private sharedScrollStats = new Subject<chartSpecs>();
  sharedScrollStats$ = this.sharedScrollStats.asObservable();

  announceScrollStats(d: any) {
    this.sharedScrollStats.next(d);
  }

}
