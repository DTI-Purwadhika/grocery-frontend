"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Image from "next/image";

import { imageCarousel, imageCarouselSmall } from "@/constants/hero";

export const Hero: React.FC = () => {
  return (
    <>
      <main className="p-5 bg-white">
        <div className="items-center justify-center gap-8 w-full hidden lg:flex">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1.3,
              },
            }}
            grabCursor={true}
            loop={true}
            modules={[Pagination, Autoplay]}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            slidesPerView={1.3}
            spaceBetween={30}
          >
            {imageCarousel.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image
                  alt="slide-image"
                  className="rounded-xl"
                  height={450}
                  src={slide.image}
                  width={1240}
                />
              </SwiperSlide>
            ))}
            <div className="slider-controler">
              <div className="swiper-pagination" />
            </div>
          </Swiper>
        </div>
        <div className="items-center justify-center gap-8 w-full flex lg:hidden">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1.3,
              },
            }}
            grabCursor={true}
            loop={true}
            modules={[Pagination, Autoplay]}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            slidesPerView={1.3}
            spaceBetween={30}
          >
            {imageCarouselSmall.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image
                  alt="slide-image"
                  className="rounded-xl"
                  height={330}
                  src={slide.image}
                  width={640}
                />
              </SwiperSlide>
            ))}
            <div className="slider-controler">
              <div className="swiper-pagination" />
            </div>
          </Swiper>
        </div>
      </main>
    </>
  );
};
