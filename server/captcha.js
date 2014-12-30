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


});

