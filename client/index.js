  //Dynamic Template

  

  Session.setDefault("current_template", "index_content");

  Accounts.ui.config({

    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });


  Template.display_content.helpers({
      activeTemplate: function(){
        return  Session.get('current_template');
      }
    });
  Template.create_account.events({
    'click .authentication_triggers': function(){
        console.log(Meteor.user());
        Session.set('current_template', $(event.target).data("activeTemplate"));
    }
  });
  Template.login.events({
    'click .authentication_triggers': function(){
        console.log("hi");
        Session.set('current_template', $(event.target).data("activeTemplate"));
    }
  });
  Template.sign_in.events({
    'click #btn_sign_in': function(){
      var username = $("#username").val();
      var password = $("#password").val();
      Meteor.loginWithPassword(username,password,function(){
        Session.set("current_template", "index_content");
      });
    }
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

  Template.sign_up.events({
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

Template._loginButtonsLoggingInPadding.helpers({
  dropdown: dropdown
});

$(document).ready(function(){

        
});

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


