import { Button } from "antd"
import { decodeJwt } from "jose"
import React, { useState, useEffect } from "react"

function SignOut() {
  const [userPicture, setUserPicture] = useState("")

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwtToken")

    if (jwtToken) {
      const decodedToken = decodeJwt(jwtToken)
      const pictureUrl = decodedToken?.picture

      if (pictureUrl) {
        setUserPicture(pictureUrl)
      }
    }
  }, [])

  const handleSignOut = () => {
    sessionStorage.removeItem("jwtToken")
    window.location.reload()
  }

  return (
    <div>
      {userPicture && (
        <img
          src={userPicture}
          alt="User Avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "1rem",
          }}
        />
      )}
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  )
}

export default SignOut
