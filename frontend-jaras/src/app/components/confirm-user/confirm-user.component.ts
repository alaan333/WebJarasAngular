import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css'],
  providers:[UserService]
})
export class ConfirmUserComponent {
    public user: User;
    public data:any;
    public save_user:any;
    public token:any;
    public status:boolean=false;
    public message:string='';

    constructor(
      private _userService:UserService,
      private _route:ActivatedRoute,
      private _router: Router
    ){
      this.user=new User('','','','','',['']);
    }   

    ngOnInit(){
      this.token= this._route.snapshot.paramMap.get('token');
      this.data=localStorage.getItem('temp')
      this.user=JSON.parse(this.data)
    }

    // boton confirmar del html
    confirm(){
      if(this.user!=null){
        this._userService.confirmUser(this.token).subscribe(
          response=>{
            if(response){
              this.status=true
              this.message='Gracias por confirmar 😁'
              this.addUsertoDB()
              localStorage.removeItem('temp')
              setTimeout(()=>{
                this._router.navigate(['/inicio-sesion']);
              }, 2000);
            }else console.log('Error de confirmación')
          },
          error=>{
            console.log(error)
            this.status=true;
            this.message='Error de confirmacion, vuelve registrarte'
            setTimeout(()=>{
              this._router.navigate(['/registro']);
            }, 3000);
          }      
        )
      }else{
        this.status=true;
        this.message='Usuario ya confirmado'
        setTimeout(()=>{
          this._router.navigate(['/inicio']);
        }, 2000);
      }
    }

    addUsertoDB(){
      this._userService.saveUser(this.user).subscribe(
        response=>{
          if(response.user){ 
              this.save_user=response.user;
          }
        },
        error=>{
          console.log(error)
        }
      );
    }
}
