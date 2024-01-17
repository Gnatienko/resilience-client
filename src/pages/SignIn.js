import React, { useState, useEffect } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { Spin, message } from "antd"

import "./SignIn.css"

const SignIn = () => {
  const [jwtToken, setJwtToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const maxRetries = 20
  const retryDelay = 1000
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (jwtToken) {
      sessionStorage.setItem("jwtToken", jwtToken)
      window.location.reload()
    }
  }, [jwtToken])

  const handleGoogleLogin = (credentialResponse, retryCount = 0) => {
    if (retryCount === 0) {
      setLoading(true)
    }

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
        if (retryCount < maxRetries) {
          setTimeout(() => {
            handleGoogleLogin(credentialResponse, retryCount + 1)
          }, retryDelay)
        } else {
          const error = () => {
            messageApi.open({
              type: "error",
              content: "Can not login. Try again later",
            })
          }
          error()
          console.error("Max retries reached. Unable to complete the request.")
          setLoading(false)
        }
      })
  }

  return (
    <div className="center-container">
      {contextHolder}

      {loading ? (
        <Spin tip="Loading" size="large"></Spin>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed")
          }}
        />
      )}
    </div>
  )
}

export default SignIn
