


 async function getAccessToken() {
       var ttl = sessionStorage.getItem("ttl");
    var now = new Date().getTime();
    console.log("ttl:" + (ttl-now)/1000);
    var timeLeft = (ttl-now)/1000;
    //Update token if less than 4 mins left
    if(timeLeft<240 && timeLeft>10) {
      console.log("calling normally as we still have time");
        getToken(sessionStorage.getItem("urlParams"),writeUpdate,'get async');
    }
    else if(timeLeft<=10) {
      //Token expired - get new and await result
      console.log("calling with await as token is dead");
      await getToken(sessionStorage.getItem("urlParams"),writeUpdate,'get sync and wait');
    }

  return sessionStorage.getItem("accessToken");
  }
function writeUpdate(text) {
  console.log("token updated from generator:" + text);
}

 function getToken(urlParams,callback,page) {
  return $.ajax({
    url: 'https://box-heroku-token-generator.herokuapp.com/jwttokengenerator?',
    headers: {},
    type: 'get',
    data:urlParams,
    success: function(response) {
      console.log("accessToken:" + response.userToken);
      sessionStorage.setItem("accessToken",response.userToken);
      sessionStorage.setItem("ttl",response.ttl);
      sessionStorage.setItem("urlParams",urlParams);
      callback(page);
    },
    error: function(xhr, status, error) {
      console.log(JSON.stringify(xhr));
      console.log("error:" + xhr.responseText);

  }
});
}
function login(page,urlParams) {
  getToken(urlParams,redirect,page);

}
function redirect(page) {
  window.location.replace(page);
}
