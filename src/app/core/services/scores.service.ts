import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor(private http: HttpClient) { }

  public addScore(score: number): Observable<number> {
    return this.http.post<number>(`${environment.fbDBUrl}/scores.json`, score);
  }
}
