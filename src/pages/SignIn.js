import React, { useState, useEffect } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { Spin, message, Button } from "antd"

import "./SignIn.css"

const SignIn = () => {
  const [jwtToken, setJwtToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingTip, setLoadingTip] = useState("Loading")
  const [messageApi, contextHolder] = message.useMessage()

  const maxRetries = 21
  const retryDelay = 1000

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
          if (retryCount === 3) {
            setLoadingTip("A couple more seconds...")
          }
          if (retryCount === 7) {
            setLoadingTip("Very close...")
          }
          if (retryCount === 11) {
            setLoadingTip("Almost there...")
          }
          if (retryCount === 11) {
            setLoadingTip("Seems something goes wrong...")
          }
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
        <Spin tip={loadingTip} size="large"></Spin>
      ) : (
        <>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Login Failed")
            }}
          />
          <Button
            onClick={() => {
              setLoading(true)
              sessionStorage.setItem(
                "jwtToken",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDkwODUzNDY3NjEzLTVtbnFkOW5xN2FtOXYxM2piNjE4a242aDJ2ZDlvMHRzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA5MDg1MzQ2NzYxMy01bW5xZDlucTdhbTl2MTNqYjYxOGtuNmgydmQ5bzB0cy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNjI4OTc5NTQ4MTQ4OTI5MzI3NyIsImVtYWlsIjoiZ25hdGllbmtvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MDU1ODM3MTUsIm5hbWUiOiJPbGVrc2l5IEduYXRpZW5rbyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMcFJqcDFDTFdkbzFrTkhwZVFscnV1YkRaVUJuT2hBTnA1R3J4cEZOWnJzZz1zOTYtYyIsImdpdmVuX25hbWUiOiJPbGVrc2l5IiwiZmFtaWx5X25hbWUiOiJHbmF0aWVua28iLCJsb2NhbGUiOiJlbi1VUyIsImlhdCI6MTcwNTU4NDAxNSwiZXhwIjozMzI2MjQ4NTU3MSwianRpIjoiMzZmNTZmN2Y1YTNlODg0N2U5N2VkZDcxMzZhN2Y3MGFkOTExNThjNyJ9.c4sGyW37IiNcZ6zVrVKz3cl-P0fwOOJaTYgGNs03oVU"
              )
              setLoading(false)
              window.location.reload()
            }}
          >
            {" "}
            Test SignIn
          </Button>
        </>
      )}
    </div>
  )
}

export default SignIn
