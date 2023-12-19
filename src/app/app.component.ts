// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { fetchTournamentData } from './store/actions/tournament.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tournamentData$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(fetchTournamentData());
    this.tournamentData$ = this.store.select('tournament', 'data');
    this.loading$ = this.store.select('tournament', 'loading');
  }
}
