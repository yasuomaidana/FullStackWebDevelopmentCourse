import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

//Forms stuffs
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
//Memory stuffs
import { Storage } from '@ionic/storage';
//User
import { User } from '../../shared/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm:FormGroup;
  user: User={username:'',password:''};

  constructor(private modalCtrl:ModalController,
    private fb:FormBuilder,
    private storage:Storage) {
      this.loginForm=fb.group({
        username:["",Validators.required],
        password:["",Validators.required],
        remember:true
      });
      storage.get("user").then(user=>{
        if(user){
          this.user=user;
          this.loginForm.patchValue({
            "username":this.user.username,
            "password":this.user.password})}
        else{
          console.log("user not defined");
        }
          });
      
    }

  ngOnInit() {
  }
  closeModal(){
    this.modalCtrl.dismiss();
  }
  onSubmit(){
    this.user.username=this.loginForm.get("username").value;
    this.user.password=this.loginForm.get("password").value;

    if (this.loginForm.get("remember").value){
      this.storage.set("user",this.user);
    }
    else{this.storage.remove("user");}
    this.modalCtrl.dismiss();
  }
}
