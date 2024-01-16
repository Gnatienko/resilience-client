import React from "react"
import { GoogleLogin } from "@react-oauth/google"
import { TEST_CORE_URL } from "../CONST.js"

const GoogleLoginButton = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        // console.log(credentialResponse)
        fetch(TEST_CORE_URL + "/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialResponse),
        })
          .then((response) => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error("Failed to send credentials to the server")
            }
          })
          .then((data) => {
            console.log(data)
          })
          .catch((error) => {
            console.error("An error occurred during the request:", error)
          })
      }}
      onError={() => {
        console.log("Login Failed")
      }}
    />
  )
}

export default GoogleLoginButton
