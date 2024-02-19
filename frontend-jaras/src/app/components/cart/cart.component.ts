import { Component } from '@angular/core';
import { DetailComponent } from '../detail/detail.component';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { ArticleService } from 'src/app/services/article.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ArticleService,UserService]
})
export class CartComponent {

  public dato:any;
  public url:string;
  public totalbuy:number;
  public idUser:any;
  public userCart:any;
  public article:any;
  public items_cart:Article[]

  constructor(
    private _userService:UserService,
    private _articleService:ArticleService,
    private _router:Router
  ){
    this.url=Global.url;
    this.totalbuy=0;
    this.items_cart=[];
  }

  ngOnInit(){
    this.getUser();
  }

  getUser(){
    if(localStorage.key!=null){
      this.idUser = localStorage.getItem('user');
    }
    if(this.idUser==null){this._router.navigate(['/inicio-sesion'])}
    else{
      this._userService.getUser(this.idUser).subscribe(
        response=>{
          this.userCart=response.user.cart; 
          this.listCart()
        },
        error=>{
          console.log(<any>error)
        }
      )
    }
  }

  getArticle(id:any){
    this._articleService.getArticle(id).subscribe(
      response=>{
        this.article=response.article;
        this.items_cart.push(this.article)
        this.totalbuy+=this.article.price
      },
      error=>{
        console.log(error)
      }      
    )
  }
  
  listCart(){
    for(let i=0; i<this.userCart.length; i++){
      this.getArticle(this.userCart[i])
    }
  }
  
//despues, para borrar de nuevo hay que usar editUser
  deleteArticleCart(id:any){
    var result=confirm('Quitar articulo?')
    if (result){
      localStorage.removeItem(id)
      location.reload()
    }
  }
  
}
