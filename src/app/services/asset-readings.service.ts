import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetReadingsService {

  private GET_ASSET = environment.base_url + 'asset';

  constructor(private http: HttpClient) { }

  /**
  * GET  | fledge/asset
  * Return a summary count of all asset readings
  */
  public getAsset() {
    return this.http.get(this.GET_ASSET).pipe(
      map(response => response),
      catchError((error: Response) => observableThrowError(error)));
  }

  /**
  *  /fledge/asset/{assetCode}
  * @param assetCode
  * @param limit
  * @param offset
  *  Return a set of asset readings for the given asset code
  */
  public getAssetReadings(assetCode, limit: Number = 0, offset: Number = 0) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit.toString());
      params = params.set('skip', offset.toString());
    } else if (limit) {
      params = params.set('limit', limit.toString());
    } else if (offset) {  // offset works withOUT limit in postgres!
      params = params.set('skip', offset.toString());
    }

    return this.http.get(this.GET_ASSET + '/' + encodeURIComponent(assetCode), { params: params }).pipe(
      map(response => response),
      catchError((error: Response) => observableThrowError(error)));
  }

  public getAssetSummary(assetObject: any) {
    let params = new HttpParams();
    if (assetObject.time !== undefined) {
      const keys = Object.keys(assetObject.time);
      params = params.set(keys[0], assetObject.time[keys[0]]);
    }
    return this.http.get(this.GET_ASSET + '/' + encodeURIComponent(assetObject.assetCode)
      + '/' + assetObject.reading + '/summary', { params: params }).pipe(
        map(response => response),
        catchError((error: Response) => observableThrowError(error)));
  }
}
