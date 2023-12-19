import { createReducer, on } from '@ngrx/store';
import * as TournamentActions from '../actions/tournament.actions';

export interface TournamentState {
  data: any;
  loading: boolean;
}

export const initialState: TournamentState = {
  data: null,
  loading: false,
};

export const tournamentReducer = createReducer(
  initialState,
  on(TournamentActions.fetchTournamentData, (state) => ({ ...state, loading: true })),
  on(TournamentActions.fetchTournamentDataSuccess, (state, { data }) => ({ data, loading: false })),

  on(TournamentActions.editPlayer, (state, { sportIndex, teamIndex, playerIndex, name, age }) => {
    const newData = JSON.parse(JSON.stringify(state.data)); // Deep copy the state
    newData[sportIndex].teams[teamIndex].players[playerIndex].name = name;
    newData[sportIndex].teams[teamIndex].players[playerIndex].age = age;
    return { ...state, data: newData };
  }),

  on(TournamentActions.addPlayer, (state, { teamName, name, age }) => {
    const newData = JSON.parse(JSON.stringify(state.data)); // Deep copy the state
    const teamIndex = newData.findIndex((sport) => sport.teams.some((team) => team.team_name === teamName));
    newData[teamIndex].teams.find((team) => team.team_name === teamName).players.unshift({ name, age });
    return { ...state, data: newData };
  })

);
