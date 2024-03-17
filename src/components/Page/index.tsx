import {ReactNode} from "react";
import styled from "styled-components";

interface PageProps { // On présice que la prop children est un ReactNode
    children: ReactNode
}

interface PageStyledProps {
    className?: string
}

const PageStyled = styled.div<PageStyledProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
`

function Page({children}: PageProps) {
    return (
        <PageStyled>
            {children}
        </PageStyled>
    )
}

export default Page