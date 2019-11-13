(function ($) {

  	Drupal.behaviors.nigovcookieset = {

		attach: function (context, settings) {
	  
			// Based on Creare's 'Implied Consent' EU Cookie Law Banner v:2.4
			// Conceived by Robert Kent, James Bavington & Tom Foyster		
			var dropCookie = true;            // set to false to disable cookie for testing purposes.                                    
			var cookieDuration = Drupal.settings.nigov_cookie_set.cookieDuration;  
			var cookieName = Drupal.settings.nigov_cookie_set.cookieName;  
			var cookieValue = 'on';     

			var strMessage = Drupal.settings.nigov_cookie_set.cookieMessage;
			
			// only show the cookie to anonymous users.
			if ($('body').hasClass('not-logged-in')) { 
				if($.cookie(cookieName) != cookieValue){
					createDiv(); 
					window.setTimeout(function() {
						$('#cookie-law').fadeOut();
					}, 999999999);
				} 
			}

			// Hide the cookie message on click	
			$('.cookie-law-button .call-to-action').click(function() {
				hideDiv(1000);
			});

			function hideDiv(speed) {
    			$('#cookie-law .cookie-law-inner').slideToggle(speed);
    			$('#cookie-law').remove();  
			}
			

			function createDiv(){
				var bodytag = document.getElementsByTagName('body')[0];
				var div = document.createElement('div');
				div.setAttribute('id','cookie-law');
				div.innerHTML = strMessage;

				// bodytag.appendChild(div); // Adds the Cookie Law Banner just before the closing </body> tag
				// or
				bodytag.insertBefore(div, bodytag.firstChild); // Adds the Cookie Law Banner just after the opening <body> tag
				 
				document.getElementsByTagName('body')[0].className+=' cookiebanner'; //Adds a class to the <body> tag when the banner is visible
				 
				createCookie(cookieName, cookieValue, cookieDuration); // Create the cookie
			}
		 		 
			function createCookie(name,value,days) {
				if (days) {
					var date = new Date();
				}
				else var expires = "";
				if(dropCookie) { 
					$.cookie(
						name,
						value,
						{ expires: days, path: '/' }
					);

				}
			}
		 
			function checkCookie(name) {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			}
		 
			function eraseCookie(name) {
				$.removeCookie(name);
			}
			
		}
	}
}) (jQuery);
;
