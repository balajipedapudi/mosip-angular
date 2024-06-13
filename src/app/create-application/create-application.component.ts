import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent {
  private map!: L.Map;
  private center!: L.LatLng;
  private markers: L.Marker[] = [];
  listOfCoordinates=[
    {
      "place":"Hyderabad",
      "latitude":17.4065,
      "longitude":78.4772
    },
    {
      "place":"Visakhapatnam",
      "latitude":17.6868,
      "longitude":83.2185
    }
  ]
  firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    name:['', Validators.required],
    gender:['',Validators.required],
    date:[''],
    nationality:['',Validators.required],
    confirmation:['', Validators.required]




  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  titles:any=[
    {
      id:1,
      name:"Mr"
    },
    {
      id:2,
      name:"Miss"
    },
    {
      id:3,
      name:"Missus"
    }
  ];
  genders:any=[
    {
      id:1,
      name:"Male"
    },
    {
      id:2,
      name:"Female"
    },
    {
      id:3,
      name:"Others"
    }
  ];
  nationalities:any=[
    {
      id:1,
      name:"Indian"
    },
    {
      id:2,
      name:"American"
    },
    {
      id:3,
      name:"Britian"
    }
  ];

  confirmations:any=[
    {
      id:1,
      name:"Yes",
      value:true
    },
    {
      id:2,
      name:"No",
      value:false
    }
  ];
  placeOfBirth:any=[
    {
      id:1,
      name:"New Delhi",
    },
    {
      id:2,
      name:"Mumbai",
    },
    {
      id:2,
      name:"Andhra Pradesh",
    },
  ];

  constructor(private _formBuilder: FormBuilder) {}

  // map 
  ngOnInit(): void{
    // setTimeout(()=>{
    //   this.initMap();
    // },2000)
   this.initMap();
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [12.9716, 77.5946],
      zoom: 13
    });
  
    this.center = L.latLng(12.9716, 77.5946);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([12.9716, 77.5946]).addTo(this.map)
    .bindPopup('name')
    .openPopup();
  }

  changeToNearbyCoordinates(latitude: number, longitude: number,place:string): void {
    console.log(latitude,longitude);
    
    this.map.setView([latitude, longitude], 13);
    L.marker([latitude, longitude]).addTo(this.map)
    .bindPopup(place)
    .openPopup();
  }
  

  setNearbyCoordinates(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
  
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
  
        const nearbyCenters = [
          { place: 'Nearby Place 1', latitude: userLatitude + 0.01, longitude: userLongitude + 0.01 },
          { place: 'Nearby Place 2', latitude: userLatitude + 0.02, longitude: userLongitude + 0.02 },
          { place: 'Nearby Place 3', latitude: userLatitude - 0.01, longitude: userLongitude - 0.01 },
        ];
  
        
        nearbyCenters.forEach(center => {
          const marker = L.marker([center.latitude, center.longitude]).addTo(this.map);
          marker.bindPopup(`<b>${center.place}</b>`).openPopup();
          this.markers.push(marker);
        });
  
     
        this.map.setView([userLatitude, userLongitude], 13);
      }, (error) => {
        console.error('Error getting user location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
showPosition(position:any) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  this.map.setView([position.coords.latitude, position.coords.longitude], 13);

  }
  // resetMap(): void {
  //   this.map.setView([12.9716, 77.5946], 13);
  // }
  resetMap(): void {
    // Clear existing markers
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
    // Reset map center to initial coordinates
    this.map.setView([37.7749, -122.4194], 13);
  }
  // map end
}