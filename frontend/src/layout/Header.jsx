import Logo from '../components/Logo.jsx'
import Titulo from '../components/Titulo.jsx'
import styled from 'styled-components'
import Nav from '../components/Nav.jsx'

function Header () {
    return (
        <>
            <Head>
                <Logo />
                <Titulo />
            </Head>
            <Nav />
        </>
    );
}

const Head = styled.div`
    display:flex;
`
export default Header;