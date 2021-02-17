import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Feedback,ContactType } from '../shared/feedback';

import { FeedbackserviceService } from '../services/feedbackservice.service';

import { flyInOut,visibility } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[flyInOut(),visibility()]
})
export class ContactComponent implements OnInit {
  
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  feedbackForm: FormGroup;
  feedback:Feedback;
  rFeed:Feedback;
  contactType = ContactType;
  showF='shown';
  showL='hidden';
  showRF='hidden';
  errMSG:string;
  constructor( private fb:FormBuilder,
    private feedServ:FeedbackserviceService) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname:['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum:['', [Validators.required, Validators.pattern]],
      email:['', [Validators.required,Validators.email] ],
      agree:false,
      contacttype:'None',
      message:''
    });
    this.feedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();//(re)set form validation messages
  }
  onValueChanged(data?:any){
    if (!this.feedbackForm){return;}
    const form = this.feedbackForm;
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
  clearV(){
    setTimeout(()=>{this.rFeed=null;
      this.errMSG=null;
      this.showF='shown';
      this.showL='hidden';
      this.showRF='hidden';},5000)
    
  }
  onSubmit(){
    this.feedback=this.feedbackForm.value;
    
    this.showF='hidden';
    this.showL='shown';
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:'',
      email:'',
      agree:false,
      contacttype:'None',
      message:''}
    );
    this.feedbackFormDirective.resetForm();
    
    this.feedServ.writeFeedback(this.feedback).
    subscribe( rfeed=>{
      this.showL='hidden';
      this.showRF='shown';
      this.feedback=rfeed;
      this.rFeed=rfeed;
      this.clearV();
    },
      err=> {
        this.errMSG=err;
        this.clearV();
      });
  }
}
