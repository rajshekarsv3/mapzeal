Meteor.methods({
	teachFormSubmission : function(formData){
		Email.send({
		  from: "teammapzeal@gmail.com",
		  to: "arumugham2@gmail.com",
		  subject: "Hi I am interested to teach at meteor",
		  text: "Name : "+formData['firstName']+" "+formData['lastName']+" Email: "+formData['mailId']+" Phone No:"+formData['phoneNo']+" Reason : "+formData['reason']

		});
		return true;
	}
});