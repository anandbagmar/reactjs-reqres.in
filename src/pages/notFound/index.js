import React from "react";
import {NavLink} from "react-router-dom";
import Footer from "../../layouts/defaultLayout/footer";
import PublicHead from "../../components/publicHead";
import {Wrapper,TextWrapper} from "./styles";

const NotFound =() =>  {
        const title = "404 not found";
        return (
            <Wrapper>
                <PublicHead title={title} />
                <TextWrapper>
                    <h1>404</h1>
                    <h2>Not Found</h2>
                    <NavLink  exact  to='/'><i className="fas fa-arrow-left"/> Back to home</NavLink>
                </TextWrapper>
                <Footer/>
            </Wrapper>
        );
}
export default NotFound;
