import React, { useState, useEffect } from "react"
import { GoogleLogin } from "@react-oauth/google"

const SignIn = () => {
  const [jwtToken, setJwtToken] = useState(null)

  useEffect(() => {
    if (jwtToken) {
      sessionStorage.setItem("jwtToken", jwtToken)
      window.location.reload()
    }
  }, [jwtToken])

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        fetch(process.env.REACT_APP_CORE_URL + "/sign-in", {
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

export default SignIn
