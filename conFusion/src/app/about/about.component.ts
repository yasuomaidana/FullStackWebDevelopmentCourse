import { Component, OnInit, Inject } from '@angular/core';
//Import classes
import { Leader } from '../shared/leader';
//Import services
import {LeaderService} from '../services/leader.service';
//import custom animations
import {flyInOut, expand} from '../animations/app.animation';
import { from } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[flyInOut(),expand()]
})
export class AboutComponent implements OnInit {
  leaders:Leader[];
  constructor(private leaderService:LeaderService,
    @Inject('BaseURL') private BURL) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe((leaders)=>this.leaders=leaders)
  }

}
