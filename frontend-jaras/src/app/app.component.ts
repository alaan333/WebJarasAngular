import { Component, OnInit} from '@angular/core';
import { ArticleService } from './services/article.service';
import { Article } from './models/article';
import { Global } from './services/global';

declare var $:any; //solo para jquery

@Component({ //@ es para utilizar un decorador, para configurar mi componente (Component)
  selector: 'app-root', //selector: sirve para indicar en que etiqueta(<app-root></app-root>) o directiva se va a cargar este componente
  templateUrl: './app.component.html', //templateUrl: indica cual es la vista del componente
  styleUrls: ['./app.component.css'], //styleUrls: se podria utilizar para darle estilos al componente
  providers:[ArticleService]
})
export class AppComponent implements OnInit{ //para poder utilizar esta clase en otros archivos
  title = 'frontend-jaras';
  public item_search:string='';
  public articles:Article[];
  public url:string;
  public all_articles:Article[];
  public status:boolean;
  public fecha:any;
  public dia:any;
  public mes:any;
  public control:boolean; //para *ngIf de la etiqueta decoradora navideña

  constructor(
    private _articleService:ArticleService,
  ){
    this.articles=[];
    this.all_articles=[]
    this.url=Global.url;
    this.status=false;
    this.control=false;
  }

  ngOnInit(): void {
    this.controlDate()
    this.sliderStar()
  }

  //Slider del footer

  sliderStar(){
    $(document).ready(function(){
      $(document).ready(function(){
        $('.sliderfooter').bxSlider({
          auto: true,
          autoControls: true,
          stopAutoOnClick: true,
          pager: true,
        });
      });
  
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
        console.log('en appcomponent',this.all_articles.length)
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
}
