import React from 'react';
import Nav from './Nav';
import {Link} from 'react-router-dom';
import TimeAgo from 'timeago-react';
import {encodeHtml} from './filterHtml'
import axios from 'axios';
import {messenger} from './main'
// import { base64ArrayBuffer } from './base64';
import History from '../History';
import Dots from 'react-activity/lib/Dots';
import Linkify from 'react-linkify';
import {css} from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

class Messages extends React.Component{
	constructor(props){
		super(props);
	  }
	  state={
		messanger:[],
		messages:[],
		loading:true,
		setting:false,
		rooms:[],
		userDetails:[],
		message:'',
		selectedIds:[],
		roomId:null,
		pic:null,
		messageSender:false,
		myId:'',
		errorM:false,
		counter:0,
		mCounter:0,
		otherId:'',
		focus:false,
		selectedFname:'',
		lastLogin:'',
		onLine:false
	  } 
	  componentDidMount(){
		axios({
		  withCredentials:true,
		  url:'/getStats',
		  method:'get' 
		})
		.then(data=>{
		  if(data.data.stats){
	
			this.setState({
			  counter:data.data.stats.notifyCounter,
			  mCounter:data.data.stats.messageCounter,
			})
		  }
		  else{
			History.push('/')
		  }
		})
		messenger.emit('getMyMsgg')
		messenger.on('giveMyConvo',(messeges)=>{
	   
		  if(messeges.online==true){
			this.setState({messages:messeges.message,onLine:true})  
		  }
		  else{
			this.setState({messages:messeges.message,lastLogin:messeges.lastLogin,onLine:false})  
			
		  }
	
		})
		messenger.on('userDetails',(userDetails,rooms,selected,docs,myId)=>{
		   this.setState({
		   userDetails:userDetails.reverse(),
		   rooms:rooms.reverse(),
		   myId:myId,
		   selectedIds:selected.reverse(),  
		   messanger:docs.reverse(),
		   loading:false,
		  })
		   })
		 //  this.ScrollToBottom();
		messenger.on("errSendMsg",()=>{
		  let mesg=this.state.messages;
		  let eror={
			error:'Could not proceed with the request'
		  
		  }
		  mesg.push(eror);
		  this.setState({
		  messages:mesg
		  })
	
	
	
		})
		messenger.on('newMessage',(message)=>{
			console.log('in new message')

		  	let msg=this.state.messages
			
			msg.push(message)
			
			this.setState({
			  messages:msg
			})
	

			message.lastMessageDate=Date.now()
		  
			for(let j=0;j<this.state.messanger.length;j++){
			  if(this.state.messanger[j]._id==message.roomId){
				let convo=this.state.messanger;
				let user=this.state.userDetails
				let nUser;
				convo.splice(j,1);
				nUser=user[j];
				user.splice(j,1);
				user.unshift(nUser);
				convo.unshift(message)
				this.setState({
				  messanger:convo,
				  userDetails:user
				})
				return;
			  }
		  }
		})
	}
	
	fetchMessage(room,pic,otherId,fullname,event){
	console.log('in fetch message',fullname)
		event.preventDefault();
		this.setState({
		  roomId:room,
		  pic:pic,
		  messageSender:true,
		  otherId:otherId,
		  selectedFname:fullname
		  })
		messenger.emit("getMyConvo",{room:room,otherId:otherId})
		}
									 
	  onMessageType2(event){
		  var sym=/<|>/g;
		 if(!event.target.value.match(sym)|| event.target.value==""){
			 this.setState({
				 message:event.target.value
			  })
			}
		}
	  
	 
		onMessageType(e){
		 if(e.key=="Enter"){
		  this.onSendMessage(e)
		   }
	  }
	  onSendMessage(event){
		event.preventDefault();
		let message=encodeHtml(this.state.message.trim())
		if(message==""){
		  return;
		}
		else{
			messenger.emit("addMessage",{text:message,id:this.state.myId,roomId:this.state.roomId,otherId:this.state.otherId}
			)

			console.log(this.state.roomId,'roooooooooooooooooM')
			let object={text:message,id:this.state.myId,roomId:this.state.roomId,otherId:this.state.otherId}
			console.log(object,'object')
			this.setState({
			message:'',
		  })
		  let  msg=this.state.messages
		  let nMsg={
		  _userId:this.state.myId,
		  message:message,
		  roomId:this.state.roomId,
		  createdAt:Date.now()
		  }
		msg.push(nMsg)
		this.setState({
		  messages:msg
		})
	  }  
	}
	render(){
		const Conversations=()=>{
			let Convo=[];
			if(this.state.messanger.length>0){
 
				Convo=this.state.messanger.map((el,i)=>{
			 let pic=this.state.userDetails[i].photo
				let msg=el.message.slice(0,30)		
			 if(el.message.length>30) msg=msg+"...";
				if(el['seen']==true){
			 return(
		 		<li key={i}  className="active" onClick={this.fetchMessage.bind(this,this.state.rooms[i],photo,this.state.userDetails[i]._id,this.state.userDetails[i].username)}>
		 		<div className="usr-msg-details">
		 			<div className="usr-ms-img">
		 				 <img src={pic} alt={this.state.userDetails[i].username}/> 
		 				<span className="msg-status"></span>
		 			</div>
		 			<div className="usr-mg-info">
		 				<h3>{this.state.userDetails[i].username}</h3>
		 				<p>{msg}</p>
		 			</div>
		 		
		 			<span className="posted_time">{new Date(el.lastMessageDate).toLocaleDateString()}</span>
		 			<span className="msg-notifc">*</span>
		 		</div>
		 	
		 	</li>
				)
			}
				else{
					return(
						<li key={i}>
						<div className="usr-msg-details" onClick={this.fetchMessage.bind(this,this.state.rooms[i],pic,this.state.userDetails[i]._id,this.state.userDetails[i].firstName)}>
							<div className="usr-ms-img">
								<img src={pic} alt={this.state.userDetails[i].username}/>
							</div>
							<div className="usr-mg-info">
								<h3>{this.state.userDetails[i].username}</h3>
								<p>{msg}</p>
							</div>
							{/* <!--usr-mg-info end--> */}
							<span className="posted_time">{new Date(el.lastMessageDate).toLocaleDateString()}</span>
						</div>
						{/* <!--usr-msg-details end--> */}
					</li>
					)
					}
			
				})
			
			}
			return Convo
		}
		const Messages=()=>{
      var letDate=new Date()
      
      let Msg=[];
      if(this.state.messages.length>0){
        Msg=this.state.messages.map((el,i)=>{
        if(el && el.error){
				return(
					<div style={{backgroundColor:'#E8E8E8', textAlign:'center',margin:'0 auto',padding:'1px'}} key={i}> {el.error}</div>
				)
				}
				if(el && el._userId==null){
				return(		<div key={i}>
							<div>
							<div style={{backgroundColor:'#E8E8E8', textAlign:'center',margin:'0 auto',padding:'1px'}}> {el.message}</div>
							<br/>
			 	</div>
				 </div>)
				}
				if(el && el._userId===this.state.myId){
					return(
						<div className="main-message-box ta-right" key={i}>
						<div className="message-dt" style={{float:'right'}}>
							<div className="message-inner-dt">
								<p><Linkify>{el.message}</Linkify></p>
							</div>
							{/* <!--message-inner-dt end--> */}
							{new Date(el.createdAt).toLocaleDateString()>=new Date(letDate).toLocaleDateString() ?
							<span>{new Date(el.createdAt).toLocaleTimeString()}</span>
								:
							<span>{new Date(el.createdAt).toLocaleDateString()+" "+new Date(el.createdAt).toLocaleTimeString()}</span>}
			
						</div>
						{/* <!--message-dt end--> */}
						<div className="messg-usr-img">
						</div>
						{/* <!--messg-usr-img end--> */}
					</div>

					)
				}
        else{
						return(
						<div className="main-message-box st3" key={i}>
						<div className="message-dt st3">
							<div className="message-inner-dt">
								<p><Linkify>{el.message}</Linkify></p>
							</div>
							{/* <!--message-inner-dt end--> */}
							{new Date(el.createdAt).toLocaleDateString()>=new Date(letDate).toLocaleDateString() ?
							<span>{new Date(el.createdAt).toLocaleTimeString()}</span>
								:
							<span>{new Date(el.createdAt).toLocaleDateString()+" "+new Date(el.createdAt).toLocaleTimeString()}</span>}
						</div>
						{/* <!--message-dt end--> */}
						<div className="messg-usr-img">
							<img src={this.state.pic} alt=""/>
						</div>
					</div>
							)
						}
				})
				
			}
				return Msg;
		}
		const ROOT_CSS=css({height:'604px',width:'100%'})
    
		return(


	<div className="wrapper">
		       <Nav verify={true} loggedIn={true} />
		<section className="messages-page">
			<div className="container">
				<div className="messages-sec">
					<div className="row">
						<div className="col-lg-4 col-md-12 no-pdd">
							<div className="msgs-list">
								<div className="msg-title">
									<h3>Messages</h3>
									<ul>
										<li><Link to="#" title=""><i className="fa fa-cog"></i></Link></li>
										<li><Link to="#" title=""><i className="fa fa-ellipsis-v"></i></Link></li>
									</ul>
								</div>
								{/* <!--msg-title end--> */}
								<div className="messages-list" style={{overflow:'auto',minHeight:'600px'}}>
									<ul>
										{this.state.loading?<div style={{textAlign:'center'}}><Dots color="#2898ed" animating={true} size={34} speed={1}  /></div>
											:
											<Conversations/>	
										}
									
									</ul>
								</div>
								{/* <!--messages-list end--> */}
							</div>
							{/* <!--msgs-list end--> */}
						</div>
						{this.state.messageSender?
							<div 
							className="col-lg-8 col-md-12 pd-right-none pd-left-none">
							<div className="main-conversation-box">
								<div className="message-bar-head">
									<div className="usr-msg-details">
										<div className="usr-ms-img">
											<img src={this.state.pic} alt ={this.state.selectedFname}/>
										</div>
										<div className="usr-mg-info">
											<h3>{this.state.selectedFname}</h3>
											<p>{this.state.onLine?"Online":<span> Last login: <TimeAgo   datetime= {new Date(this.state.lastLogin)}  /></span>}</p>
										</div>
										{/* <!--usr-mg-info end--> */}
									</div>
									<ul>
											<li>
												
												{/* <Link to="#" title="" ><i  className="fa fa-phone"></i>
												</Link> */}
												</li>
											</ul>
							
									<Link to="#" title=""><i className="fa fa-ellipsis-v"></i></Link>
								</div>
								{/* <!--message-bar-head end--> */}
								<div className="messages-line" >
			
								<ScrollToBottom className={ROOT_CSS}>
								<Messages/>									
								</ScrollToBottom>
										{/* <!--main-message-box end--> */}
								</div>
					
								{/* <!--messages-line end--> */}
								<div className="message-send-area">
										<div className="mf-field">
											<input type="text" name="message" value={this.state.message} autoFocus onChange={this.onMessageType2.bind(this)} onBlur={()=>{this.setState({focus:false})}} onKeyPress={this.onMessageType.bind(this)} placeholder="Type a message here"/>
											<button onClick={this.onSendMessage.bind(this)}>Send</button>
										</div>
											{/* <ul>
											<li><Link to="#" title=""><i className="fa fa-phone"></i></Link></li>
											</ul> */}
								</div>
								{/* <!--message-send-area end--> */}
							</div>
							
							{/* <!--main-conversation-box end--> */}
						</div>:<div/>}
					</div>
				</div>
				{/* <!--messages-sec end--> */}
			</div>
		</section>
		{/* <!
		--messages-page end--> */}


			{/* <Footer/> */}

	{/* <!--theme-layout end--> */}
	</div>
		)
	}
}

export default Messages;