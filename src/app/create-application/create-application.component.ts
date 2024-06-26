import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import * as L from 'leaflet';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { CarouselComponent } from 'ngx-bootstrap/carousel';

export interface DialogData {
 next: any;
 details:{},
 modify:''
}

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class CreateApplicationComponent {
  private map!: L.Map;
  private center!: L.LatLng;
  private markers: L.Marker[] = [];
  showRecommend:boolean=true;
  @ViewChild('stepper') stepper: MatStepper | any;
 
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
    this.showRecommend=true;
    this.listOfCoordinates=[];
    this.listOfCoordinates=[...this.initialListOfCoordinates]
  }
  showNearByCenters(){
    this.showRecommend=false;
    this.listOfCoordinates=[];
    this.listOfCoordinates=[...this.nearbyCenterCoordinates]
  }
  // carousel
  itemsPerSlide = 6;
  singleSlideOffset = false;
 noWrap=false;
  showMorningSlot:boolean=true;
  slotList:any=[];
 morningSlotList=[
  {slotTime:'09:00-09:15',slots:3},
  {slotTime:'09:15-09:30',slots:3},
  {slotTime:'09:30-09:45',slots:10},
  {slotTime:'09:45-10:00',slots:5},
  {slotTime:'10:00-10:15',slots:2},
  {slotTime:'10:15-10:30',slots:6},
  {slotTime:'10:30-10:45',slots:3},
  {slotTime:'10:45-11:00',slots:3},
  {slotTime:'11:00-11:15',slots:3},
  {slotTime:'11:15-11:30',slots:3},
  {slotTime:'11:30-11:45',slots:3},
  {slotTime:'11:45-12:00',slots:3},
  {slotTime:'12:00-12:15',slots:3},
  {slotTime:'12:15-12:30',slots:3},
  {slotTime:'12:30-12:45',slots:3},
  {slotTime:'12:45-01:00',slots:3}
 ]
 afternoonSlotList=[
  {slotTime:'02:00-02:15',slots:3},
  {slotTime:'02:15-02:30',slots:3},
  {slotTime:'02:30-02:45',slots:10},
  {slotTime:'02:45-03:00',slots:5},
  {slotTime:'03:00-03:15',slots:2},
  {slotTime:'03:15-03:30',slots:6},
  {slotTime:'03:30-03:45',slots:3},
  {slotTime:'03:45-04:00',slots:3},
  {slotTime:'04:00-04:15',slots:3},
  {slotTime:'04:15-04:30',slots:3},
  {slotTime:'04:30-04:45',slots:3},
  {slotTime:'04:45-05:00',slots:3},
  {slotTime:'05:00-05:15',slots:3},
  {slotTime:'05:15-05:30',slots:3},
  {slotTime:'05:30-05:45',slots:3},
  {slotTime:'05:45-06:00',slots:3}
 ]
showMorningList(){

  this.showMorningSlot=true;
  this.slotList=[];
  this.slotList=this.morningSlotList;
  this.selectedTimeIndex=0;
  this.selectedTimeSlot=this.slotList[this.selectedTimeIndex].slotTime
}
showAfternoonList(){
  this.showMorningSlot=false;
  this.slotList=[];
this.slotList=this.afternoonSlotList;
this.selectedTimeIndex=0;
  this.selectedTimeSlot=this.slotList[this.selectedTimeIndex].slotTime
}
  // carousel end
  firstFormGroup = this._formBuilder.group({
    title: [''],
    name:[''],
    gender:[''],
    date:[''],
    nationality:[''],
    confirmation:[''],
    placeOfBirth:[''],
    birthPay:[''],
    region:[''],
    province:[''],
    city:[''],
    zone:[''],
    postalCode:[''],
    residenceStatus:[''],
    habitatType:[''],
    portNo:[''],
    apptNo:[''],
    addressLine1:[''],
    cnie:[''],
    iHave:[''],
    foreignIdentityNum:[''],
    passport:[''],
    idcs:[''],
    birthCert:[''],
    digBirthCert:[''],
    phone:[''],
    email:[''],
    tutorTypes:[''],
    introducerName:[''],
    introducerUIN:[''],
    introducerRID:[],
    introducerCNIE:[],
    relationship:[]
  });

  secondFormGroup = this._formBuilder.group({
    identityProof: [''],
    docRefId:['']
  });

  titles:any=[
    {id: 1,name: "Mr"},
    {id: 2,name: "Miss"},
    {id: 3,name: "Missus"}
  ];
  genders:any=[
    {id:1,name:"Male"},
    {id:2,name:"Female"},
    {id:3,name:"Others"}
  ];
  nationalities:any=[
    {id:1,name:"French"},
    {id:2,name:"Egyptian"},
  ];

  confirmations:any=[
    {id:1,name:"Oui",value:true},
    {id:2,name:"Non",value:false}
  ];
  birthPlaces:any=[
    {id:1,name:"Rabat-agdal",},
    {id:2,name:"Casa-Maarif",}
  ];
  birthPay:any=[
    {id:1,name:"France",},
    {id:2,name:"Egypt",}
  ];
  regions:any=[
    {id:1,name:"Rabat Sale Kenitra"}
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
    {id:1,name:"Ben Mansour"},
    {id:2,name:"Mansara"},
    {id:3,name:"Mograne"},
    {id:4,name:"Assam"},
    {id:5,name:"Mehdia"}
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
  idProofType:any=[
    {id: 1,name: "Reference Identity Proof"}
  ]

  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog) {}

  public imageId!: any;
  public selectedFile!: File;
  // 2nd step upload documents
  onFileSelected(id: string, event: any) {
    this.imageId = id;
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name, id);
    console.log(this.selectedFile, id);
  }

  uploadImage1() {
    // if (this.selectedFile) {
    //   console.log(this.selectedFile);
  
    //   this.appraisalService.uploadImageInDb(this.selectedFile).pipe(
    //     tap((response: any) => {
    //       let returnObject: any = response;
    //       let uuid = returnObject.message;
    //       console.log(uuid);
    //       console.log(this.imageId);
          
    //       if (this.imageId) {
    //         console.log(this.imageId);
    //         console.log(uuid);
    //         this.thirdFormGroup.get(this.imageId)?.setValue(uuid);
    //       }
    //     }),
    //     catchError((error: any) => {
    //       console.error('Error:', error);
    //       throw error; // Rethrow the error to propagate it to the subscriber
    //     })
    //   ).subscribe();
    // }
  }
  


  // map 
  @ViewChild('carousel', { static: false }) carousel!: CarouselComponent;
  nextSlide() {
    this.carousel.nextSlide();
  }

  previousSlide() {
    this.carousel.previousSlide();
  }
  dateList: { name: string, date: string }[] = [];
  generateDateList() {
    const currentDate = new Date();    
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
// const nextMonth= new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);
const nextMonth= (new Date().getMonth()+1)%12 + 1
const daysInNextMonth=new Date(currentYear, nextMonth+1,0).getDate();


    for (let day = currentDate.getDate(); day <=daysInMonth+daysInNextMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      // const formattedDate = date.toLocaleDateString('en-US');
      const formattedDate=date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      this.dateList.push({ name: dayName, date: formattedDate });
    }
  }
  selectedDate:any;
  selectedDay:any;
  isShowMap:boolean=true;
  selectedTimeSlot:any;
  selectedDateIndex:any=0;
  selectedTimeIndex:any=0;
  showBookAppointmentData(){
    this.isShowMap=false;
  }
  showBookMapData(){
    this.isShowMap=true;
  }
  saveDate(details:any,index:any){
    this.selectedDateIndex=index;
    this.selectedDate=details.date;
    this.selectedDay=details.name;
    
  }
  saveTimeSlots(details:any,index:any){
    this.selectedTimeIndex=index;
this.selectedTimeSlot=details.slotTime
  }
  ngOnInit(): void{
    this.slotList=this.morningSlotList;
    this.selectedTimeSlot=this.slotList[this.selectedTimeIndex].slotTime;
    this.listOfCoordinates=this.initialListOfCoordinates;
    this.selectedDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    this.selectedDay= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toLocaleDateString('en-US', { weekday: 'long' });
    this.generateDateList();
  }
 
  ngAfterViewInit(): void {
    this.stepper.selectionChange.subscribe((event: any) => {
      if (event.selectedIndex === 2) {
        this.initMap();
      }
    });
  }
  private initMap(): void {
    if(!this.map){
    this.map = L.map('map', {
      center: [12.9716, 77.5946],
      zoom: 13
    });
  
    this.center = L.latLng(12.9716, 77.5946);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([12.9716, 77.5946]).addTo(this.map)
    .bindPopup('Banglore')
    .openPopup();
  }
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

  // open dialog
  openPreview(): void {
    console.log(this.stepper);
    
    const dialogRef = this.dialog.open(PreviewDialog, {
      data: {
         details:this.firstFormGroup.value,
         next:this.stepper,
         
      },
      width:'1100px',
      height:'500px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result);
      // if(result==true){
      //   this.router.navigate(['createApplication'])
      // }else{
      //   this.router.navigate(['myApplications']) 
      // }
      
      console.log('The dialog was closed');
     
    });
  }
}

// preview dialog
@Component({
  selector: 'PreviewDialog',
  templateUrl: 'preview-dialog.html',
  styleUrls:['preview-dialog.css']
})
export class PreviewDialog {
  public userDetails:any;
  constructor(
    public dialogRef: MatDialogRef<PreviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder:FormBuilder
  ) {}
ngOnInit(){
  console.log(this.data);
  this.userDetails=this.data.details;
  
}
goToBookAppointment() {
  
  this.data.next.selectedIndex = 2;
  this.dialogRef.close(this.data.next.selectedIndex); 
}
goToDemographicDetails(){
  this.data.next.selectedIndex = 0;
  this.dialogRef.close(this.data.next.selectedIndex); 
}
  onNoClick(): void {
    
    this.dialogRef.close();
    
  }
  
  checkbox = this.formBuilder.group({
    terms_con_check:false
  });
  setValue(val:any){
  }
}