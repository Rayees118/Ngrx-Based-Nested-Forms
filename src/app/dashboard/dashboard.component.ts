import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { editPlayer, addPlayer } from '../store/actions/tournament.actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  @Input() tournamentData: any;
  loading = false;
  playerForm: FormGroup[][][] = [];
  newPlayerForm: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>, 
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.store.pipe(select('tournament'), takeUntil(this.unsubscribe$)).subscribe((state) => {
      this.tournamentData = state.data;
      console.log(this.tournamentData)
      this.loading = state.loading;
      this.initForms();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForms() {
    if (this.tournamentData) {
      this.playerForm = [];

      this.tournamentData.forEach((sport) => {
        const sportForms: FormGroup[][] = [];

        sport.teams.forEach((team) => {
          const teamForms: FormGroup[] = [];

          team.players.forEach((player) => {
            teamForms.push(
              this.fb.group({
                name: new FormControl(player.name, [Validators.required]),
                age: new FormControl(player.age, [Validators.required]),
              })
            );
          });

          sportForms.push(teamForms);
        });

        this.playerForm.push(sportForms);
      });

      this.newPlayerForm = this.fb.group({
        name: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
      });
    }
  }

  savePlayer(sportIndex: number, teamIndex: number, playerIndex: number) {
    const playerFormControl = this.playerForm[sportIndex][teamIndex][playerIndex];
  
    if (!playerFormControl.valid) {
      this.toastr.error('Name and Age is mandatory', 'Error');
      return;
    }
  
    const { name, age } = playerFormControl.value;
    this.store.dispatch(editPlayer({ sportIndex, teamIndex, playerIndex, name, age }));
  
    this.toastr.success('Player successfully updated', 'Success');
  }
  

  addNewPlayer(teamName: string) {
    const newPlayerForm = this.newPlayerForm;
  
    if (!newPlayerForm.valid) {
      this.toastr.error('Name and Age is mandatory', 'Error');
      return;
    }
  
    const { name, age } = newPlayerForm.value;
    this.store.dispatch(addPlayer({ teamName, name, age }));
  
    this.toastr.success('Player successfully added', 'Success');
  }
  

}
