  //Dynamic Template

  

  Session.setDefault("current_template", "index_content");

  Accounts.ui.config({

    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });
  Meteor.startup(function(){
      $(".authentication_triggers").click(function(event){
          
          Session.set('current_template', $(event.target).data("activeTemplate"));
          
        });
  });

  Template.display_content.helpers({
      activeTemplate: function(){
        return  Session.get('current_template');
      }
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