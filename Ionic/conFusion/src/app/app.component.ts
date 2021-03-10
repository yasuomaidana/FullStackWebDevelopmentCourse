import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  
  constructor(public modalCrl:ModalController) {}

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
}
