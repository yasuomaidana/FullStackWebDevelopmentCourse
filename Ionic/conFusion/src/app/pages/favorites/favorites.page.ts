import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../../shared/dish';
import { FavoriteService } from '../../services/favorite.service';
import { AlertController, IonItemSliding, LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites:Dish[];
  errMes:string;
  del:boolean;
  constructor(private favoriteService:FavoriteService,
    public  toastCtrl:ToastController,
    public  loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites().
    subscribe(favorites=>this.favorites=favorites,err=>this.errMes=err);

  }
  deleteFavorite(item:IonItemSliding,id:number){
    this.presentAlertConfirm(item,id);
    
    //item.close();
  }
  delConf(item:IonItemSliding,id:number){
    this.presentLoading(item,id);
    this.favoriteService.deleteFavorite(id).
    subscribe(dishes=>{
      this.favorites=dishes;
      this.loadingCtrl.dismiss();
    },err=>this.errMes=err);
  }
  async presentToast(item:IonItemSliding) {
    const toast = await this.toastCtrl.create({
      message: 'You deleted it from favorites',
      duration: 3000,
    });
    toast.present();
    toast.onDidDismiss().then(a=>{
      if(a){item.close();}
      });
  }
  async presentLoading(item:IonItemSliding,id:number) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 10000
    });
    await loading.present();
    //loading.dismiss()
    loading.onDidDismiss().then(a=>{
      if(a){
        this.presentToast(item);
      }
    });
  }

  async presentAlertConfirm(item:IonItemSliding,id:number) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      //header: 'Confirm!',
      message: 'Do you want to delete this dish from favorites?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
            console.log("canceled",this.del);
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.del=true;
            console.log('Confirm Okay',this.del);
          }
        }
      ]
    });
    alert.present();
    alert.onDidDismiss().then(a=>{
      if(a){
        if(this.del){
          this.delConf(item,id);
        }
        else{item.close();}
      }
    });
  }

}
