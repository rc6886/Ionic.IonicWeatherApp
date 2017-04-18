import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { WeatherService } from '../../providers/weather-service';
import { Geolocation } from '@ionic-native/geolocation';
import { CurrentLoc } from '../../app/interfaces/current-loc';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  theWeather: any = {};
  currentData: any = {};
  daily: any = {};
  loader: LoadingController;
  refresher: Refresher;
  currentLoc: CurrentLoc = {lat:0, lon:0};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public weatherService: WeatherService,
              public loadingController: LoadingController,
              public geolocation: Geolocation) {
    let loader = this.loadingController.create({
      content: "Loading weather data...",
    });

    loader.present();

    // this.weatherService.getWeather().then(theResult => {
    //   this.theWeather = theResult;
    //   this.currentData = this.theWeather.currently;
    //   this.daily = this.theWeather.daily;
    // });

    this.geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);

      this.currentLoc.lat = pos.coords.latitude;
      this.currentLoc.lon = pos.coords.longitude;
      this.currentLoc.timestamp = pos.timestamp;
      return this.currentLoc;
    }).then(currentLoc => {
      weatherService.getWeather(currentLoc).then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.daily = this.theWeather.daily;
        loader.dismiss();
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Weather');
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
