import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type STEP<T, U> = [acc: U, v: T, i: number, next: U];

@Injectable()
export class AnimReducerService {

  constructor() {}

  startTT<T>(t: T[], f: (acc: T, v: T, i: number) => T, init?: T): [STEP<T, T>[], T] {
    let iS: number;
    let acc: T;
    const steps: STEP<T, T>[] = [];

    if (init === undefined) {
      if (t.length === 0) {
        throw new Error("Impossible d'appliquer reduce sur un tableau vide sans valeur initiale");
      }
      iS   = 1;
      acc = t[0];
    } else {
      iS = 0;
      acc = init;
    }

    for (let i = iS; i < t.length; i++) {
      steps.push( [acc, t[i], i, acc = f(acc, t[i], i)] );
    }

    return [steps, acc];
  }

  startTU<T, U>(t: T[], f: (acc: U, v: T, i: number) => U, init: U): [STEP<T, U>[], U] {
    let iS: number = 0;
    let acc: U = init;
    const steps: STEP<T, U>[] = [];

    for (let i = iS; i < t.length; i++) {
      steps.push( [acc, t[i], i, acc = f(acc, t[i], i)] );
    }

    return [steps, acc];
  }

}