import React from 'react';
import { notifier,messenger } from '../components2/main';
import './css/style.css';
import './css/bootstrap.min.css';
import './css/line-awesome.css';
import './css/line-awesome-font-awesome.min.css';
import './css/font-awesome.min.css';
import './css/jquery.mCustomScrollbar.min.css';
import './lib/slick/slick.css';
import './lib/slick/slick-theme.css';
import './css/responsive.css';
import './lib/slick/slick.css';
import {Link} from 'react-router-dom'
import Axios from 'axios';
import Dots from 'react-activity/lib/Dots'
import {ModalHeader,ModalFooter,ModalBody,Modal,Button} from 'reactstrap'
import TimeAgo from 'timeago-react';
import History from '../History'
class PrimarySearchAppBar extends React.Component {

  state = {
    username:'',
    showmore:false,
    messageList:false,
    notification:[],
    counter:0,
    mCounter:0,
    firstFetch:false,
    firstName:'',
    photo:'',
    search:'',
    messagDialog:false,
    notficationDialog:false,
    toggleMenu:false,
    modal:false,
    message:'',
    calleePic:'',
    calleeName:'',
    room:'',
    notiLoading:false
  };
  componentDidMount(){
    if(this.props.verify){
      Axios({url:'/getUsernme',method:'get',withCredentials:true})
      .then(data=>{
          console.log(data)
        this.setState({
          username:data.data.username,
          photo:data.data.isAdmin?'https://www.w3schools.com/howto/img_avatar.png':'https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg'
      })
      })
      
      messenger.on('notifyMessage',()=>{
        if(this.props.showMessageCounter){
        this.setState({
          mCounter:this.state.mCounter+1
        })
        }
      })
     
      notifier.on('notifyMe',(notification)=>{
        let notifier=this.state.notification;
        notifier.push(notification);
        this.setState({
        notification:notifier,
        counter:this.state.counter+1
        })
      })
    }
  }
  onFetchNotify(event){
    event.preventDefault();
   this.setState({
     notiLoading:true
   })
    this.setState({counter:0,notficationDialog:!this.state.notficationDialog})
    notifier.emit("okNoti")
   if(!this.state.firstFetch){

     Axios({
       method:'post',
       url:'/fecthNoti',
       withCredentials:true
    })
    .then(data=>{
        console.log(data)
      if(data.data.notifications)
      {
        this.setState({
          messagDialog:false,
          notification:data.data.notifications
          ,firstFetch:true,
          notiLoading:false  
        })
      }
      else {
        if(data.data.message){
          this.setState({
            message:'No notification to show'
          })
        }
          else{
            this.setState({
              message:'Could not proceed with the request'
            })
          }
        }
      })
      .catch(err=>{
        this.setState({
          message:'Could not proceed with the request'
        })
      })
    }
    else{
      this.setState({
        notiLoading:false
      }) 
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({counter:nextProps.counter,mCounter:nextProps.mCounter})
  }
  logout(){
    Axios({url:'/logout',method:'get',withCredentials:true})
    .then(data=>{
      if(data.data.logout){
        History.push('/')
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

  
    getDashboard(){
        History.push('/'+this.state.username)
         window.location.reload();
  }
    changeInput(e){
        console.log(e.target.value)
        this.setState({
        search:e.target.value       
        })
    }
    
 

  render() {
   

   
  return(
           <header>
    <div className="container">
        <div className="header-data">
            <div className="logo">
                <Link to={"/"+this.state.username} ><img src="/chatlogo.png" alt="chat-logo" style={{width:'80px',height:'80px'}}/></Link>
            </div>
            {/* <!--logo end--> */}
            {/* <div className="search-bar">

              {this.props.verify?  <form onSubmit={()=>{History.push("/search?search="+this.state.search) }}>
                    <input type="text" onChange={this.changeInput.bind(this)} name="search" placeholder="Search..."/>
                    <button type="submit"><i className="la la-search"></i></button>
                </form>:<span/>}
            </div> */}
            {/* <!--search-bar end--> */}
            <nav>
                {this.props.loggedIn? 
                <ul>
                  
                    
                    
                    <li>
                       <div style={{position:"relative"}}>
                        <Link to="#" onClick={()=>{notifier.emit('clearMessanger'); History.push('/messanger');window.location.reload()}}  className="not-box-open" >
                            <span><img src="/images/icon6.png" alt="messages"/>
                            
                        
 </span>
                            Messages
</Link>
                    {this.state.mCounter>0?
                      <span style={{position:"absolute",top:"-1px",right:"-40px",left:"0px",color:"red"}}>{this.state.mCounter}</span>
                    :<span/>}


                
                    </div>
                    </li>    
                                </ul>:
                                   <span/>
                // <ul>
                //                 <li>
                //                 <Link to={"/"+this.state.username} >
                //                     <span><i className="fa fa-sign-in" ></i></span>
                //                     Login
                //                 </Link>
                //             </li>
                //             <li>
                //                 <Link to="/register" >
                //                     <span><i className="fa fa-address-book" ></i></span>
                //                     Register
                //                 </Link>
                //             </li>
                //     </ul>
        }
            </nav>
            {/* <!--nav end--> */}
            {this.props.loggedIn?
            <div className="menu-btn">
                <Link to="#" ><i className="fa fa-bars"></i></Link>
            </div>:<span/>}
        
            {/* <!--menu-btn end--> */}
        {this.props.verify?
        
            <div className="user-account">
                <div className="user-info" onClick={()=>{this.setState({toggleMenu:!this.state.toggleMenu})}}>
                    <img src={this.state.photo} style={{width:'30px',height:'30px'}} alt=""/>
                    <Link to="#" >{this.state.username}</Link>
                    <i className="la la-sort-down"></i>
                </div>  
                {this.state.toggleMenu? <div className="user-account-settingss active">
                    
                    <h3 className="tc" onClick={this.logout.bind(this)}><Link to="#" >Logout</Link></h3>
                </div>:<div/>}
                {/* <!--user-account-settingss end--> */}
            </div>:<div/>}
        </div>
        {/* <!--header-data end--> */}
    </div>
</header>
         
   )
  }
}


export default PrimarySearchAppBar;