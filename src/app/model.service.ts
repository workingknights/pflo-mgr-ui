import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';

import { Auth } from './auth.service';
import { Model, ModelEntry } from './model';

@Injectable()
export class ModelService {

  constructor(
    private auth: Auth,
    private authHttp: AuthHttp) { }

  private modelUrl = 'api/model';

  public getModel(id: string): Observable<Model> {
    return this.authHttp.get(`${this.modelUrl}/${id}`)
      .map(res => {
        if (res.status === 200) {
          return res.json() as Model;
        } else {
          return Observable.throw(new Error('Unexpected response status! [' + res.status + ']'));
        }
      })
      .catch(this.handleError);
  }

  public getModelForCurrentUser(): Observable<Model> {
    return this.authHttp.get(this.modelUrl)
      .map(res => res.json() as Model);
  }

  public createModel(): Observable<Model> {
    let newModel = new Model('', '', []);
    return this.authHttp.post(this.modelUrl, newModel)
      .flatMap((res: Response) => {
        let location = res.headers.get('Location');
        console.log('loading model from location: ' + location);
        return this.authHttp.get(location);
      })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public getAndCreateModel(): Observable<Model> {
    return this.authHttp.get(this.modelUrl)
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            return res.json() as Model;
          }
        } else {
          console.log('Response was empty!');
        }
      })
      .catch((error: any) => {
        if (error.status === 404) {
          // Need to create new model for user on first usage
          this.createModel();
        }
        else if (error.status === 500) {
          return Observable.throw(new Error(error.status));
        }
      });
  }

  public addModelEntry(modelId: String, modelEntry: ModelEntry): Observable<Model> {
    console.log('addModelEntry() json=' + JSON.stringify(modelEntry));

    const url = `${this.modelUrl}/${modelId}/entry`;

    return this.authHttp.put(url, modelEntry)
      .flatMap((res: Response) => {
        return this.authHttp.get(`${this.modelUrl}/${modelId}`);
      })
      .map((res: Response) => {
        return res.json() as Model;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
