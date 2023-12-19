import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { tournamentReducer } from './store/reducers/tournament.reducer';
import { TournamentEffects } from './store/effects/tournament.effects';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ tournament: tournamentReducer }),
    EffectsModule.forRoot([TournamentEffects]),
    ToastrModule.forRoot()
  ],
  providers: [AppService,
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

