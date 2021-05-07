import React from 'react';
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import HowCoursesWork from "../components/Web/HowMyCoursesWork";
import ReviewsCourses from "../components/Web/ReviewsCourses";
export default function Home() {
    return (
        <>
            <MainBanner></MainBanner>
            <HomeCourses></HomeCourses>
            <HowCoursesWork></HowCoursesWork>
            <ReviewsCourses></ReviewsCourses>
        </>
    )
}