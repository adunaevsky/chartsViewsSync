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
interface chartHoverIndex {
  index: number
}

@Injectable({
  providedIn: 'root'
})
export class ChartSyncService {

  constructor() { }

  private sharedScrollStats = new Subject<chartSpecs>();
  private sharedHoverPoint = new Subject<chartHoverPoint>();
  private sharedHoverIndex = new Subject<chartHoverIndex>();

  sharedScrollStats$ = this.sharedScrollStats.asObservable();
  sharedHoverPoint$ = this.sharedHoverPoint.asObservable();
  sharedHoverIndex$ = this.sharedHoverIndex.asObservable();

  announceScrollStats(d: any) {
    this.sharedScrollStats.next(d);
  }
  announceHoverPoint(d: any) {
    this.sharedHoverPoint.next(d);
  }
  announceHoverIndex(d: any) {
    this.sharedHoverIndex.next(d);
  }

}
