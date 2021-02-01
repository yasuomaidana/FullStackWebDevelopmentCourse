import { Component, OnInit } from '@angular/core';
//Import classes
import { Leader } from '../shared/leader';
//Import services
import {LeaderService} from '../services/leader.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leaders:Leader[];
  constructor(private leaderService:LeaderService) { }

  ngOnInit() {
    this.leaderService.getLeaders().then((leaders)=>this.leaders=leaders)
  }

}
