import React, { Component } from 'react';
import Routers from './Route';
import {Provider} from 'react-redux';
import store from './store';
import 'react-activity/dist/react-activity.css';
import $ from 'jquery';
class App extends Component {
  componentDidMount(){
    $(window).on("load", function() {
     
      $("#profile-picture").on("click", function(){
        $(".post-popup.pst-pj").removeClass("active");
        $(".wrapper").removeClass("overlay");
        return false;
      });
        
      //  ============= SIGNIN CONTROL FUNCTION =========
    
      $('.sign-control li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.sign-control li').removeClass('current');
        $('.sign_in_sec').removeClass('current');
        $(this).addClass('current animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
      });
    
      //  ============= SIGNIN TAB FUNCTIONALITY =========
    
      $('.signup-tab ul li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.signup-tab ul li').removeClass('current');
        $('.dff-tab').removeClass('current');
        $(this).addClass('current animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
      });
    
         
      //  ============= COVER GAP FUNCTION =========
    
      // var gap = $(".container").offset().left;
      // $(".cover-sec > a, .chatbox-list").css({
      //   "right": gap
      // });
  
    
      //  ============= LOCATION EDIT FUNCTION =========
    
      $(".lct-box-open").on("click", function(){
        $("#location-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
      });
      $(".close-box").on("click", function(){
        $("#location-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
      });
     

    
   
    
    
      //  ============== ChatBox ============== 
    
    
      $(".chat-mg").on("click", function(){
        $(this).next(".conversation-box").toggleClass("active");
        return false;
      });

      $(".close-chat").on("click", function(){
        $(".conversation-box").removeClass("active");
        return false;
      });
    
      
    
      // ============== Menu Script =============
    
      $(".menu-btn > a").on("click", function(){
        $("nav").toggleClass("active");
        return false;
      });
    
    
      
    
       
      //  ============= FORUM LINKS MOBILE MENU FUNCTION =========
    
      $(".forum-links-btn > a").on("click", function(){
        $(".forum-links").toggleClass("active");
        return false;
      });

      $("html").on("click", function(){
        $(".forum-links").removeClass("active");
      });
      
    
      //  ============= PORTFOLIO SLIDER FUNCTION =========
    
      // $('.profiles-slider').slick({
      //   slidesToShow: 3,
      //   slck:true,
      //   slidesToScroll: 1,
      //   prevArrow:'<span class="slick-previous"></span>',
      //   nextArrow:'<span class="slick-nexti"></span>',
      //   autoplay: true,
      //   dots: false,
      //   autoplaySpeed: 2000,
      //   responsive: [
      //   {
      //     breakpoint: 1200,
      //     settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 1,
      //     infinite: true,
      //     dots: false
      //     }
      //   },
      //   {
      //     breakpoint: 991,
      //     settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2
      //     }
      //   },
      //   {
      //     breakpoint: 768,
      //     settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1
      //     }
      //   }
      //   // You can unslick at a given breakpoint now by adding:
      //   // settings: "unslick"
      //   // instead of a settings object
      //   ]
    
    
      // });
    
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
