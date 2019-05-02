import React from "react";
import {FooterBox} from "./styles";

const Footer = () => {
        return (
            <FooterBox>
                <a href="https://reqres.in" target="_blank" rel="noopener noreferrer">API Doc</a>
                <span> - </span>
                <a href="https://reqres.in" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"/> Source Code</a>
            </FooterBox>
        );
}
export default Footer;
