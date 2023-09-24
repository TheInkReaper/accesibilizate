import styled from 'styled-components'

function Nav () {
    return (

        <StyledHeader>
            <nav>
                <a href="#">Home</a>
                <a href="#">F&Q</a>
                <a href="#">Login</a>
            </nav>
        </StyledHeader>

        // Después habrá que pasar a un NavLink con las Routes
    );
}

const StyledHeader = styled.header`
    padding: 1rem;
    border-bottom: 2px solid black;
    margin-bottom: 2rem;

    nav {
        display: flex;
        gap: 1.5rem;
        justify-content: space-around;

        .active {
            text-decoration: underline;
        }
    }
`;
export default Nav;
