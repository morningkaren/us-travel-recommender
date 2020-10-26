import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ServiceService } from './service.service';
import { MatTableDataSource } from '@angular/material/table';
import { StateModalComponent } from './state-modal/state-modal.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PredictionsElement {
  state: string;
  city: string;
  description: string;
  images_title: string;
}

export interface MonthsElement {
  State: string;
  Month: string;
  Details: string;
  costRank: number;
  jpg_url: string;
}

export interface PhotosElement {
photo_url: string;
titles: string;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataSourcePhotos = new MatTableDataSource<PhotosElement>([]);
  showSpinner = false;
  title = 'travel-app';
  lat = 51.768418;
  lng = 7.809007
  myForm: FormGroup;
  predictions;
  dataSource0 = new MatTableDataSource<MonthsElement>([]);
  dataSource = new MatTableDataSource<PredictionsElement>([]);
  displayedColumns0 = ['State', 'Month', 'Details', 'costRank', 'jpg_url']
  displayedColumns= ['state', 'city', 'images_title', 'description'];
  selectedLevel;
  total_selectedLevel= []
  selectedMonth;
  total_selectedMonth = []
  state_query_dict = {}
  visit_months = {}
  months = ["All",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"]
  states = ["All",
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia_(state)",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New_Hampshire",
            "New_Jersey",
            "New_Mexico",
            "New_York_(state)",
            "North_Carolina",
            "North_Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode_Island",
            "South_Carolina",
            "South_Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington_(state)",
            "West_Virginia",
            "Wisconsin",
            "Wyoming"]
  public doFilter = (value: string) => {
    this.dataSourcePhotos.filter = value.trim().toLocaleLowerCase();
  }

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>()

  constructor(private _formBuilder: FormBuilder,
              public service: ServiceService,
              public dialog: MatDialog,
              public http: HttpClient) {}

  ngOnInit() {


    this.myForm = this._formBuilder.group({query: ['', Validators.required]})
    this.http.get<any>('http://127.0.0.1:5000/photo_gallery').subscribe(data=> {
    this.dataSourcePhotos.data = data; console.log('PHOTO URLS', this.dataSourcePhotos);
    this.dataSourcePhotos.paginator = this.paginator.toArray()[1];
    }
    )
    }

  selected(){this.total_selectedLevel.push(this.selectedLevel); console.log(this.total_selectedLevel)}

  selected_months() {this.total_selectedMonth.push(this.selectedMonth); console.log(this.total_selectedMonth)}

  sendMonths(post_body) {
  this.service.visitTimes(post_body).subscribe((data: MonthsElement[]) =>
  {
  this.dataSource0.data = data; console.log('DATASOURCE0', this.dataSource0.data);
  this.dataSource0.paginator = this.paginator.toArray()[0];
  this.dataSource0.sort = this.sort.toArray()[0];
  }
    )}

  submit_months() {console.log('Months submitted');
                   this.visit_months['months'] = this.total_selectedMonth
                   this.sendMonths(this.visit_months)
                   }

  submit() { console.log('Submit button Pressed');
             console.log(this.myForm.value.query);
             this.state_query_dict['state'] = this.total_selectedLevel
             this.state_query_dict['query'] = this.myForm.value.query
             this.sendData(this.state_query_dict); }



  sendData(post_body) {
  this.showSpinner = true;
  this.service.cdqa(post_body).subscribe((data: PredictionsElement[]) =>
  {this.dataSource.data = data; console.log('DATASOURCE', this.dataSource.data);
    this.showSpinner= false;
  }
  )}

  reset_months() {this.total_selectedMonth = []; this.visit_months = {}}
  reset_state() {this.total_selectedLevel = []}

  openStateModal(element, i) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.width = '40vw';
  dialogConfig.height = '50vh';
  this.dialog.open(StateModalComponent ,{data: {jpg_url : this.dataSource0.data[i].jpg_url, State: this.dataSource0.data[i].State}})
  }

  openImageModal(element, i) {
  this.dialog.open(ImageModalComponent, {data : {image_url: this.dataSource.data[i].images_title, city: this.dataSource.data[i].city}})
}



}




