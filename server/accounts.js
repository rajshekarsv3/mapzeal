ServiceConfiguration.configurations.remove({
  service: "facebook"
});
ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: "1534395086796051",
  loginStyle: "redirect",
  secret: "f47af10c39127278d2a866aa4ad13bed"
});
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "143060884382-ph3h5l1g89vrmd2khgp4bgq8jucqe052.apps.googleusercontent.com",
  loginStyle: "redirect",
  secret: "JU3Sa41FvTSCqRN1VI0K1hks"
});


Meteor.startup(function() {

    reCAPTCHA.config({
        privatekey: '6LeZpP8SAAAAABdi04hIg7o1wSoaQ9VvIABbVYN7'
    });
    process.env.MAIL_URL="smtp://teammapzeal%40gmail.com:mapzeal123@smtp.gmail.com:465/"; 
    // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
      Accounts.emailTemplates.from = 'Team Mapzeal <teammapzeal@gmail.com>';

      // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
      Accounts.emailTemplates.siteName = 'Mapzeal Studio';

      // A Function that takes a user object and returns a String for the subject line of the email.
      Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Confirm Your Email Address';
      };

      // A Function that takes a user object and a url, and returns the body text for the email.
      // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    url = url.replace('#/', '');
    url = url.replace('verify-email', 'verifyEmail');
    return 'click on the following link to verify your email address: ' + url;
  };


  Accounts.onCreateUser(function(options, user) {
      user.profile = {};

      // we wait for Meteor to create the user before sending an email
      Meteor.setTimeout(function() {
        Accounts.sendVerificationEmail(user._id);
      }, 2 * 1000);

      return user;
    });

  Accounts.validateLoginAttempt(function(attempt){  
      if(attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
        throw new Meteor.Error(499, 'Please check your email and confirm your account.');
        //Router.go('/');
        //alert('hey');
        console.log('not verified');
      return false; // the login is aborted
    }
    return true;
  });

  Accounts.emailTemplates.resetPassword.text = function(user, url) {
      url = url.replace('#/', '');
      url = url.replace('reset-password', 'resetPassword')

     return "Click this link to reset your password: " + url  }

});

Meteor.methods({
    formSubmissionMethod: function(captchaData) {

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

        if (!verifyCaptchaResponse.success) {
          
            console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
            throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
        } else
            console.log('reCAPTCHA verification passed!');

        //do stuff with your formData

        return true;
    },
    accountCreationMethod: function(formData){
      Accounts.createUser({
                  email: formData.username,
                  password: formData.password
                  });
    },
    redirectToFreshdesk: function(){
      if(this.userId) {
        var user = Meteor.users.findOne(this.userId);
        var username,email = '';
        //var user is the same info as would be given in Meteor.user();
        
        if (user.emails && user.emails[0] && user.emails[0].address){
          email =  user.emails[0].address;
          name = user.emails[0].address.split('@')[0];
        }
        else if (user.services.facebook && user.services.facebook.name ){
          name = user.services.facebook.name;
          email =  user.services.facebook.email;
        }
        if (user.services.google && user.services.google.name ){
          name = user.services.google.name ;
          email = user.services.google.email ;
        }
        var utctime = Math.floor((new Date()).getTime()/1000 );
        //Generating Hash
        var crypto = Npm.require('crypto');
        var message = name+email+utctime;
        email =  encodeURIComponent(email);
        
        var redirect_url='https://mapzeal.freshdesk.com/login/sso?name='+name+"&email="+email+"&timestamp="+utctime+"&hash="+crypto.createHmac('md5','8df09b222f2f89c80656e89458ab4557').update(message).digest('base64');
                return redirect_url;
    }
      
    
      
    }
    


});
