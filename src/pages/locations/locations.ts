import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrentLoc } from '../../app/interfaces/current-loc';
import { WeatherLocation } from '../../app/interfaces/weather-location';
import { LocationsService } from '../../providers/locations-service';

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  locs: Array<WeatherLocation>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationsService: LocationsService) {
    locationsService.getLocations().then(res => { this.locs = res; });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Locations');
  }

  deleteLocation(loc) {
    this.locationsService.removeLocation(loc);
  }

  addLocation() {
    console.log('addLocation');
  }
}
