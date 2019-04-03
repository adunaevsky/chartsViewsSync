import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface chartSpecs {
  start: number,
  end: number
}

interface chartHoverPoint {
  x: number,
  y: number
}

@Injectable({
  providedIn: 'root'
})
export class ChartSyncService {

  constructor() { }

  private sharedScrollStats = new Subject<chartSpecs>();
  private sharedHoverPoint = new Subject<chartHoverPoint>();

  sharedScrollStats$ = this.sharedScrollStats.asObservable();
  sharedHoverPoint$ = this.sharedHoverPoint.asObservable();

  announceScrollStats(d: any) {
    this.sharedScrollStats.next(d);
  }
  announceHoverPoint(d: any) {
    this.sharedHoverPoint.next(d);
  }

}
