Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: '6LeZpP8SAAAAABdi04hIg7o1wSoaQ9VvIABbVYN7'
    });
});

Meteor.methods({
    formSubmissionMethod: function(formData, captchaData) {

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

        if (!verifyCaptchaResponse.success) {
            console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
            throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
        } else
            console.log('reCAPTCHA verification passed!');

        //do stuff with your formData

        return true;
    }
});