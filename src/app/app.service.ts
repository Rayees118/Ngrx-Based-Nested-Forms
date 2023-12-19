import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'https://mocki.io/v1/b4544a37-0765-405f-baf6-6675845d5a0e';

  constructor(private http: HttpClient) {}

  fetchTournamentData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => data),
      catchError((error) => {
        console.error('Error fetching tournament data:', error);
        return of(null);
      })
    );
  }
}