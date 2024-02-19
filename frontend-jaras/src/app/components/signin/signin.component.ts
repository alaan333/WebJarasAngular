import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers:[UserService]
})
export class SigninComponent {

  public users:User[];
  public url:string;
  public result:string;
  public email:string=''
  public pass:string=''

  constructor(
    private _userService:UserService,
    private _router:Router
  ){
    this.users=[];
    this.url=Global.urlUser;
    this.result='';
  }

  getUsers(){
    this._userService.getUsers().subscribe(  //susbribe es un metodo del observable, ya que getArticles() devuelve un observable
      response=>{
        if(response.users){
          this.users=response.users;
        }
        for(let i=0; i<this.users.length; i++){
          if(this.users[i].email==this.email && this.users[i].password==this.pass){
            localStorage.setItem('user',this.users[i]._id);
            this._router.navigate(['/inicio']);
            this.result='success';
          }
          else{this.result='failed'}
        }
      },
      error=>{
        console.log(error)
      }
    )
  }



}
