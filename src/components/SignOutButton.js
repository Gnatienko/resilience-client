import { Button } from "antd"

function SignOut() {
  const handleSignOut = () => {
    sessionStorage.removeItem("jwtToken")
    window.location.reload()
  }

  return <Button onClick={handleSignOut}>Sign Out</Button>
}

export default SignOut
