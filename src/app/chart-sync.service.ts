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
interface isActiveTip {
  activeTip: boolean,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class ChartSyncService {

  constructor() { }

  private sharedScrollStats = new Subject<chartSpecs>();
  private sharedHoverPoint = new Subject<chartHoverPoint>();
  private sharedHoverIndex = new Subject<chartHoverIndex>();
  private sharedActiveTip = new Subject<isActiveTip>();

  sharedScrollStats$ = this.sharedScrollStats.asObservable();
  sharedHoverPoint$ = this.sharedHoverPoint.asObservable();
  sharedHoverIndex$ = this.sharedHoverIndex.asObservable();
  sharedActiveTip$ = this.sharedActiveTip.asObservable();

  announceScrollStats(d: any) {
    this.sharedScrollStats.next(d);
  }
  announceHoverPoint(d: any) {
    this.sharedHoverPoint.next(d);
  }
  announceHoverIndex(d: any) {
    this.sharedHoverIndex.next(d);
  }
  announceActiveTip(d: any) {
    this.sharedActiveTip.next(d);
  }

}
