import { createAction, props } from '@ngrx/store';

export const fetchTournamentData = createAction('[Tournament] Fetch Data');
export const fetchTournamentDataSuccess = createAction('[Tournament] Fetch Data Success', props<{ data: any }>());
export const editPlayer = createAction('[Tournament] Edit Player', props<{ sportIndex: number; teamIndex: number, playerIndex: number, name: string; age: number }>());
export const addPlayer = createAction('[Tournament] Add Player', props<{ teamName: string; name: string; age: number }>());
