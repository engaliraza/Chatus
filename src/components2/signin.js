import React, { Component } from 'react';
import {connect } from 'react-redux';
import {checkStatus} from '../store/action/apiAction'
import {login} from '../store/action/normalAction';
import History from '../History';
import {Link} from 'react-router-dom';
import {encodeHtml} from './filterHtml';
import {signup} from '../store/action/normalAction';

import Nav from './Nav';
class Signin extends Component {
    constructor(props) {
        super(props);
     
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
        
        this.state = {
        username: '',
        password: '',
        message:'',
        button:true,
        loading:false,
        text:{
           username: "",
            password: "",
            confirm: "",
          },
        message2:'',
        checked:false,
        loading:false
    }
    }
    componentDidMount(){
        // this.props.check();
    }
    
    signin(e) {
        e.preventDefault();
       if(this.state.button){

           let user = {
               username: encodeHtml(this.state.username.trim()),
               password: encodeHtml(this.state.password.trim()),
            }
            this.setState({button:false,loading:true})
            this.props.userLogin(user)
            this.setState({
                password: '',
                loading:false
            })
            
        
            setTimeout(this.setState({button:true}),3000)
         
        if(this.props.loggedin.message){
            this.setState({
                message:this.props.loggedin.message.message
            })
        }
            }   
     }
     changeHandle2(type, event) {
       
        var sym=/<|>/g;
             let text = this.state.text;
             if(!event.target.value.match(sym)||event.target.value===""){
                 switch(type){
     
                 case "confirm":
                 text[type] = event.target.value;
              
                 if(this.state.text.password!==this.state.text.confirm){
                         text[type] = event.target.value;
                         this.setState({
                             message2:'',
                             message:'Password do not match'
                             ,text
                         })
                     }
                     else if(this.state.text.confirm.length===0){
                         this.setState({
                             message:'',
                             message2:''
                             ,text
                         })
                     }
                     else {
                         this.setState({
                             message:'',
                             text,
                             message2:'Password match'
                         })
                     }
                                     
                             break;
                    case "username":
                    let symbols=/^[a-zA-Z0-9-/\s]*$/;
                    if(event.target.value.match(symbols)){
                     let text=this.state.text
                         text[type]=event.target.value
                     this.setState({
                         text
                        })
                    }
                    break;
                    
                             case "phone":
                                 console.log(event.target.value +"zaib")
                     if((event.target.value!=0 ||event.target.value=="")&& event.target.value.length<11  ){
                         
                         text[type] = event.target.value;
                         this.setState({
                             message2:'Type number without 0 e.g. 3123456789',
                             text
                         })
                     }
                             break;
                     case "firstName":
                     text[type] = event.target.value;
                     var letters = /^[a-zA-Z\s]*$/;
                     if(text[type].match(letters)){
                     this.setState({
                         text            
                         })
                     }
                         break;
                     case "lastName":
                     text[type] = event.target.value;
                     var letters = /^[a-zA-Z\s]*$/;
                     if(text[type].match(letters)){
                     this.setState({
                         text            
                         })
                     }
                         break;
                             
                         default:
                         text[type] = event.target.value;
                         this.setState({
                             text
                         })
                     }   
                     }  
                     }
         
         
         submit2(e) {
         e.preventDefault();
         console.log('out of checked')

            if(this.state.checked){
                console.log('inside checked')

                if(this.state.text.confirm.length<7 ||   this.state.text.username.length<6 ){
                     this.setState({
                         message2:'',
             
                         message:'Username and password should be greater than 6 length'
                     })
                         e.stopPropagation();
                     return;
                 }
                 
                 else{
     
                     if(this.state.text.password !== this.state.text.confirm){
                         this.setState({
                         message2:'',
                         message:'Password did not match'
                     })
                     e.stopPropagation();
                     return;
                 }
                 this.setState({loading:true}) 
                 let text=this.state.text;
                
              this.props.userSignup(text)
             
              this.setState({loading:false})
            //   setTimeout(2000,()=>{
            //       if(this.state.message=='successfully registered the user'){

            //           window.location.reload()
            //       }
            //   })
                }
             
             }
             else{
             this.setState({
                 message:'Kindly accept the license agreement'
                 })
             }      
          }
          onCheck(e){
            e.preventDefault();
            this.setState({checked:e.target.checked})
            console.log('checked')
        }
    
  
    componentWillReceiveProps(nextProps){
    if(nextProps){
        console.log(nextProps)
        if(nextProps.loggedin.user){
            History.push('/messanger')
            window.location.reload()
            
            
        }

        else if(nextProps.loggedin.message){
            
            if(nextProps.loggedin.message.message)
          {  this.setState({
                message:nextProps.loggedin.message.message
            })
            console.log(nextProps.loggedin.message.message,'sss ')
        }
            else{
                if(nextProps.loggedin.message=="successfully registered the user"){
                    window.location.reload()         
                }
                this.setState({
                    message:nextProps.loggedin.message
                }) 
                console.log(nextProps.loggedin.message.message,'ddd ')
         
            }
       
        }
        else if(nextProps.loggedin.error){
            this.setState({
                message:nextProps.loggedin.error.message
            })
        }
    }
}
    _onChangeEmail(event){
        var sym=/<|>/g;
       if(!event.target.value.match(sym)|| event.target.value==""){
           this.setState({
               username:event.target.value
            })
        }
    }
    _onChangePassword(event){
        var sym=/<|>/g;
      
        if(!event.target.value.match(sym)|| event.target.value==""){
        this.setState({
            password:event.target.value
        })
        }
    }


    render() {
        return (
            <div>
                <div>
                <Nav/>
                </div>
                <div className="wrapper">		

<div className="sign-in-page">
    <div className="signin-popup">
        <div className="signin-pop">
            <div className="row">
                <div className="col-lg-6">
                    <div className="cmp-info">
                        <div className="cm-logo">
                            <img src="images/cm-logo.png" alt=""/>
                            <p>Lets Connect Businesses</p>
                        </div>
                        {/* <!--cm-logo end-->	 */}
                        <img src="/308.jpg" alt="chatlogocaption" style={{left='160px', top='100px'}}/>			
                    </div>
                    {/* <!--cmp-info end--> */}
                </div>
                <div className="col-lg-6">
                    <div className="login-sec">
                        <ul className="sign-control">
                            <li data-tab="tab-1" onClick={()=>{this.setState({message:'',message2:''})}} className="current"><Link to="#"  title="">Sign in</Link></li>				
                            <li data-tab="tab-2" onClick={()=>{this.setState({message:'',message2:''})}}><Link to="#"  title="">Sign up</Link></li>				
                        </ul>			
                        <div className="sign_in_sec current" id="tab-1">
                            
                            <h3>Sign in</h3>
                            <form>
                                <div className="row">
                                    <div className="col-lg-12 no-pdd">
                                        <div className="sn-field">
                                            <input type="text" onChange={this._onChangeEmail.bind(this)} name="username" placeholder="Username"/>
                                            <i className="la la-user"></i>
                                        </div>
                                        {/* <!--sn-field end--> */}
                                    </div>
                                    <div className="col-lg-12 no-pdd">
                                        <div className="sn-field">
                                            <input type="password" onChange={this._onChangePassword.bind(this)} name="password" placeholder="Password"/>
                                            <i className="la la-lock"></i>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 no-pdd">
                                        <div className="checky-sec">
                                            <div className="fgt-sec">
                                                <input type="checkbox" name="cc" id="c1"/>
                                                <label for="c1">
                                                    <span></span>
                                                </label>
                                                <small>Remember me</small>

                                            </div>
                                            {/* <!--fgt-sec end--> */}
                                            <Link to="/passwordReset" title="">Forgot Password?</Link>
                                                   </div>
                                    </div>
                                    {this.state.message?
                                                        <small style={{color:'red'}}>{this.state.message}</small>
                                                :<small/>}
                             
                                    <div className="col-lg-12 no-pdd">
                                        <button type="submit" onClick={this.signin.bind(this)} value="submit">Sign in</button>
                                    </div>
                                </div>
                            </form>
                            {/* <div className="login-resources">
                                <h4>Login Via Social Account</h4>
                                <ul>
                                    <li><Link to="#" title="" className="fb"><i className="fa fa-facebook"></i>Login Via Facebook</Link></li>
                                    <li><Link to="#" title="" className="tw"><i className="fa fa-twitter"></i>Login Via Twitter</Link></li>
                                </ul>
                            </div> */}
                            {/* <!--login-resources end--> */}
                        </div>
                        {/* <!--sign_in_sec end--> */}
                        <div className="sign_in_sec" id="tab-2">
                            {/* <div className="signup-tab">
                                <i className="fa fa-long-arrow-left"></i>
                                <h2>yourusername@example.com</h2>
                                <ul>
                                    <li data-tab="tab-3" className="current"><Link to="#" title="">User</Link></li>
                                    <li data-tab="tab-4"><Link to="#" title="">Company</Link></li>
                                </ul>
                            </div> */}
                            {/* <!--signup-tab end-->	 */}
                            <div className="dff-tab current" id="tab-3">
                                <form>
                                    <div className="row">
                                         <div className="col-lg-12 no-pdd">
                                            <div className="sn-field">
                                            <input type="text" onChange={this.changeHandle2.bind(this,"username")} value={this.state.text.username} name="username" placeholder="Username"/>
                                                <i className="la la-dropbox"></i>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12 no-pdd">
                                            <div className="sn-field">
                                                <input type="password" name="password" onChange={this.changeHandle2.bind(this,"password")} placeholder="Password"/>
                                                <i className="la la-lock"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 no-pdd">
                                            <div className="sn-field">
                                                <input type="password" name="repeat-password" placeholder="Repeat Password" value={this.state.text.confirm} onChange={this.changeHandle2.bind(this,"confirm")}/>
                                                <i className="la la-lock"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 no-pdd">
                                            <div className="checky-sec st2">
                                                <div className="fgt-sec">
                                                    <input type="checkbox" name="cc" onChange={this.onCheck.bind(this)} id="c2"/>
                                                    <label for="c2">
                                                        <span></span>
                                                    </label>
                                                    <small>Yes, I understand and agree to the dbs <Link to="/" target="_blank">Terms {'&'} Conditions</Link> .</small>
                                               {this.state.message?
                                                        <small style={{color:'red'}}>{this.state.message}</small>
                                                :<small/>}
                                                 {this.state.message2?
                                                        <small style={{color:'green'}}>{this.state.message2}</small>
                                                :<small/>}
                                                        </div>
                                                {/* <!--fgt-sec end--> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-12 no-pdd">
                                            <button  onClick={this.submit2.bind(this)}>Get Started</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                            {/* <!--dff-tab end--> */}
                        </div>		
                    </div>
                    {/* <!--login-sec end--> */}
                </div>
            </div>		
        </div>
        {/* <!--signin-pop end--> */}
    </div>
    {/* <!--signin-popup end--> */}
    <div className="footy-sec">
        <div className="container">
            <ul>
                <li><Link to="#" title="">Help Center</Link></li>
                <li><Link to="#" title="">About</Link></li>
                <li><Link to="#" title="">Privacy Policy</Link></li>
                <li><Link to="#" title="">Community Guidelines</Link></li>
                <li><Link to="#" title="">Cookies Policy</Link></li>
                <li><Link to="#" title="">Career</Link></li>
                <li><Link to="#" title="">Forum</Link></li>
                <li><Link to="#" title="">Language</Link></li>
                <li><Link to="#" title="">Copyright Policy</Link></li>
            </ul>
            <p><img src="/images/copy-icon.png" alt=""/>Copyright 2019</p>
        </div>
    </div>
    {/* <!--footy-sec end--> */}
</div>
{/* <!--sign-in-page end--> */}


</div>
{/* <!--theme-layout end--></div> */}



             

            </div>
        )
    } 
}

function mapStateToProps(state){
    return({
        loggedin:state.normalReducer.user
    })
}
function mapDispatchToProps(dispatch){
    return({
        userLogin:(value)=>{
            dispatch(login(value))
        },
        check:()=>{
            dispatch(checkStatus())
        },
        userSignup:(value)=>{
            dispatch(signup(value))
        }
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Signin);