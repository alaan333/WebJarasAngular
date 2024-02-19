import { Component } from '@angular/core';
import { User } from 'src/app/models/user'; 
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css'],
  providers:[UserService]
})
export class NewuserComponent {
  public title:string;
  public user:User 
  public status:string;
  public save_user:any;
  public url:string;
  public pass:string=''

  constructor(
    private _userService: UserService
  ){
    this.title='Registrar usuario'
    this.user=new User('','','','','',['']);
    this.status=''
    this.save_user=null;
    this.url=Global.urlUser
  }   

  onSubmit(form:any){
    //Guardar datos basicos
    this._userService.saveUser(this.user).subscribe(
      response=>{
        if(response.user){ 
            this.status='success';
            this.save_user=response.user;
            form.reset()
        }
        else{this.status='failed'}
      },
      error=>{console.log(error)}
    );
  }

}
