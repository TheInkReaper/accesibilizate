import styled from 'styled-components'

// Estructura simple, para ir teniendo una idea de cómo queremos que quede
function Main () {
    return (
        <>
            <StyleSection>
                <p>***Incidencias recientes***</p>
                {/* a completar como componente */}           
            </StyleSection>
            <StyleSection>
                <p>***Incidencias más destacadas***</p>
                {/* a completar como componente */} 
            </StyleSection>
        </>
    );
}

const StyleSection = styled.section`
    border: 1px solid black;
    padding: 10%;
    width: 60vw;
    margin: auto;
    
`

export default Main;