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
          }).then(res=>res.json().then(converted=>console.log(converted)));
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
      'onfailure': onFailure
      
    });
  }

  async function signOut() {
      await gapi.auth2.getAuthInstance().signOut().then(()=>{
          console.log("User signed out!")
      });
  }