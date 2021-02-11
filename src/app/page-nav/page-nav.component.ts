import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';

type REDUCER = (acc: any, v: any, i: number) => any;

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNavComponent implements OnInit {
  data: Observable<[any[], REDUCER, any]>;

  constructor(private route: ActivatedRoute) {
    const t = this.route.queryParams.pipe(
      filter( P => !!P.t ),
      map( P => P['t'] ),
      tap( t => console.log("param t =", t) ),
      map( t => JSON.parse(t) ?? [5, 3, 1, 2, 4, 6] as any[] ),
      startWith( [6,5,4] )
    );

    const f = this.route.queryParams.pipe(
      filter( P => !!P.f ),
      map( P => P['f'] ),
      tap( f => console.log("param f =", f) ),
      map( f => f ? new Function("acc", "v", "i", f) as REDUCER : (a: any) => a ),
      startWith( function(acc: any) {return acc;} )
    );

    const acc = this.route.queryParams.pipe(
      filter( P => !!P.acc ),
      map( P => P.acc ),
      tap( acc => console.log("param acc =", acc) ),
      map( acc => JSON.parse( acc ) ),
      startWith( undefined )
    );

    this.data = combineLatest( [t, f, acc] );
  }

  ngOnInit() {
  }

}
