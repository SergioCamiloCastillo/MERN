import React from "react";
import AcademyLogo from "../../../../assets/img/png/academy-logo.png";
import "./PresentationCourses.scss";

export default function PresentationCourses() {
    return (
        <div className='presentation-courses'>
            <img src={AcademyLogo} alt='Cursos de sergio camilo castillo'></img>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non dapibus mauris, id eleifend libero. Etiam lacus ex, tincidunt sit amet odio non, convallis aliquet justo. Aliquam massa mi, tincidunt id justo et, feugiat tempor dolor.
            </p>
            <p>
                Cras velit lacus, blandit vitae lectus nec, placerat posuere augue. Mauris urna ex, dictum vitae consequat quis, aliquam ut eros. Aenean tincidunt, neque nec placerat ullamcorper, felis risus scelerisque magna, a aliquam ex enim at nisi. Donec nec tellus id elit mollis maximus ac sit amet dui. Ut sed fermentum elit.
            </p>

        </div>
    )
}