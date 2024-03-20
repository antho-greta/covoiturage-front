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
    align-items: center;
    height: 100vh;
    margin: 0 auto;
    box-sizing: border-box;
`

function Page({children}: PageProps) {
    return (
        <PageStyled className="bg-white">
            {children}
        </PageStyled>
    )
}

export default Page