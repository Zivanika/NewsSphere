import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
   let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div>
        <div className="card my-3 mx-2.5" style={{width:"250px",height:"340px"}}>
  <img src={!imageUrl?"https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg":imageUrl} className="cardimage card-img-top" style={{height:"110px"}}alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
    {source}
    
  </span></h5>
    <p className="card-text desc">{description}...</p>
    <p class="card-text publish"><small class="text-body-secondary">Published At {new Date(date).toDateString()}, {new Date(date).toLocaleTimeString()}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-outline-danger" style={{marginBottom:"100px",height:"30px",padding:"2px"}}>Read more</a>
  </div>
  
</div>
      </div>
    )
  }
}

export default NewsItem
