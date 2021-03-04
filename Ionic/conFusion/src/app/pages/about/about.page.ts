import { Component, OnInit,Inject } from '@angular/core';

import { LeaderService } from "../../services/leader.service";
import { Leader } from "../../shared/leader";
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  leaders:Leader[];
  errMss:string;
  constructor( private leaderService:LeaderService,
    @Inject("BaseURL") private BaseURL ) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders=leaders,err=>this.errMss=err);
  }

}
