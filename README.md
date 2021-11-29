### Password for MongoDB Atlas
 - Username: WDBBBB; Password: WDBBBB

### Update on 11/28/2021
 - API format:
 1. "upload/update homework link": /api/add ---- {hw_number: xxx, link: xxx}
 2. "revoke homework link": /api/delete ---- {hw_number: xxx}
 3. /user/signup: {username: xxx}
 4. /user/login: {username:xxx}

 - Usable Feature:
 1. add/delete the link to a particular homework
 2. signup and login with one tap on the Google Sign-in button.
 3. log out

 - Concern:
 1. For Google Sign-in, since the service is created by my personal account, if any teammate want to test it, I will need to manually enable the access from the local addresses of their express server. Could be solved if we ultimately mount the entire project onto a cloud server and only allow Google Sign-in request from that server IP.
 2. Thinking about front-end... Since we need hw_number as one of the data passed in the request to multiple apis, we need a way to figure out a homwork's index/number. HTML form might be a choice, but personally thought it was not an optimal choice.
 