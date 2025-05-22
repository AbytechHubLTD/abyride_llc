import React from "react";
// Import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import 'swiper/css/navigation';
import "swiper/css/pagination";
import Image1 from "../assets/images/NewFolder/unnamed.png";
import Image2 from "../assets/images/NewFolder/rober.png";
import Image3 from "../assets/images/NewFolder/steve.png";
import Image4 from "../assets/images/NewFolder/cicero.png";

const reviews = [
  {
    image: Image1,
    name: "Ivana Curo",
    title: "clients",
    rating: 5,
    review:
      "Would 100% recommend this company! Very reliable and driver was exactly on time by the minute. I had scheduled my pick up in advance since it was an early morning time. Very much appreciate the reliability of this service and will use again. If you are in need of transportation, this is the place to call in Grand Rapid",
  },
  {
    image: Image3,
    name: "Steve hubbs",
    title: "Local guide",
    rating: 5,
    review:
      "Superb service, this company came thru in a crunch, very professional, on time, great light conversation. Clean and spacious ride. Called several other and tried apps and none would even pick me up!!  Thank you for excellent service!!",
  },
  {
    image: Image2,
    name: "B Robeir (Ben)",
    title: "Local guide",
    rating: 5,
    review:
      "Now this is what a Taxi service should be all about. Great conversations, shows how he is changing the business of requesting for a ride. Lyft and Uber has nothing on this company.",
  },
  {
    image: Image4,
    name: "Ange Cicero",
    title: "Local guide",
    rating: 5,
    review:
      "They are pleasant to work with and dependable. I called 4 companies who never showed up. . My driver was so polite. This ride is greatly appreciated.thank you",
  },
];

function ReviewsSection() {
  return (
    <section className="bg-gray-100 py-16 px-2 rounded-2xl mb-4 pb-10 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 capitalize leading-10">
            What Our Clients Say About Us
          </h2>
        </div>

        {/* Swiper Integration */}
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }} // Auto-scroll every 3 seconds
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-600 mb-6 capitalize font-medium text-center leading-8">
                  {review.review}
                </p>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-6 h-6 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center space-x-4 mt-8">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold ml-6">
                      {review.name}
                    </h3>
                    <p className="text-gray-600 ml-6 pb-4">{review.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ReviewsSection;
