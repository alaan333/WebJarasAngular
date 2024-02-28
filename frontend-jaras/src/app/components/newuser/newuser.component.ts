import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css'],
  providers:[UserService]
})
export class NewuserComponent {
  public title:string;
  public user:User 
  public status:boolean;
  public save_user:any;
  public url:string;
  public pass:string=''
  public message:string=''

  constructor(
    private _userService: UserService,
    private _router: Router
  ){
    this.title='Registrar usuario'
    this.user=new User('','','','','',['']);
    this.status=false;
    this.save_user=null;
    this.url=Global.urlUser
  }   

  onSubmit(form:any){
      localStorage.setItem('temp',JSON.stringify(this.user))
      this._userService.sendMail(this.user).subscribe(
      response=>{
        this.status=true;
        this.message='Usuario registrado, registra tu correro para confirmar';
        form.reset()
        setTimeout(()=>{
          this._router.navigate(['/inicio']);
        }, 2000);
      },
      error=>{
        console.log(error);
        this.status=true; 
        form.reset()
        this.message='Ya existe el correo en la base de datos';
      }
    );
  }
}

