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
  listOfCoordinates:any=[];
  initialListOfCoordinates=[
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
   nearbyCenterCoordinates = [
    { place: 'Uppal', latitude: 17.3984, longitude: 78.5583 },
    { place: 'Habsiguda', latitude: 17.4066, longitude: 78.5438},
    { place: 'LB Nagar', latitude: 17.3457, longitude: 78.5522},
  ];
  showRecommendCenters(){
    this.listOfCoordinates=[];
    this.listOfCoordinates=[...this.initialListOfCoordinates]
  }
  showNearByCenters(){
    this.listOfCoordinates=[];
    this.listOfCoordinates=[...this.nearbyCenterCoordinates]
  }
  firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    name:['', Validators.required],
    gender:['',Validators.required],
    date:[''],
    nationality:['',Validators.required],
    confirmation:['', Validators.required],
    placeOfBirth:['',Validators.required],
    birthPay:['',Validators.required],
    region:['',Validators.required],
    province:['',Validators.required],
    city:['',Validators.required],
    zone:['',Validators.required],
    postalCode:['',Validators.required],
    residenceStatus:['',Validators.required],
    habitatType:['',Validators.required],
    portNo:[''],
    apptNo:[''],
    addressLine1:['', Validators.required],
    cnie:['', Validators.required],
    iHave:['',Validators.required],
    foreignIdentityNum:['', Validators.required],
    passport:['',Validators.required],
    idcs:['',Validators.required],
    birthCert:['',Validators.required],
    digBirthCert:['',Validators.required],
    phone:['',Validators.required],
    email:['',Validators.required],
    tutorTypes:[''],
    introducerName:[''],
    introducerUIN:[''],
    introducerRID:[],
    introducerCNIE:[],
    relationship:[]
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  titles:any=[
    {id: 1,name: "Mr"},
    {id: 2,name: "Miss"},
    {id: 3,name: "Missus"}
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
      name:"French"
    },
    {
      id:2,
      name:"Egyptian"
    },
  ];

  confirmations:any=[
    {
      id:1,
      name:"Oui",
      value:true
    },
    {
      id:2,
      name:"Non",
      value:false
    }
  ];
  birthPlaces:any=[
    {
      id:1,
      name:"Rabat-agdal",
    },
    {
      id:2,
      name:"Casa-Maarif",
    }
  ];
  birthPay:any=[
    {
      id:1,
      name:"France",
    },
    {
      id:2,
      name:"Egypt",
    }
  ];
  regions:any=[
    {
      id:1,
      name:"Rabat Sale Kenitra",
    }
  ];
  provinces:any=[
    {id:1,name:"Kenitra",},
    {id:2,name:"Rabat",}
  ];
  cities:any=[
    {id:1,name:"Kenitra"},
    {id:2,name:"Rabat"}
  ];
  zones:any=[
    {id:1,name:"Ben Mansour",},
    {
      id:2,
      name:"Mansara",
    },
    {
      id:3,
      name:"Mograne"
    },
    {
      id:3,
      name:"Assam"
    },
    {
      id:3,
      name:"Mehdia"
    }
    
  ];

  postalCodes:any=[
    {id: 1,name: 14022},
    {id: 2,name: 10110},
    {id: 3,name: 10111},
    {id: 3,name: 10113},
  ];
  residentTypes:any=[
    {id: 1,name: "Foreigner"},
    {id: 2,name: "Non-Foreigner"}
  ];
  habitatTypes:any=[
    {id: 1,name: "individual"},
    {id: 2,name: "Collective"},
  ];
  iHave:any=[
    {id: 1,name: "Residence Card"},
    {id: 2,name: "Passport"},
  ];
  idcs:any=[
    {id: 1,name: "oui"},
    {id: 2,name: "non"},
  ];
  tutorTypes:any=[
    {id: 1,name: "juge de tuteur"}
  ];
  relationships:any=[
    {id: 1,name: "juge de tuteur"},
    {id: 1,name: "juge de tuteur"}
  ]

  constructor(private _formBuilder: FormBuilder) {}

  // map 
  ngOnInit(): void{
    this.listOfCoordinates=this.initialListOfCoordinates
    // setTimeout(()=>{
    //   this.initMap();
    // },2000)
    this.initMap();
  }
  loadMap(){
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