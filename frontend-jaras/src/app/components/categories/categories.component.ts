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
  
  public articles:Article[]
  public url:string;
  public filtro:string='all'
  public filtrado:Article[]

  constructor(
    private _articleService:ArticleService
  ){
    this.articles=[];
    this.url=Global.url;
    this.filtrado=[]
  }
  ngOnInit(){
    this.getArticles();
  }

  getFiltro(f:any){
    this.filtro=f.target.value;
    this.getArticles();
  }  

  getArticles(){
    this._articleService.getArticles().subscribe(
      response=>{
        if(response.articles){
          this.articles=response.articles;
        }
        for(let i=0; i<this.articles.length; i++){
          if(this.filtro!='all'){
            if(this.articles[i].category==this.filtro){
              this.filtrado.push(this.articles[i])
            }
          }
          else{
            this.filtrado.push(this.articles[i])
          }
          
        }
        
      },
      error=>{
        console.log(error)
      }
    )
  }

  

  

}
