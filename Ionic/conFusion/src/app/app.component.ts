import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { LoginPage } from './pages/login/login.page';

import { ReservationPage } from './pages/reservation/reservation.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'About Us', url: '/about', icon: 'information-circle' },
    { title: 'Menu', url: '/menu', icon: 'fast-food' },
    { title: 'Contact us', url: '/contact', icon: 'call' },
    { title: 'My Favorites', url: '/favorites', icon: 'heart-circle' }
    //{ title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    //{ title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  loading: any = null;

  constructor(public modalCrl:ModalController,
    private network:Network,private loadingCtrl:LoadingController,
    private platform:Platform) {
      //this.initializeApp();
      
      this.network.onDisconnect()
      .subscribe(()=>{
        if(!this.loading){
          /*
          this.loading = this.loadingCtrl.create({
            message:"Network Disconnected",
          });
          this.loading.present();*/
          this.presentLoading();
          this.loading=true;
        }
      });
      this.network.onConnect()
      .subscribe(()=>{
        if(this.loading && this.network.type==='wifi'){
          /*
          this.loading.dismiss();
          this.loading=null;*/
          this.loadingCtrl.dismiss();
          this.loading=null;
        }
      });
    }

  async openModal(){
    const modal = await this.modalCrl.create({
      component: ReservationPage
    });
    return await modal.present();
  }

  async openLogin(){
    const modal = await this.modalCrl.create({
      component: LoginPage
    });
    return await modal.present();
  }
  initializeApp(){
    this.platform.ready().then(()=>{
      this.network.onDisconnect()
      .subscribe(()=>{
        if(!this.loading){
          this.loading = this.loadingCtrl.create({
            message:"Network Disconnected",
          });
          this.loading.present();
        }
      });
    this.network.onConnect()
    .subscribe(()=>{
      if(this.loading){
        this.loading=null;
        this.loading.dismiss();
        
      }
    });

    });
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Network Disconnected',
      duration: 1000
    });
    await loading.present();
    loading.onDidDismiss().then(()=>{
      if (this.loading){
        loading.present();
      }
    });
  }
  
}
