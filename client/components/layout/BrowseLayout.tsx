import NavBar from "../nav/NavBar"
import { NextPage } from "next"

const BrowseLayout: NextPage = ({ children }) => {
  return (
    <div className="font-inter flex flex-col h-screen text-gray-100">
      <NavBar />
      <main className="flex-1 flex flex-row overflow-hidden">{children}</main>
    </div>
  )
}

export default BrowseLayout
