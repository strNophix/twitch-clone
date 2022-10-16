import { FC } from "react"

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => {
  return <img src="./assets/images/logo.png" className={className} alt="logo" />
}

export default Logo
