import { Link } from "react-router"
import Navigation from "./Navigation"

const Navbar = () => {
  return (
    <div>
        <nav className="bg-gradient-to-b from-blue-700 to-blue-400 px-4 py-8 lg:px-10" >
            <div className="max-w-screen-xl mx-auto ">
                <div className="w-full flex items-center justify-between mb-14 px-8">
                    <Link to={"/"}>
                    <div className="lg:gap-x-14 flex-col items-start flex ">
                        <h1 className="text-3xl font-extrabold tracking-tighter leading-2">Parkview</h1>
                        <p className="font-extrabold tracking-wide text-3xl">Pro</p>
                    </div>
                    </Link>
                    <Navigation/>
                </div>
                <h1 className="text-2xl font-bold text-white/85">Hello, Welcome to Parking Pro </h1>
                <p className="text-sm ml-10 font-medium text-white/80">Automated Parking Vehicle Analysis System</p>
            </div>
        </nav>
    </div>
  )
}

export default Navbar