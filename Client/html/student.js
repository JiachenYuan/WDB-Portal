(() => {
    // --- getCookie(cname) ---
    // gets the cookie with the key of cname
    // function getCookie(cname) {
    //     let name = cname + "=";
    //     let decodedCookie = decodeURIComponent(document.cookie);
    //     let ca = decodedCookie.split(';');
    //     for(let i = 0; i <ca.length; i++) {
    //       let c = ca[i];
    //       while (c.charAt(0) == ' ') {
    //         c = c.substring(1);
    //       }
    //       if (c.indexOf(name) == 0) {
    //         return c.substring(name.length, c.length);
    //       }
    //     }
    //     return "";
    // }

    // let token = getCookie("token")
    // if (token == "") {
    //     console.log("token error")
    // }


    // --- function getTokenFromQuery() ---
    // get url parameter values using javascript
    function getTokenFromQuery() {
        const queryString = window.location.search;
        console.log(queryString);

        const urlParams = new URLSearchParams(queryString);
        const tkn = urlParams.get('token')
        console.log(tkn);
        
        return tkn;
    }
    let token = getTokenFromQuery();


    // --- creates HW divs ---
    const makeHW = (link, grade) => {
        var div = document.createElement("div");
        div.className = "___";  // TODO: insert chosen div name for homeworks
        // TODO: customize div depending on design
        return div
    }


    let hw_list = []


    // --- fetchHW() ---
    // fetches list of homeworks, given the token obtained from cookies
    async function fetchHW() {
        const response = await fetch('http://localhost:4000/api/list', {
            method: 'GET',
            headers: {
                'token': token
            }
        });
        const hws = await response.json();
        return hws;
    }


    // grab list of homeworks and create new homework divs, appending them to a list
    fetchHW().then(hws => {
        for (let i = 0; i < hws.length; i++) {
            hw_list[i] = hws[i];
        }

        var hw_HTML_list = document.getElementById("___");  // TODO: insert id for html list of hws
        for (let hw of hw_list) {
            hw_HTML_list.appendChild(makeHW(hw[0], hw[1]))  // create child div for each hw
        }
    });
})