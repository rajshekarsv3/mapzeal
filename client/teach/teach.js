Template.teach.events({
	'click #btn_teach_submit': function(){
		 var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		try{
            if( ! $("#firstName").val())
                throw { msg : "First Name cannot be empty" , elem : "#firstName"}
            if( ! $("#lastName").val())
                throw { msg : "Last Name cannot be empty" , elem : "#lastName"}
            if( ! $("#phoneNo").val())
                throw { msg : "Phone No cannot be empty" , elem : "#phoneNo"}
            if( ! $("#mailId").val() || ! email_regex.test($('#mailId').val()))
                throw { msg : "Please Enter valid Email id" , elem : "#mailId"}
            if( ! $("#reason").val())
                throw { msg : "Reason cannot be empty" , elem : "#reason"}
                    


        }
        catch(e){
        	
            alert(e.msg);
            setTimeout(function(){$(e.elem).focus()},0);
            return;
        }
		var formData = {
			firstName:$('#firstName').val(),
			lastName:$('#lastName').val(),
			mailId:$('#mailId').val(),
			phoneNo:$('#phoneNo').val(),
			reason:$('#reason').val()

		};

		Meteor.call('teachFormSubmission', formData, function(error, result) {
			console.log(formData);
            if (error) {
                alert('Some Error Occured! Please try again or contact our customer support team');

            } else {
            	alert('Thanks for your interest . We will contact you shortly');
              Router.go('/')
                
            }
        });
      
		
	}
});