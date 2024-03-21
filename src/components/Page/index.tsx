import styled from "styled-components";

interface PageProps { // On présice que la prop children est un ReactNode
    children: React.ReactNode; // ReactNode est un type qui peut contenir n'importe quel type de noeud React
    className?: string // On précise que la prop className est un string
}

interface PageStyledProps { // On précise que la prop className est un string
    className?: string
}

const PageStyled = styled.div<PageStyledProps>`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    margin: 0 auto;
    box-sizing: border-box;
`

/*
 * On crée un composant Page qui prend en paramètre les props children et className
 * De cette manière on peut rajouter des className supplémentaire au besoins dans les composants qui utilise Page
*/
const Page: React.FC<PageProps> = ({children, className}) => {
    return <PageStyled className = {className}>{children}</PageStyled>;
};

export default Page