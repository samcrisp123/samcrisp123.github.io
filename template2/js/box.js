

var url;
async function getAccessToken() {
  var ttl = sessionStorage.getItem("ttl");
  var now = new Date().getTime();
  console.log("ttl:" + (ttl - now) / 1000);
  var timeLeft = (ttl - now) / 1000;
  //Update token if less than 4 mins left
  if (timeLeft < 240 && timeLeft > 10) {
    console.log("calling normally as we still have time");
    getToken(sessionStorage.getItem("key"), writeUpdate, 'get async');
  }
  else if (timeLeft <= 10) {
    //Token expired - get new and await result
    console.log("calling with await as token is dead");
    var div = diver();
    $("#diver").show();
    await getToken(sessionStorage.getItem("urlParams"), writeUpdate, 'get sync and wait');
    $("#diver").hide();
  }

  return sessionStorage.getItem("accessToken");
}
function writeUpdate(text) {
  console.log("token updated from generator:" + text);
}

function getToken(urlParams, callback, page) {
  console.log("renwing from:" + sessionStorage.getItem("tokenURL"));
  return $.ajax({
   url:  sessionStorage.getItem("tokenURL") + '/tokengenerator?key=' + sessionStorage.getItem("key"),
    headers: {},
    type: 'get',
    success: function (response) {
      console.log("accessToken:" + response.userToken);
      sessionStorage.setItem("accessToken", response.userToken);
      sessionStorage.setItem("userName", response.userName);
      sessionStorage.setItem("key", response.key);
      sessionStorage.setItem("ttl", response.ttl);
      callback(page);
    },
    error: function (xhr, status, error) {
      console.log(JSON.stringify(xhr));
      console.log("error:" + xhr.responseText);

    }
  });
}
function login(page, urlParams) {
  getToken(urlParams, redirect, page);

}
function redirect(page) {
  window.location.replace(page);
}
function getPageData() {
  let searchParams = new URLSearchParams(window.location.search);
  var path = window.location.pathname;
  var title = searchParams.get("title");
  var page = path.split("/").pop();
  var pageData = [];
  $.each(navigation, function (k, data) {
    console.log(page == data.page);
    if (page == data.page && title == data.title) {
      pageData = data;
    }
  });
  return pageData;
}


function diver() {
  console.log("here");
  var div1 = document.createElement('div');
  div1.id = 'diver';
  div1.className = 'modal fade';
  div1.setAttribute("role", "dialog");

  var innerDiv1m = document.createElement('div');
  innerDiv1m.className = 'modal-dialog modal-sm';
  div1.appendChild(innerDiv1m);

  var innerDiv2m = document.createElement('div');
  innerDiv2m.className = 'modal-content';
  innerDiv1m.appendChild(innerDiv2m);

  var innerDiv3 = document.createElement('div');
  innerDiv3.className = 'modal-header';
  innerDiv2m.appendChild(innerDiv3);



  var headerM = document.createElement("H4");
  headerM.className = 'modal-title';
  innerDiv3.appendChild(headerM);

  var innerDiv31 = document.createElement('div');
  innerDiv31.className = 'modal-body';
  innerDiv2m.appendChild(innerDiv31);

  var para = document.createElement('p');
  innerDiv31.appendChild(para);
  para.innerHTML = "<img src='img/custom/ajax-loader_transparent.gif'/> Please wait while we refresh your token";

  var innerDiv32 = document.createElement('div');
  innerDiv32.className = 'modal-footer';
  innerDiv2m.appendChild(innerDiv32);



  document.getElementsByTagName('body')[0].appendChild(div1);
  return div1;
}