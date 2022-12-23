import {Component, OnDestroy, OnInit} from '@angular/core';
import {City} from './shared/model/city.model';
import {CityService} from "./shared/services/city.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [`.cityPhoto {
    max-width: 200px
  }`]
})

// Class
export class AppComponent implements OnInit, OnDestroy {
  // Properties
  public currentCity: City;
  public cities: City[];
  public cityPhoto: string;
  private subscription: Subscription;

  constructor(private cityService: CityService) {

  }

  public ngOnInit(): void {
    this.subscription = this.cityService.getCities()
      .subscribe({
        next: cityData => {						                            // 1. success handler
          this.cities = cityData
        },
        error: err => console.log('ERROR: ', err),			          // 2. error handler
        complete: () => console.log('Getting cities complete')});	// 3. complete handler
  }

  public getCity(city: City): void {
    this.currentCity = city;
    this.cityPhoto = `assets/img/${this.currentCity.name}.jpg`;
  }

  public ngOnDestroy(): void {
    // If subscribed, we must unsubscribe before Angular destroys the component.
    // Failure to do so could create a memory leak.
    this.subscription.unsubscribe();
  }
}
