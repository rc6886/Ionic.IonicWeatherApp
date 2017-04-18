import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CurrentLoc } from '../app/interfaces/current-loc';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {
  data: any = null;

  constructor(public http: Http) {
    console.log('Hello WeatherService Provider');
  }

  load(currentLoc: CurrentLoc) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      console.log('/api/forecast/' + currentLoc.lat + ',' + currentLoc.lon);
      this.http.get('/api/forecast/' + currentLoc.lat + ',' + currentLoc.lon)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getWeather(currentLoc: CurrentLoc) {
    this.data = null;

    return this.load(currentLoc).then(data => {
      return data;
    });
  }
}
