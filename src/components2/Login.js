import React from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios';
import Dots from 'react-activity/lib/Dots';
import History from '../History';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			signIn:true
		}
	}
	render(){
        return(
			<div>
            <div className="wrapper">		

		<div className="sign-in-page">
			<div className="signin-popup">
				<div className="signin-pop">
					<div className="row">
						<div className="col-lg-6">
							<div className="cmp-info">
								<div className="cm-logo">
									<img src="images/cm-logo.png" alt=""/>
									<p>Workwise,  is a global freelancing platform and social networking where businesses and independent professionals connect and collaborate remotely</p>
								</div>
                                {/* <!--cm-logo end-->	 */}
								<img src="images/cm-main-img.png" alt=""/>			
							</div>
                            {/* <!--cmp-info end--> */}
						</div>
						<div className="col-lg-6">
							<div className="login-sec">
								<ul className="sign-control">
									<li data-tab="tab-1" className="current"><a href="#" title="">Sign in</a></li>				
									<li data-tab="tab-2"><a href="#" title="">Sign up</a></li>				
								</ul>			
								<div className="sign_in_sec current" id="tab-1">
									
									<h3>Sign in</h3>
									<form>
										<div className="row">
											<div className="col-lg-12 no-pdd">
												<div className="sn-field">
													<input type="text" name="username" placeholder="Username"/>
													<i className="la la-user"></i>
												</div>
                                                {/* <!--sn-field end--> */}
											</div>
											<div className="col-lg-12 no-pdd">
												<div className="sn-field">
													<input type="password" name="password" placeholder="Password"/>
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
													<a href="#" title="">Forgot Password?</a>
												</div>
											</div>
											<div className="col-lg-12 no-pdd">
												<button type="submit" value="submit">Sign in</button>
											</div>
										</div>
									</form>
									<div className="login-resources">
										<h4>Login Via Social Account</h4>
										<ul>
											<li><a href="#" title="" className="fb"><i className="fa fa-facebook"></i>Login Via Facebook</a></li>
											<li><a href="#" title="" className="tw"><i className="fa fa-twitter"></i>Login Via Twitter</a></li>
										</ul>
									</div>
                                    {/* <!--login-resources end--> */}
								</div>
                                {/* <!--sign_in_sec end--> */}
								<div className="sign_in_sec" id="tab-2">
									<div className="signup-tab">
										<i className="fa fa-long-arrow-left"></i>
										<h2>johndoe@example.com</h2>
										<ul>
											<li data-tab="tab-3" className="current"><a href="#" title="">User</a></li>
											<li data-tab="tab-4"><a href="#" title="">Company</a></li>
										</ul>
									</div>
                                    {/* <!--signup-tab end-->	 */}
									<div className="dff-tab current" id="tab-3">
										<form>
											<div className="row">
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="name" placeholder="Full Name"/>
														<i className="la la-user"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="country" placeholder="Country"/>
														<i className="la la-globe"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<select>
															<option>Category</option>
															<option>Category 1</option>
															<option>Category 2</option>
															<option>Category 3</option>
															<option>Category 4</option>
														</select>
														<i className="la la-dropbox"></i>
														<span><i className="fa fa-ellipsis-h"></i></span>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="password" placeholder="Password"/>
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="repeat-password" placeholder="Repeat Password"/>
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="checky-sec st2">
														<div className="fgt-sec">
															<input type="checkbox" name="cc" id="c2"/>
															<label for="c2">
																<span></span>
															</label>
															<small>Yes, I understand and agree to the workwise Terms & Conditions.</small>
														</div>
                                                        {/* <!--fgt-sec end--> */}
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<button type="submit" value="submit">Get Started</button>
												</div>
											</div>
										</form>
									</div>
                                    {/* <!--dff-tab end--> */}
									<div className="dff-tab" id="tab-4">
										<form>
											<div className="row">
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="company-name" placeholder="Company Name"/>
														<i className="la la-building"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="country" placeholder="Country"/>
														<i className="la la-globe"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="password" placeholder="Password"/>
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="repeat-password" placeholder="Repeat Password"/>
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="checky-sec st2">
														<div className="fgt-sec">
															<input type="checkbox" name="cc" id="c3"/>
															<label for="c3">
																<span></span>
															</label>
															<small>Yes, I understand and agree to the workwise Terms & Conditions.</small>
														</div>
                                                        {/* <!--fgt-sec end--> */}
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<button type="submit" value="submit">Get Started</button>
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
						<li><a href="help-center.html" title="">Help Center</a></li>
						<li><a href="about.html" title="">About</a></li>
						<li><a href="#" title="">Privacy Policy</a></li>
						<li><a href="#" title="">Community Guidelines</a></li>
						<li><a href="#" title="">Cookies Policy</a></li>
						<li><a href="#" title="">Career</a></li>
						<li><a href="forum.html" title="">Forum</a></li>
						<li><a href="#" title="">Language</a></li>
						<li><a href="#" title="">Copyright Policy</a></li>
					</ul>
					<p><img src="images/copy-icon.png" alt=""/>Copyright 2019</p>
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