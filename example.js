var nebengers = require('./index.js');

var tes2 = require('./tes2.js');

//console.log(tes2.getDay(2));
var shared = {
	callback : function(response){
		console.log("[Success !]");
		console.log(response.message);
		// console.log(response);
	},
	handler: function(error){
		console.log("[error]");
		console.log(error);
	}
}

var user = {
	email: 'tes@fun64.com',
	password: 'tes123'
}
nebengers.login(user,function(response1){
	shared.callback(response1);
	var popular = {
		page : 1,
		perPage : 20,
		ordertype : 'asc',
		withDistance : true
	};
	nebengers.popular(popular, shared.callback, shared.handler);

	var explore = {
		page : 2 ,
		perPage : 20,
		ordertype : 'asc',
		filterPopularRoute : 3,
		withDistance : true
	};

	nebengers.explore(explore, function(response2){
		shared.callback(response2);

		var ride_detail = {
			ride_id: response2.result.data[9].id
		};
		nebengers.ride_detail(ride_detail, function(response3){
			shared.callback(response3);

			var message = {
				message : 'mas',
				to_user_id : response3.result.user_id
			};
			nebengers.message_create(message, shared.callback, shared.handler);

			var ride_request = {
				ride_id: response2.result.data[0].id
			}
			nebengers.ride_request(ride_request, shared.callback, shared.handler);

		}, shared.handler);
	}, shared.handler);		
},shared.handler);







// nebengers.ride_detail()
// nebengers.ride_request()
// nebengers.message_create()
// nebengers.message_conv()
// nebengers.logout()