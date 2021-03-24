import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from "../../../shared/dish";
import { ActivatedRoute, Router } from '@angular/router';

import { FavoriteService } from "../../../services/favorite.service"
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { CommentPage } from './comment/comment.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

//https://www.youtube.com/watch?v=XyLcPdv1LKM
//https://ionicacademy.com/pass-data-angular-router-ionic-4

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {
  dish: Dish;
  errMess:string;
  avgstars:string;
  numcomments:number;
  favorite: boolean =false;

  constructor( @Inject("BaseURL") private BaseURL,
    private route:ActivatedRoute, private router:Router,
    private favoriteService:FavoriteService,
    private toastCtrl:ToastController,
    public actionSheetController: ActionSheetController,
    public modalCtrl:ModalController,
    private localNotifications:LocalNotifications,
    private socialSharing:SocialSharing) {
      this.route.queryParams.subscribe(params =>{
        ////This method pass the infor trhough url
        /*if (params && params.dish){
          //console.log("params",params);
          //To receive only string
          //this.dish=params.dish;

          //To receive object
          this.dish=JSON.parse(params.dish);
          
          this.numcomments = this.dish.comments.length;
          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating );
          this.avgstars = (total/this.numcomments).toFixed(2);
        }
        */

        //This method use state
        if(this.router.getCurrentNavigation().extras.state){
          this.dish=this.router.getCurrentNavigation().extras.state.dish;
          
          this.favorite=this.favoriteService.isFavorite(this.dish.id);
          this.numcomments = this.dish.comments.length;
          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating );
          this.avgstars = (total/this.numcomments).toFixed(2);
        }
      });
    }

  ngOnInit() {
    
  }
  addToFavorite(){
    //console.log("adding to favorites",this.dish.id);
    this.favorite=this.favoriteService.addFavorite(this.dish.id);
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Added to favorites',
      duration: 3000,
      position: 'middle'
    });
    toast.present().then(()=>{
      this.localNotifications.schedule({
        id: this.dish.id,
        text: 'Favorite dish '+this.dish.id+' added.'
      });
    });}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Actions',
      buttons: [{
        text: 'Add to Favorites',
        handler: () => {
          this.addToFavorite();
        }
      }, {
        text: 'Add comment',
        handler: () => {
          this.presentModal();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: CommentPage,
    });
    await modal.present();
    
    await modal.onDidDismiss().then(a=>{
      if(a.data)
      {
        this.dish.comments.push(a.data)}}
      );

  }
  async shareSocial(){
    let mss = this.dish.name + ' --- ' + this.dish.description;
    let img = this.BaseURL + this.dish.image;

    const actionSheet = await this.actionSheetController.create({
      header:"",
      buttons:[{
        text:"Share via Facebook",
        handler:()=>{
          this.socialSharing.shareViaFacebook(mss,img,"")
          .then(()=>console.log("Posted correctly"))
          .catch(()=>console.log("Error happened"));
        }
      },{
        text:"Share via Twitter",
        handler:()=>{
          this.socialSharing.shareViaTwitter(mss+"Twitter",img,"")
          .then(()=>console.log("Posted correctly"))
          .catch(()=>console.log("Error happened"));
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present()
  }
}
