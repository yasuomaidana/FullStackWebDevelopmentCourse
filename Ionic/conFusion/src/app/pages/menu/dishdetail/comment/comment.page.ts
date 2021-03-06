import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Comment } from "../../../../shared/comment";
@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  commentF:FormGroup;
  rcomment:Comment;
  constructor(public modalCtrl:ModalController,
    private fb:FormBuilder) {
    this.commentF= this.fb.group({
      namec:["",Validators.required],
      rating:[5],
      comment:["",[Validators.required,Validators.minLength(3)]]
    });
    this.rcomment={
      author:"",
      rating:5,
      date:"",
      comment:""
  };
   }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  onSubmit(){
    let fVal = this.commentF.value;
    
    this.rcomment.author=fVal["namec"];
    this.rcomment.rating=fVal["rating"];
    this.rcomment.comment=fVal["comment"];
    this.rcomment.date = new Date().toISOString();
    
    this.modalCtrl.dismiss(this.rcomment);
  }
}
