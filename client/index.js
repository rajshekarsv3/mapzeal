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
      Accounts.createUser({
      username: $("#sign_up_username").val(),
      password: $("#sign_up_password").val(),
      emails: [
        {address: $("#signup-name").val(), verified: true}
        // Other required field values can go here
        ]
      },function(){
        Session.set("current_template", "index_content");
      }, function(error) {
        if (error) {
          console.log(error);
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
    'click #btn_facebook': function(){
        console.log("hello");
        Meteor.loginWithFacebook({ requestPermissions: ['email']},
        function (error) {
            if (error) {
                return console.log(error);
            }
        });
    },
    'click #btn_google':function(){
        Meteor.loginWithGoogle({ requestPermissions: ['email']},
        function (error) {
            if (error) {
                return console.log(error);
            }
        });
    }
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


