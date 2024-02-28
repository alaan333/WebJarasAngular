import { Component } from '@angular/core';
import { DetailComponent } from '../detail/detail.component';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { ArticleService } from 'src/app/services/article.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  public user: object={};
  public save_user:object={};
  public userCart:any;
  public article:any;
  public items_cart:Article[]

  constructor(
    private _userService:UserService,
    private _articleService:ArticleService,
    private _router:Router,
    private _route:ActivatedRoute
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
          this.user=response.user
          this.userCart=response.user.cart; 
          this.listCart()
        },
        error=>{
          console.log(<any>error)
        }
      )
    }
  }

  listCart(){
    for(let i=0; i<this.userCart.length; i++){
      this.getArticle(this.userCart[i])
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
        this.deleteArticleCart(id)
      }      
    )
  }
  
  
  deleteArticleCart(id:any){
      console.log(this.userCart)
      let i=this.userCart.indexOf(id)
      this.userCart.splice(i,1)
      console.log(this.userCart)
      this._userService.editUser(this.user).subscribe(
        response=>{
          if(response.user){
            this.save_user=response.user
            location.reload()
          }
        },
        error=>{console.log(error)}
      );
    }
}
