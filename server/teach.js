Meteor.methods({
	teachFormSubmission : function(formData){
		Email.send({
		  from: "teammapzeal@gmail.com",
		  to: "rajshekarsv3@gmail.com",
		  subject: "Hi I am interested to teach at meteor",
		  text: "formData"
		});
		return true;
	}
});