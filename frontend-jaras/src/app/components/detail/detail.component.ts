import { Component, Injectable, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ArticleService,UserService]
})
export class DetailComponent implements OnInit{
  public url: string;
  public article:any;
  public user:any;
  public save_user:any;
  public idUser:any;

  constructor(
    private _articleService: ArticleService,
    private _userService:UserService,
    private _router: Router,
    private _route:ActivatedRoute
  ){
    this.url=Global.url;
    this.article=Object;
    this.save_user=null;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this.getArticle(id)
    })
    this.getUser()
  }

  getArticle(id:any){
    this._articleService.getArticle(id).subscribe(
      response=>{
        this.article=response.article;
      },
      error=>{
        console.log(error)
      }      
    )
  }
  deleteArticle(id:any){
    var result=confirm('Desea borrar el articulo?')
    if (result){
      this._articleService.deleteArticle(id).subscribe(
        response=>{
          if(response.article){
            this._router.navigate(['/productos'])
          }
        },
        error=>{
          console.log(error)
        }      
      )
    }
  }


  //-----------Servicio para el carrito------------

  //Get id user from local store for edit
 
  getUser(){
    if(localStorage.getItem('user')!=null){
      this.idUser = localStorage.getItem('user');
    }
    if(this.idUser!=undefined){
      this._userService.getUser(this.idUser).subscribe(
        response=>{
          this.user=response.user; 
        },
        error=>{
          console.log(<any>error)
        }
      )  
    }  
  }
  putCart(id:any){
    var result=confirm('Agregar al carrito?');
    var n=false;
    if (result){
      this._articleService.getArticle(id).subscribe(
        response=>{
          this.article=response.article
            // añadir al array cart del objeto User
            this.user.cart.push(this.article._id)
            //ahora editarlo
            this._userService.editUser(this.user).subscribe(
              response=>{
                if(response.user){
                  this.save_user=response.user
                  location.reload()
                }
              },
              error=>{console.log(error)}
            );
        },
        error=>{console.log(error)}      
      )
    }
  }


};


