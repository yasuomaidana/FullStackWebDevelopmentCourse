import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
//Modal Tutorialhttps://www.youtube.com/watch?v=GWyNQYNg550&t=79s
import { FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  reservation:FormGroup;

  constructor(private modalCtrl:ModalController,
    private formBuilder:FormBuilder
    ) {
      this.reservation=this.formBuilder.group({
        guests:3,
        smoking:false,
        dateTime: ["",Validators.required],
      });
     }

  ngOnInit() {
  }
  
  closeModal(){
    this.modalCtrl.dismiss();
  }
  
  onSubmit(){
    console.log(this.reservation.value);
    this.modalCtrl.dismiss();
  }
}
