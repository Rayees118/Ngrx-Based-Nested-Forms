// src/app/store/effects/tournament.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TournamentActions from '../actions/tournament.actions';
import { AppService } from 'src/app/app.service';

@Injectable()
export class TournamentEffects {
  constructor(private actions$: Actions, private tournamentService: AppService) {}

  fetchTournamentData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TournamentActions.fetchTournamentData),
      mergeMap(() =>
        this.tournamentService.fetchTournamentData().pipe(
          map((data) => TournamentActions.fetchTournamentDataSuccess({ data })),
          catchError(() => of({ type: 'Error in fetchTournamentData' }))
        )
      )
    )
  );
}
