// We use Input when we pass information through methods that 
//are not links
//import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit, ViewChild, Inject } from '@angular/core'; //viewchild allow us to see components
//To use information using url parameters
import {Params,ActivatedRoute} from '@angular/router';
//Switch map allow us to use observables elements
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import {Dish} from '../shared/dish'
//Import services
import {DishService} from '../services/dish.service';

//Used for forms
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

//Animation stuffs
import { trigger, state, style, animate, transition } from '@angular/animations';

//Import comment type 
import { Comment } from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[trigger('visibility',[
    state('shown',style({
      transform: 'scale(1.0)',
      opacity:1
    })),
    state('hidden',style({
      transform: 'scale(0.5)',
      opacity:0
    })),
    transition('*=>*',animate('0.5s ease-in-out'))
  ])
  ]
})
export class DishdetailComponent implements OnInit 
{ 
    //Since we are not passing the information through
    //@Input()
    dish: Dish;
    dishIds:string[];
    prev:string;
    next:string;
    errMess: string;
    dishcopy:Dish;

    visibility='shown';
    
    formErrors = {
      'name': '',
      'comment': ''
    };
    validationMessages = {
      'name': {
        'required':      'Name is required.',
        'minlength':     'Name must be at least 2 characters long.',
      },
      'comment': {
        'required':      'Comment is required.',
        'minlength':     'Comment must be at least 4 characters long.',
      }
    };
    
    @ViewChild('fform') feedbackFormDirective;
    commentForm:FormGroup;
    
    constructor(private dishService:DishService,
      private location:Location,
      private route:ActivatedRoute,
      private fb:FormBuilder,
      @Inject('BaseURL') private BaseURL) {
        this.createForm();
       }

    ngOnInit() {
      //Takes and snapshot of the current url state and get the params
      //let id = this.route.snapshot.params['id'];
      //this.dishService.getDish(id).subscribe((dish)=>this.dish=dish);
      this.dishService.getDishID().subscribe((dishIds)=>this.dishIds=dishIds);
      
      this.route.params.pipe(
        switchMap((params:Params)=> {
          this.visibility='hidden';
          return this.dishService.getDish(params['id']);
        })).
        subscribe(dish=>{
          this.dish=dish;
          this.dishcopy=dish;
          this.setPrevNext(dish.id);
          this.visibility='shown';},
          errmss => this.errMess=<any>errmss);
        
      
    }

    setPrevNext(dishId:string){
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];

    }
    goBack(): void{
      this.location.back();
    }

    createForm(){
      this.commentForm = this.fb.group({
        name:['',[Validators.required,Validators.minLength(2)]],
        stars:5,
        comment:['',[Validators.required,Validators.minLength(4)]]
      });
      this.commentForm.valueChanges.subscribe(data=>this.onValueChanged(data));
      this.onValueChanged();//(re)set form validation messages
    }
    onValueChanged(data?:any){
      if (!this.commentForm){return;}
      const form = this.commentForm;
      for (const field in this.formErrors)
      {
        if (this.formErrors.hasOwnProperty(field)){
          this.formErrors[field]='';
          const control = form.get(field);
          if (control && control.dirty && !control.valid){
            const messages = this.validationMessages[field];
            for (const key in control.errors){
              if (control.errors.hasOwnProperty(key))
              {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
    onSubmit(){
      const formValues =this.commentForm.value;
      const da = new Date()
      var comment = new Comment;
      comment.rating = formValues["stars"];
      comment.comment = formValues["comment"];
      comment.author = formValues["name"];
      comment.date = da.toISOString();
      this.dishcopy.comments.push(comment);
      console.log(this.dishcopy);
      this.dishService.putDish(this.dishcopy).
        subscribe(dish=>{
          this.dish=dish;
          this.dishcopy=dish},
          errmess=>{
            this.dish=null;
            this.dishcopy=null;
            this.errMess=<any>errmess;
          });
      this.feedbackFormDirective.resetForm();
      this.commentForm.reset({
        name:'',
        stars:5,
        comment:'',
        }
      );
      
    }
}
