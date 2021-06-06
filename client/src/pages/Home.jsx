import React from 'react';
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import HowCoursesWork from "../components/Web/HowMyCoursesWork";
import ReviewsCourses from "../components/Web/ReviewsCourses";
import {Helmet} from "react-helmet";
export default function Home() {
    return (
        <>
        <Helmet><title>Sergio Castillo</title><meta name="description" data-react-helmet="true" content="Home | Web sobre programacion."></meta></Helmet>
            <MainBanner></MainBanner>
            <HomeCourses></HomeCourses>
            <HowCoursesWork></HowCoursesWork>
            <ReviewsCourses></ReviewsCourses>
        </>
    )
}