import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Validators, FormGroup, FormBuilder} from '@angular/forms';

import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
//https://ionicframework.com/blog/storing-photos-with-the-cordova-camera-and-file-plugins/

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  image:string ='assets/images/logo.png';
  constructor(public modalCtrl:ModalController,
    public camera:Camera,
    private fb:FormBuilder,
    private webview:WebView) {
      
      this.registerForm=this.fb.group({
        firstname: ["",[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
        lastname: ["",[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
        username: ["",[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
        password: ["",[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
        telnum: ["",[Validators.required,Validators.pattern("[0-9]*")]],
        email: ["",[Validators.required,Validators.email]]
      });
    }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss(true)
  }
  getPicture(){
    const options:CameraOptions={
      quality:100,
      targetHeight:100,
      targetWidth:100,
      correctOrientation:true,
      allowEdit:false,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.PNG,
      mediaType:this.camera.MediaType.PICTURE,
      cameraDirection:this.camera.Direction.FRONT,
      sourceType:this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum:true
    };
    this.camera.getPicture(options).then((imageData)=>{
      this.image=this.webview.convertFileSrc(imageData);
    }
    ,(err)=>{
      console.log("Camera error");
      alert("Failed because"+err)});
  }
  onSubmit(){
    this.modalCtrl.dismiss();
    console.log(this.registerForm.value);
  }
  getPictureLib(){
    const options:CameraOptions={
      quality:100,
      targetHeight:100,
      targetWidth:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.PNG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.camera.getPicture(options).then((imageData)=>{
      this.image=this.webview.convertFileSrc(imageData);
    }
    ,(err)=>{
      console.log("Camera error");
      alert("Failed because"+err)});
  }
}
