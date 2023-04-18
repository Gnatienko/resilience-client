import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.render(
  <GoogleOAuthProvider clientId="1090853467613-5mnqd9nq7am9v13jb618kn6h2vd9o0ts.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
  </GoogleOAuthProvider>,

  document.getElementById("root")
)
