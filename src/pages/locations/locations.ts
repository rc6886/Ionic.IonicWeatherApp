import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CurrentLoc } from '../../app/interfaces/current-loc';
import { WeatherLocation } from '../../app/interfaces/weather-location';
import { LocationsService } from '../../providers/locations-service';
import { GeocodeService } from '../../providers/geocode-service';
import { WeatherPage } from "../weather/weather";

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  locs: Array<WeatherLocation>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public locationsService: LocationsService,
              public geocodeService: GeocodeService,
              public alertCtrl: AlertController) {
    locationsService.getLocations().then(res => { this.locs = res; });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Locations');
  }

  deleteLocation(loc) {
    this.locationsService.removeLocation(loc);
  }

  addLocation() {
    let prompt = this.alertCtrl.create({
      title: 'Add a City',
      message: "Enter a city's name",
      inputs: [
        {
          name: "title",
          placeholder: "City name"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Add",
          handler: data => {
            if (data.title !== "") {
              this.geocodeService.getLatLong(data.title).then(res => {
                let newLoc = { title: "", component: WeatherPage, icon: "pin",
                  loc: { lat: 0, lon: 0}};

                newLoc.title = res.name;
                newLoc.loc.lat = res.location.latitude;
                newLoc.loc.lon = res.location.longitude;

                this.locationsService.addLocation(newLoc);
              }).catch(err => {
                console.error(err);
              });
            }
          }
        }
      ]
    });

    prompt.present();
  }
}
