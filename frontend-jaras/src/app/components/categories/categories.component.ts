import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers:[ArticleService]
})
export class CategoriesComponent implements OnInit {
  
  public articles:Article[];
  public url:string;
  public filtro:string='all';
  public allArticles:Article[];
  public status:boolean

  constructor(
    private _articleService:ArticleService
  ){
    this.articles=[];
    this.url=Global.url;
    this.allArticles=[];
    this.status=false;
  }
  ngOnInit(){
    //para vaciar el for, la lista de productos en cada filtro hice this.allArticles=[]
    this.allArticles=[]
    this.getArticlesSelector()
  }

  getFiltro(f:any){
    this.filtro=f.target.value;
    this.ngOnInit()
  }  

  getArticlesSelector(){
    if(this.filtro=='all'){
      this.getArticles();
    }
    else{
      this.getArticlewithFilter()
    }
  }

  getArticles(){
    this._articleService.getArticles().subscribe(  //susbribe es un metodo del observable, ya que getArticles() devuelve un observable
      response=>{
        if(response.articles){
          this.articles=response.articles;
        }
        for(let i=0; i<this.articles.length; i++){
              this.allArticles.push(this.articles[i])   
        }
        if(this.allArticles.length>0){
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

  getArticlewithFilter(){
    this._articleService.getArticles().subscribe(
      response=>{
        if(response.articles){
          this.articles=response.articles;
        }
        for(let i=0; i<this.articles.length; i++){
          if(this.articles[i].category==this.filtro){
            this.allArticles.push(this.articles[i])
          }
        }
        if(this.allArticles.length>0){
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

  

  

}
