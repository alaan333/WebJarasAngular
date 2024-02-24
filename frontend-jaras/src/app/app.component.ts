import { Component, OnInit} from '@angular/core';
import { ArticleService } from './services/article.service';
import { Article } from './models/article';
import { Global } from './services/global';
import { UserService } from './services/user.service';

declare var $:any; //solo para jquery

@Component({ //@ es para utilizar un decorador, para configurar mi componente (Component)
  selector: 'app-root', //selector: sirve para indicar en que etiqueta(<app-root></app-root>) o directiva se va a cargar este componente
  templateUrl: './app.component.html', //templateUrl: indica cual es la vista del componente
  styleUrls: ['./app.component.css'], //styleUrls: se podria utilizar para darle estilos al componente
  providers:[ArticleService,UserService] //para utilizar el servicio de otro componente(ArticleService)
})
export class AppComponent implements OnInit{ //para poder utilizar esta clase en otros archivos
  title = 'frontend-jaras';
  public item_search:string='';
  public articles:Article[];
  public url:string;
  public all_articles:Article[];
  public status:boolean;
  public idUser:any;
  public fecha:any;
  public dia:any;
  public mes:any;
  public control:boolean; //para *ngIf de la etiqueta decoradora navideña
  public controlAdmin:boolean=false;
  public user:any;

  constructor(
    private _articleService:ArticleService,
    private _userService:UserService
  ){
    this.articles=[];
    this.all_articles=[]
    this.url=Global.url;
    this.status=false;
    this.control=false;
    this.idUser = localStorage.getItem('user');
  }

  ngOnInit(): void {
    this.themeSelector()
    this.controlDate()
    this.sliderStar()
    this.cAdmin()
    if(this.idUser!=null){this.getUser(this.idUser)}
  }

  themeSelector(){
     var theme=$('#theme');
        $('.theme-pink').click(function(){
        theme.attr('href','assets/css/pink-style.css')
        });
        $('.theme-blue').click(function(){
          theme.attr('href','assets/css/blue-style.css')
          });
        $('.theme-green').click(function(){
        theme.attr('href','assets/css/green-style.css')
        })
        $('.theme-darkpink').click(function(){
          theme.attr('href','assets/css/darkpink-style.css')
        })
  }

  //Slider del footer
  sliderStar(){
      $(document).ready(function(){
        $('.sliderfooter').bxSlider({
          auto: true,
          autoControls: true,
          stopAutoOnClick: true,
          pager: true,
         });
      });
  }

  //funcion de busqueda
  getSearchArticles(){
    this._articleService.getArticles().subscribe(
      response=>{
        if(response.articles){
          this.articles=response.articles;
        }
        if(this.all_articles.length>0){
          this.all_articles=[]
        }
        for(let i=0; i<this.articles.length; i++){
          if(this.item_search.toUpperCase() == this.articles[i].typeArticle.toUpperCase()){
            this.all_articles.push(this.articles[i])
          }
        }
        if(this.all_articles.length>0){
          this.status=true
        }
        else{
          this.status=false
        }
      },
      error=>{
        console.log(error)
      }
    )
  } 

  getUser(id:any){
    this._userService.getUser(id).subscribe(
      response=>{
        this.user=response.user; 
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  signOut(){
    var result=confirm('Cerrar sesión?')
    if (result){
      localStorage.removeItem('user')
      location.reload()
    }
  }

  //Control fecha navideña
  controlDate(){
    this.fecha= new Date()
    this.dia=this.fecha.getDate()
    this.mes=this.fecha.getMonth()
    this.fecha=[this.dia, this.mes]
    if((this.fecha[0]>=8 && this.fecha[1]==11) || (this.fecha[0]>=1 && this.fecha[0]<=6 && this.fecha[1]==0)){
      this.control=true;
    }
  }

  cAdmin(){
    if(this.idUser=='65d9676d6e9aaa6c1f78ff4d'){
      this.controlAdmin=true
    }
  }
}
