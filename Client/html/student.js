
// --- function getTokenFromQuery() ---
// get url parameter values
function getTokenFromQuery() {
    const queryString = window.location.search;
    // console.log(queryString);

    const urlParams = new URLSearchParams(queryString);
    const tkn = urlParams.get('token')
    // console.log(tkn);
    
    return tkn;
}

function update() {
    let token = getTokenFromQuery();


    // --- creates a HW div using the link and grade ---
    const makeHW = (link, grade) => {
        var div = document.createElement("div");
        div.className = "hw";  // TODO: insert chosen div name for homeworks
        // TODO: customize div depending on design

        var hw_link = document.createElement("small");
        hw_link.id = "hw-link";
        hw_link.innerText = link;
        // console.log(link);

        var hw_grade = document.createElement("small");
        hw_grade.id = "hw-grade";
        hw_grade.innerText = " " + grade;
        // console.log(grade);

        div.appendChild(hw_link);
        div.appendChild(hw_grade);
        return div
    }



    let hw_list = []


    // --- fetchUser() ---
    // fetch user/me to get username and homeworklist
    async function fetchUser() {
        const response = await fetch('http://localhost:4000/user/me', {
            method: 'GET',
            headers: {
                'token': token
            }
        });
        const userinfo = await response.json();
        // console.log(userinfo);
        // console.log(userinfo.username);

        return userinfo;
    }


    // fetch user then set html elements
    fetchUser().then(userinfo => {
        const user = userinfo.username;
        const hwlist = userinfo.homeworklist;
        for (let i = 0; i < hwlist.length; i++) {
            hw_list[i] = hwlist[i];
        }

        var username_html = document.getElementById("username");
        username_html.innerText = user;

        for (let i = 1; i < 2; i++) {
            hw_link = document.getElementById("hw" + i + "Link");
            if (hw_list[i - 1].link == null) {
                hw_link.src = "https://jiachenyuan.github.io/JiachenYuan-WDB-education/proj1/index.html";
            } else {
                hw_link.src = hw_list[i - 1].link;
            }

        }

        // var hw1_link = document.getElementById("hw1Link");
        // hw1_link.src = hw_list[0].link;
    });
}
update();


async function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName()); 
    const userEmail = googleUser.getBasicProfile().getEmail();  
    const userDomain = userEmail.substr(userEmail.indexOf("@"));
    const userName = googleUser.getBasicProfile().getName();
    if (userDomain != "@berkeley.edu") {
        signOut();
        alert("Please use Berkeley Email...");
    } else {
          await fetch("http://localhost:4000/user/signup", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  "username": userName
              })
           })
    }
  }


  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure,
    });
  }


// adding sign out functionality to send to login page.
async function signOut() {
    await gapi.auth2.getAuthInstance().signOut().then(()=>{
        console.log("User signed out!")
    }).then(()=>{
        redirectWithoutToken();
        });
     }

async function redirectWithoutToken() {
    window.location.replace(`http://localhost:8000/index.html`);  
}


async function uploadHwLink(formID) {
    const form = document.getElementById(formID);
    const url = form.elements['fname'].value;
    var hw_number = null;
    console.log(url);
    if (formID.length === 7) {
        hw_number = parseInt(formID.charAt(2), 10);
    } else {
        hw_number = parseInt(formID.substring(2, 4));
    }
    await fetch(
        'http://localhost:4000/api/add', 
        {
            headers: {
                'token':getTokenFromQuery(),
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                "hw_number": hw_number-1,
                "link": url
            })
        }
    ).then(res => res.json().then((res)=> {
        console.log(res);
    }));
}