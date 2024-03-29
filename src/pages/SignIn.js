import React, { useState, useEffect } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { Spin, message, Button } from "antd"
import logo from "../logo.png"

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
    <div
      className="center-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {contextHolder}

      <div
        className="logo-container"
        style={{
          textAlign: "center",
          position: "absolute",
          top: 0,
          margin: "7rem",
        }}
      >
        <img src={logo} style={{ width: 100 }} alt="icon" />
        <h1 style={{ marginBottom: "3rem" }}>Resilience</h1>
      </div>

      {loading ? (
        <Spin tip={loadingTip} size="large"></Spin>
      ) : (
        <div
          className="sign-in-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Login Failed")
            }}
          />
          <Button
            style={{ marginTop: "10px" }}
            onClick={() => {
              setLoading(true)
              sessionStorage.setItem(
                "jwtToken",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDkwODUzNDY3NjEzLTVtbnFkOW5xN2FtOXYxM2piNjE4a242aDJ2ZDlvMHRzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA5MDg1MzQ2NzYxMy01bW5xZDlucTdhbTl2MTNqYjYxOGtuNmgydmQ5bzB0cy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNjI4OTc5NTQ4MTQ4OTI5MzI3NyIsImVtYWlsIjoidGVzdCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MDU1ODU5ODgsIm5hbWUiOiJ0ZXN0IiwicGljdHVyZSI6Imh0dHBzOi8vZGFzYWNvdW5zZWxpbmcud2VlYmx5LmNvbS91cGxvYWRzLzUvNi8xLzQvNTYxNDk1NDUvMjI2Mzg2NF9vcmlnLmpwZyIsImdpdmVuX25hbWUiOiJ0ZXN0IiwiZmFtaWx5X25hbWUiOiJ0ZXN0IiwibG9jYWxlIjoiZW4tVVMiLCJpYXQiOjE3MDU1ODYyODgsImV4cCI6MjcwNTU4OTQ4NywianRpIjoiOTVlNDAyNjJiZDQyOGJjNjJlZmMyZmM4Mzk1M2E2NDA4ZWIyZTJlNyJ9.gi_Mszdq8aizUOLe002Vbqe3fmzUkPk02idrWwg25nk"
              )
              setLoading(false)
              window.location.reload()
            }}
          >
            Test SignIn
          </Button>
        </div>
      )}
    </div>
  )
}

export default SignIn
