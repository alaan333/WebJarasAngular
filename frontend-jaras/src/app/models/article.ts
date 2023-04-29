export class Article{
    constructor(
        public _id:string,
        public category:string,            
        public typeArticle:string,             
        public size:string,                
        public season:string,
        public color:string,
        public image:string,
        public description:string,
        public code:string,
        public price:number,
        public offsale:number
    ){}
}