"use client";
import React from "react";
import { imageCarousel, imageCarouselSmall } from "@/constants/hero";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Image from "next/image";

export const Hero: React.FC = () => {
  return (
    <>
      <main className="p-5 bg-white">
        <div className="items-center justify-center gap-8 w-full hidden lg:flex">
          <Swiper
            grabCursor={true}
            spaceBetween={30}
            loop={true}
            slidesPerView={1.3}
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
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
          >
            {imageCarousel.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={slide.image}
                  alt="slide-image"
                  className="rounded-xl"
                  width={1240}
                  height={450}
                />
              </SwiperSlide>
            ))}
            <div className="slider-controler">
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
        <div className="items-center justify-center gap-8 w-full flex lg:hidden">
          <Swiper
            grabCursor={true}
            spaceBetween={30}
            loop={true}
            slidesPerView={1.3}
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
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
          >
            {imageCarouselSmall.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={slide.image}
                  alt="slide-image"
                  className="rounded-xl"
                  width={640}
                  height={330}
                />
              </SwiperSlide>
            ))}
            <div className="slider-controler">
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
      </main>
    </>
  );
};
