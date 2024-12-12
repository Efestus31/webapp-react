import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <>
            <header>
                <nav>
                    <NavLink to='/'>Movies</NavLink>
                </nav>
            </header>
        </>
    )
}