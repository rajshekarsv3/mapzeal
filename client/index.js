  //Dynamic Template

  




  Accounts.ui.config({

    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });


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

       


       try{
               
                if( ! $("#sign_up_email").val())
                    throw { msg : "Please Enter Email id" , elem : "#sign_up_email"}
                if( ! $("#sign_up_password").val())
                    throw { msg : "Password cannot be empty" , elem : "#sign_up_password"}
                        


            }
            catch(e){
                console.log(e);
                alert(e.msg);
                setTimeout(function(){$(e.elem).focus()},0);
                return;
            }

      //get the captcha data

        var captchaData = {
            captcha_challenge_id: Recaptcha.get_challenge(),
            captcha_solution: Recaptcha.get_response()
        };

        Meteor.call('formSubmissionMethod', captchaData, function(error, result) {
            if (error) {
                console.log('There was an error: ' + error.reason);
            } else {
                Accounts.createUser({
                  password: $("#sign_up_password").val(),
                  emails: [
                    {address: $("#sign_up_email").val(), verified: true}
                    // Other required field values can go here
                    ]
                  },function(){
                    Router.go('/');
                  }, function(error) {
                    if (error) {
                      console.log(error);
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

Router.route('/about', function () {
  this.render('about');
});


Router.route('/404Error', function () {
  this.render('404Error');
});







