import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherService } from '../../providers/weather-service';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  theWeather: any = {};
  currentData: any = {};
  daily: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public weatherService: WeatherService) {
    this.weatherService.getWeather().then(theResult => {
      this.theWeather = theResult;
      this.currentData = this.theWeather.currently;
      this.daily = this.theWeather.daily;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Weather');
  }

}
