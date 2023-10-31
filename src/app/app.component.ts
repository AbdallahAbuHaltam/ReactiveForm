import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm:FormGroup;
  forbiddenUserName=['Chris','Anna'];

  ngOnInit(): void {
    this.signupForm= new FormGroup({
      'userData':new FormGroup({
        'username':new FormControl(null ,[Validators.required,this.forbiddenName.bind(this)]),
        'email': new FormControl(null,[Validators.required,Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
      
    });

  this.signupForm.statusChanges.subscribe(
    (value)=>console.log(value)
  );
  }
  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobbies(){
    const control=new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenName(control :FormControl):{[s:string]:boolean} {
    if(this.forbiddenUserName.indexOf(control.value)!==-1){
      return{'nameIsForbidden':true}
    }else{
      return null;
    }
  }
}
