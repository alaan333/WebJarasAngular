import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  public frase:string;
  public slogan:string;
  
  constructor(){
    this.frase='Explora la sofisticación sin límites, donde cada prenda se convierte en parte de un capítulo de tu historia. Vive la moda con autenticidad y descubre la belleza que reside en tu estilo único'
    this.slogan='Lo que de y mas...'
  }
  ngOnInit(){
    $(document).ready(function(){
      $('.slider').bxSlider({
        auto: true,
        autoControls: true,
        stopAutoOnClick: true,
        pager: true,
      });
    });
  }
 
}


