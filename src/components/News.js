import React, {Component} from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// const baseURL="https://newsphere-api.onrender.com"
const baseURL="http://localhost:5000";

export class News extends Component{
  // const[articles,setArticles]=useState([]);
  // const[loading,setLoading]=useState(false);
  // const[page,setPage]=useState(1);
  // const[totalResults,setTotalResults]=useState(0);
  // document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`;
  static defaultProps={
    country:"in",
    pageSize:21,
    category:"general"
    }
  static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    }
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0
    }
    this.fetchMoreData = this.fetchMoreData.bind(this); // Add this line
  }
  capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
  }
  async updateNews(){
    this.props.setProgress(10);
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    // setLoading(true);
    // let data= await fetch(url);
    const {country,query,category,pageSize}=this.props
    const page = this.state.page;
    const {data}=await axios.post(`${baseURL}/news`,{country,query,category,page,pageSize})
    this.props.setProgress(30);
    // let parsedData=await data.json();
    this.props.setProgress(70);
    this.setState({articles:data.articles, loading:false,totalResults:data.totalResults});
    // setArticles(parsedData.articles);
    // setTotalResults(parsedData.totalResults);
    // setLoading(false);
    this.props.setProgress(100);
  }
  // useEffect(() => { 
  //   document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`;
  //   upadteNews();
  // }, [])
  

  async componentDidMount(){
   this.updateNews();
  }
 async handlePrevClick(){
    this.setState({page: this.state.page -1});
    // setPage(page-1);
    this.updateNews();
  }
 async handleNextClick(){
    this.setState({page: this.state.page +1});
    // setPage(page+1);
    this.updateNews();
  }
 async fetchMoreData(){
   
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({page: this.state.page +1});
    this.setState({loading:true});
    // setPage(page+1);
    // let data= await fetch(url);
    // let parsedData=await data.json();

    const {country,query,category,pageSize}=this.props
    const page = this.state.page;
    const {data}=await axios.post(`${baseURL}/news`,{country,query,category,page,pageSize})
    this.props.setProgress(30);
   

    this.setState({articles:this.state.articles.concat(data.articles), loading:false,totalResults:data.totalResults});
    //  setArticles(articles.concat(parsedData.articles));
    //  setLoading(false)
    //  setTotalResults(parsedData.totalResults);
  }
 render(){
    return (
      <>
      <div className='container parent my-3 overflow-hidden' style={{marginRight:"0px"}}>
      {/* <ion-icon  className="" name="globe-outline"></ion-icon> */}
      {/* <ion-icon className="" name="newspaper-outline" style={{ scale: "1.4", transform: "translate(-4px)",color:"black" }}></ion-icon> */}
      
        <h2 className='text-center' style={{marginTop:"80px"}}><FontAwesomeIcon icon={faGlobe} size="sm" style={{color: "black"}} />  NewsSphere-Top {`${this.capitalizeFirstLetter(this.props.category)}`} headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll className='overflow-hidden'
          // dataLength={this.state.articles.length}
          // next={this.fetchMoreData}
          // hasMore={this.state.articles.length!==this.state.totalResults}
          // loader={<Spinner/>}
          dataLength={this.state.articles ? this.state.articles.length : 0}
  next={this.fetchMoreData}
  hasMore={this.state.articles && this.state.articles.length !== this.state.totalResults}
  loader={<Spinner/>}
        >
          <div className="container">
        <div className="row my-5 mx-4">
        {this.state.articles?.map((element)=>{
         return <div className="col-md-3 mx-4 " key={element.url}>
       <NewsItem  title={element.title? element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
       </div>
      })}
     
         </div>
         </div>
         </InfiniteScroll>
         
        

         </div>
      </>
    )
  }
  
}
// News.defaultProps={
//   country:"in",
//   pageSize:21,
//   category:"general"
//   }
// News.propTypes={
//     country:PropTypes.string,
//     pageSize:PropTypes.number,
//     category:PropTypes.string
//   }
export default News
