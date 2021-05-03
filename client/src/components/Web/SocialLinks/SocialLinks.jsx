import React from "react";
import { ReactComponent as YouTubeIcon } from "../../../assets/img/svg/youtube.svg";
import { ReactComponent as FacebookIcon} from "../../../assets/img/svg/facebook.svg";
import { ReactComponent as TwitterIcon} from "../../../assets/img/svg/twitter.svg";
import { ReactComponent as LinkedinIcon} from "../../../assets/img/svg/linkedin.svg";
import "./SocialLinks.scss";

export default function SocialLinks(){
    return ( 
        <div className='social-links'>
            <a className="youtube" target="_blank" href=""><YouTubeIcon></YouTubeIcon></a>
            <a className="twitter" target="_blank" href=""><TwitterIcon></TwitterIcon></a>
            <a className="facebook" target="_blank" href=""><FacebookIcon></FacebookIcon></a>
            <a className="linkedin" target="_blank" href=""><LinkedinIcon></LinkedinIcon></a>
        </div>
    )
}