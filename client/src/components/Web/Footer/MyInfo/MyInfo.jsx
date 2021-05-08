import React from 'react';
import LogoWhite from "../../../../assets/img/png/logo-white.png";
import "./MyInfo.scss";
import SocialLinks from "../../SocialLinks";

export default function MyInfo() {
    return (
        <div className='my-info'>
            <img src={LogoWhite} alt='Sergio Castillo Logo'></img>
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis arcu est, a cursus sem auctor et. Ut ac fermentum eros, nec gravida metus. Vestibulum ut accumsan erat, sollicitudin molestie enim. Morbi ullamcorper, dui in semper tempor.</h4>
            <SocialLinks></SocialLinks>
        </div>
    )
}
