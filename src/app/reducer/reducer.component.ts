import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { filter, map, multicast,  refCount,    scan, takeWhile, tap } from 'rxjs/operators';
import { AnimReducerService, STEP } from '../anim-reducer.service';

type STEPANY = STEP<any, any>;

@Component({
  selector: 'app-reducer',
  templateUrl: './reducer.component.html',
  styleUrls: ['./reducer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReducerComponent implements OnInit {
  @Input() t: unknown[] = [];
  @Input() f: (a: any, v: any, i: number) => any = a => a;
  @Input() acc: any = undefined;

  steps!: Observable<STEPANY[]>;
  res: [STEPANY[], any] = [[], undefined];
  stepNum = new BehaviorSubject<number>(-1);
  indexObs!: Observable<number>;

  constructor(private rs: AnimReducerService) { }

  ngOnInit() {
    this.res = this.rs.startTT(this.t, this.f, this.acc);
    this.restartStepping();
  }

  hasNextStep(): boolean {
    return this.res[0].length - 1 > this.stepNum.value;
  }

  fctString(): string {
    const str = this.f.toString();
    return str.toString().slice(str.indexOf("{") + 1, str.lastIndexOf("}"))
  }

  get labelButton(): string {
    if (this.stepNum.value === -1) {
      return "Commencer";
    } else {
      return this.hasNextStep() ? "SUIVANT" : "RECOMMENCER";
    }
  }

  nextStep(): void {
    if (this.hasNextStep()) {
      this.stepNum.next( this.stepNum.value + 1 );
    } else {
      this.restartStepping();
      this.stepNum.next( -1 );
    }
  }

  private restartStepping(): void {
    this.steps = this.stepNum.pipe(
      filter( i => i >= 0),
      map( i => this.res[0][i] ),
      takeWhile( step => step !== undefined ),
      scan( (L, s) => [...L, s], [] as STEPANY[]),
      multicast( () => new BehaviorSubject<STEPANY[]>([]) ),
      refCount()
    );

    this.indexObs = this.steps.pipe(
      filter( LS => LS.length >= 1 ),
      map( LS => LS[LS.length - 1][2] ),
      tap( console.log )
    )
  }

}
