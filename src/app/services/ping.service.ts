import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PingService {

  private PING = environment.base_url + 'ping';
  constructor(private http: HttpClient) { }

  /**
   *    GET  | /fledge/ping
   */
  public ping() {
    return this.http.get(this.PING).pipe(
      map(response => response),
      catchError((error: Response) => observableThrowError(error)));
  }
}
