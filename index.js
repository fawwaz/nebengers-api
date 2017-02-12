var axios = require('axios');

var Nebengers = (function(){
	
	this.token = null;

	this.URL_base 			= 'https://apps.nebengers.com';
	this.URL_login 			= this.URL_base + '/api/user/login';
	this.URL_explore 		= this.URL_base + '/api/ride';
	this.URL_popular		= this.URL_base + '/api/popularroute';
	this.URL_ride_detail	= this.URL_base + '/api/ride'; // add ride_id in the end off it
	this.URL_ride_request	= this.URL_base + '/api/riderequest/forride'; // add ride_id in the end off it
	this.URL_message_create	= this.URL_base + '/api/usermessage/create';
	this.URL_message_conv	= this.URL_base + '/api/usermessage/conversation'; // add conversation id to find detail
	this.URL_logout			= this.URL_base + '/api/logout';

	this.default_current_latitude 			= -6.191807746887207;
	this.default_current_longitude 			= 106.80147552490234; 
	this.default_page 						= 1;
	this.default_perPage 					= 15;
	this.default_popularRoute				= 3;
	this.default_ordertype 					= 'asc';
	this.default_orderby					= 'updated_at'; // e.g : 'updated_at' | 'departure_datetime' | 'distance'
	this.default_withDistance 				= true;
	this.default_filterKeywordLocationTo 	= null; // e.g : mall, kopo, miko
	this.default_filterVehicleTypes			= null; // e.g : 'motorcycle' | 'car'
	this.default_filterDepartureTimeTo 		= null; // e.g : date time format ()
	this.default_filterDepartureTimeFrom 	= null; // e.g : date time format (2017-02-17T13:51:00+0700)

	// Set the token
	this.setToken = function(token){
		this.token = token;
	}

	this.getToken = function(){
		return this.token;
	}


	// Return token
	this.login = function(user, callback, handler){
		axios.post(this.URL_login,{
			email:user.email,
			password:user.password
		}).then(function(response){
			this.setToken(response.data.result.token);
			callback(response.data);
		}).catch(function(error){
			handler(error);
		});
	}


	// List any posibility
	this.explore = function(params,callback, handler){
		axios.get(this.URL_explore,{
			params:{
				token : params.token || this.token,
				page : params.page || this.default_page,
				perPage : params.perPage || this.default_perPage,
				ordertype : params.ordertype || this.default_ordertype,
				filterPopularRoute : params.filterPopularRoute || this.default_popularRoute,
				withDistance : params.withDistance || this.default_withDistance,
				current_latitude : params.current_latitude || this.default_current_latitude,
				current_longitude : params.current_longitude || this.default_current_longitude,
				filterKeywordLocationTo: params.filterKeywordLocationTo || this.default_filterKeywordLocationTo
			}
		}).then(function(response){
			callback(response.data);
		}).catch(function(error){
			handler(error);
		})
	}


	this.popular = function(params, callback, handler){
		axios.get(this.URL_popular,{
			params:{
				token: params.token || this.token,
				page : params.page || this.default_page,
				perPage : params.perPage || this.default_perPage,
				ordertype : params.ordertype || this.default_ordertype,
				withDistance : params.withDistance || this.default_withDistance,
				current_latitude : params.current_latitude || this.default_current_latitude,
				current_longitude : params.current_longitude || this.default_current_longitude
			}
		}).then(function(response){
			callback(response.data);
		}).catch(function(error){
			handler(error);
		});
	}


	this.ride_detail = function (params, callback, handler){
		var url_detail = this.URL_ride_detail + '/' + params.ride_id;
		
		axios.get(url_detail,{
			params:{
				token: params.token || this.token,
				current_latitude : params.current_latitude || this.default_current_latitude,
				current_longitude : params.current_longitude || this.default_current_longitude	
			}
		}).then(function(response){
			callback(response.data);
		}).catch(function(error){
			handler(error);
		});
	}

	this.ride_request = function (params, callback, handler){
		var url_ride_request = this.URL_ride_request + '/' + params.ride_id;
		axios.get(url_ride_request,{
			params:{
				token: params.token || this.token,
				perPage: params.perPage || this.default_perPage,
				current_latitude : params.current_latitude || this.default_current_latitude,
				current_longitude : params.current_longitude || this.default_current_longitude	
			}
		}).then(function(response){
			callback(response.data);
		}).catch(function(error){
			handler(error);
		});	
	}


	this.logout = function (params, callback, handler){
		axios.post(this.URL_logout,{
			token: this.token,
			params: {
				current_latitude : params.current_latitude || this.default_current_latitude,
				current_longitude : params.current_longitude || this.default_current_longitude
			}
		}).then(function(response){
			callback(response.data);
		}).catch(function(error){
			handler(error);
		});	
	}

	this.message_create = function (params, callback, handler){
		console.log(params);
		axios.post(this.URL_message_create,{
			token: this.token,
			message: params.message,
			to_user_id: params.to_user_id,
			params: {
				current_latitude : params.current_latitude || this.default_current_latitude,
				current_longitude : params.current_longitude || this.default_current_longitude
			}
		}).then(function(response){
			callback(response.data);
		}).catch(function(error){
			handler(error);
		});
	}

	this.message_conv_list = function(params, callback, handler){
		axios.get(this.URL_message_conv,{
			params: {
				token: params.token || this.token,
				orderby: 'updated_at',
				ordertype: 'desc',
				perPage: params.perPage || this.default_perPage,
				current_latitude : params.current_latitude || this.default_current_latitude,
				current_longitude : params.current_longitude || this.default_current_longitude	
			}
		}).then(function(response){
			callback(response.data);
		}).catch(function(error){
			handler(error);
		});
	}


	return this;
})();

module.exports = Nebengers;
