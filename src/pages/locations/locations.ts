import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrentLoc } from '../../app/interfaces/current-loc';
import { WeatherLocation } from '../../app/interfaces/weather-location';

/**
 * Generated class for the Locations page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  locs: Array<WeatherLocation>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Locations');
  }

  deleteLocation(loc) {
    console.log('deleteLocation');
  }

  addLocation() {
    console.log('addLocation');
  }
}
