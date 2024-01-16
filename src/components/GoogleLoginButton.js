import React, { useState, useEffect } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { CORE_URL } from "../CONST.js"

const GoogleLoginButton = () => {
  const [jwtToken, setJwtToken] = useState(null)

  useEffect(() => {
    if (jwtToken) {
      sessionStorage.setItem("jwtToken", jwtToken)
      // console.log(sessionStorage.getItem("jwtToken"))
    }
  }, [jwtToken])

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        fetch(CORE_URL + "/sign-in", {
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
            setJwtToken(data.jwtToken)
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
