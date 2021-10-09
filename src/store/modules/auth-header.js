export default function authHeader() {
    let user = localStorage.token;
    console.log("localStorage.getItem('user')")
    console.log(localStorage.token)
    console.log(localStorage.tokenTest)
  
    if (user) {
      return { "Content-type": "application/json", Authorization: 'Bearer TOKEN_TEST' };
    } else {
      return {};
    }
  }