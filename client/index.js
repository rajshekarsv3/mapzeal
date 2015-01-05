  //Dynamic Template

  





  Template.home.helpers({
      activeTemplate: function(){
        return  Session.get('current_template');
      }
    });


  Template.login.events({
    'click #btn_sign_in': function(){
      var username = $("#username").val();
      var password = $("#password").val();
      
      Meteor.loginWithPassword(username,password,function(err){
        if(err)
          alert(err['reason']+' Please try again');
        else
          Router.go('/');
        
      });
    },
    
  });

  Template.userRightBar.helpers({
    displayName: function () {
      var user = Meteor.user();
      if (!user)
        return '';

      if (user.profile && user.profile.name)
        return user.profile.name;
      if (user.username)
        return user.username;
      if (user.emails && user.emails[0] && user.emails[0].address)
        return user.emails[0].address;
      if (user.services.facebook && user.services.facebook.name )
        return user.services.facebook.name 

      return '';
    }
  });

  Template.signup.events({
    'change #show_password': function(){
      if($("#show_password").is(':checked')){
        $("#sign_up_password").attr('type','text');
      }
      else
      {
        $("#sign_up_password").attr('type','password');
      }
      }
    ,
    'click #btn_sign_up': function(){
      // Validation

       var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
       


       try{
               
                if( ! $("#sign_up_email").val() || ! regex.test($('#sign_up_email').val()))
                    throw { msg : "Please Enter valid Email id" , elem : "#sign_up_email"}
                if( ! $("#sign_up_password").val())
                    throw { msg : "Password cannot be empty" , elem : "#sign_up_password"}
                        


            }
            catch(e){

                alert(e.msg);
                setTimeout(function(){$(e.elem).focus()},0);
                return;
            }

      //get the captcha data

        var captchaData = {
            captcha_challenge_id: Recaptcha.get_challenge(),
            captcha_solution: Recaptcha.get_response()
        };

        var formData = {
          username: $("#sign_up_email").val(),
          password: $("#sign_up_password").val()
        }

        Meteor.call('formSubmissionMethod', captchaData, function(error, result) {
            if (error) {
                Recaptcha.reload();
                alert("Please Confirm that you are not robot by entering Captcha");
                $("#sign_up_email").val('');
                $("#sign_up_password").val('');

            } else {
              console.log("inside ")
              Meteor.call('accountCreationMethod', formData,function(error,result){
                  if(error) {
                    if(error.error==403 && error.reason== "Email already exists.")
                      alert("Email Id already exists . Please use Login page to continue");
                    else
                      alert("Something went wrong . Please contact our support team");
                    Router.go('/login');
                  }else
                  {
                    alert("Account Created successfully. Please Check your email for verification link");
                    Router.go('/');
                  }
              });
                
            }
        });
      


    }
    });

/*Template._loginButtonsLoggingInPadding.helpers({
  dropdown: dropdown
});*/

/*$(document).ready(function(){

        
});*/

/*  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });*/
  Template.userRightBar.events({
    'click #btn_logout': function () {
      Meteor.logout();
      
    }
  });

  Template.otherLoginOptions.events({
    'click #btn_facebook,#link-facebook': function(){
        console.log("hello");
        Meteor.loginWithFacebook({ requestPermissions: ['email']},
        function (error) {
            if (error) {
                return console.log(error);
            }
        });
    },
    'click #btn_google,#link-google':function(){
        Meteor.loginWithGoogle({ requestPermissions: ['email']},
        function (error) {
            if (error) {
                return console.log(error);
            }
        });
    }
  });

Meteor.startup(function(){


  

  
  $(document).ready(function(){
    console.log("hi");
    console.log($('.top-bar-logo').text());
    $(document).foundation();
    $('.top-bar-logo').click(function(){
      console.log("hi");
    alert('hi');
    });
  });

  reCAPTCHA.config({
        publickey: '6LeZpP8SAAAAAL2Bv-uQAz9azAcdsV8wlnNpbCCE'
    });

  
  


});




//Routing

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});


Router.route('/', function () {
     this.render('index_content');
 });

Router.route('/learn', function () {
  this.render('learn');
});

Router.route('/teach', function () {
  this.render('teach');
});


Router.route('/login', function () {
  this.render('login');
});

Router.route('/signup', function () {
  this.render('signup');
});

Router.route('/forgotPassword', function () {
  this.render('forgotPassword');
});

Router.route('/resetPassword/:_token', function () {
 
    Session.set('_resetPasswordToken',this.params._token)
    this.render('resetPassword');
  //else
    //this.render('/')
});

Router.route('/verifyEmail/:_token', function () {
 
    Accounts.verifyEmail(this.params._token, function(err) {
      console.log(err);
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          alert('Sorry this verification link has expired.');
        }
      } else {
        alert('Thank you! Your email address has been confirmed.');
        Router.go('/');
      }
    });
    
    //this.render('index_content')
   // this.render('verifyEmail');
  //else
    //this.render('/')
});


Router.route('/about', function () {
  this.render('about');
});




Router.route('/404Error', function () {
  this.render('404Error');
});

Router.configure({
    
    notFoundTemplate: '404Error',
    
});


//Verify Email

Template.index_content.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      console.log(err);
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          console.log('Sorry this verification link has expired.')
        }
      } else {
        console.log('Thank you! Your email address has been confirmed.')
      }
    });
  }
};


//Forgot Password


Template.forgotPassword.events({
  'click #btn_send_recovery_link': function(e, t) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    e.preventDefault();
 
    var email = $.trim($('#forgotPassWordEmail').val().toLowerCase());
    
     try{
         
          if( ! email || ! regex.test(email))
              throw { msg : "Please Enter valid Email id" , elem : "#forgotPassWordEmail"}
          
                  


      }
      catch(e){

          alert(e.msg);
          setTimeout(function(){$(e.elem).focus()},0);
          return;
      }


    
 
      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            alert('This email does not exist.');
          } else {
            alert('We are sorry but something went wrong.');
          }
        } else {
          alert('Email Sent. Check your mailbox.');
        }
      });
 
    
    return false;
  },
});


//Reset Password

 

 
Template.resetPassword.events({
  'click #btn_reset_password': function(e, t) {
    e.preventDefault();
    
    var password = $('#newPassword').val(),
        passwordConfirm = $('#confirmPassword').val();
 
    
    try{
               
                if( ! password)
                    throw { msg : "Please Enter New password" , elem : "#newPassword"}
                if( ! passwordConfirm)
                    throw { msg : "Password Confirm password" , elem : "#confirmPassword"}
                if( password != passwordConfirm)
                    throw { msg : "Password Mismatch" , elem : "#newPassword"}
                        


        }
        catch(e){

            alert(e.msg);
            setTimeout(function(){$(e.elem).focus()},0);
            return;
        }
        console.log(Session.get('_resetPasswordToken'));

      Accounts.resetPassword(Session.get('_resetPasswordToken'), password, function(err) {
        if (err) {
          alert('We are sorry but something went wrong.');
        } else {
          alert('Your password has been changed. Welcome back!');
          Router.go('/');
        }
      });
    
    return false;
  }
});





