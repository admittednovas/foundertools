import { Injectable } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckbreakpointService {

  public screensSizeObserver = new BehaviorSubject<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe('(max-width:992px)').subscribe(result => {
      this.screensSizeObserver.next(result.matches)
    })
  }
}
