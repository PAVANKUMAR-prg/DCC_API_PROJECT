
// import React, { useState, useEffect } from 'react';

// const About = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slides = [
//     {
//       image: './public/images/groupImage-4.jpg',
//       title: 'Our Mission',
//       description:
//         'At Davangere Cycling Club, our mission is to promote health, unity, and adventure. We foster a supportive environment for cyclists of all skill levels to enjoy the open road and push their limits.',
//     },
//     {
//       image: './public/images/groupImage-2.jpg',
//       title: 'Our Vision',
//       description:
//         'Our vision is to create a thriving cycling community that embraces the outdoors, builds lasting friendships, and encourages a healthy lifestyle for generations to come.',
//     },
//     {
//       image: './public/images/groupImage-3.webp',
//       title: 'Our History',
//       description:
//         'Founded by a group of passionate cyclists, Davangere Cycling Club began with the simple goal of enjoying nature and connecting with like-minded individuals. Over the years, our community has grown, hosting events, group rides, and charitable activities, making a positive impact on society.',
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   const nextSlide = () => {
//     setCurrentIndex((currentIndex + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="max-w-7xl container mx-auto px-6 py-10 bg-black text-center ">
//       {/* Header Section */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-bold text-white">About Davangere Cycling Club</h1>
//         <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
//           Join our journey to inspire, connect, and foster a love for cycling. Embrace the outdoors, build friendships, and pedal towards a healthier future.
//         </p>
//       </div>

//       {/* Carousel Section */}
//       <div className="relative w-full md:w-2/3 lg:w-1/2 mx-auto mb-10">
//         <div className="overflow-hidden rounded-lg shadow-lg relative">
//           <img
//             src={slides[currentIndex].image}
//             alt={`Slide ${currentIndex + 1}`}
//             className="w-full h-64 md:h-80 object-cover transition-opacity duration-700 opacity-90 hover:opacity-100"
//           />
//           <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-left text-white opacity-90">
//             <h3 className="text-2xl font-semibold text-blue-400">{slides[currentIndex].title}</h3>
//             <p className="text-sm mt-2">{slides[currentIndex].description}</p>
//           </div>
//         </div>
//         <button
//           onClick={prevSlide}
//           className="absolute top-1/2 transform -translate-y-1/2 left-0 text-white p-2 rounded-full shadow-md hover:scale-105 transition-transform"
//         >
//           &lt;
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute top-1/2 transform -translate-y-1/2 right-0 text-white p-2 rounded-full shadow-md hover:scale-105 transition-transform"
//         >
//           &gt;
//         </button>
//         <div className="flex justify-center mt-4 space-x-2">
//           {slides.map((_, idx) => (
//             <button
//               key={idx}
//               className={`h-2 w-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-blue-500 scale-125' : 'bg-gray-500'}`}
//               onClick={() => setCurrentIndex(idx)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

//almost ready this is above one but miss with color---------------------------------------
import React, { useState, useEffect } from 'react';

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: './public/images/groupImage-4.jpg',
      title: 'Our Mission',
      description:
        'At Davangere Cycling Club, our mission is to promote health, unity, and adventure. We foster a supportive environment for cyclists of all skill levels to enjoy the open road and push their limits.',
    },
    {
      image: './public/images/groupImage-2.jpg',
      title: 'Our Vision',
      description:
        'Our vision is to create a thriving cycling community that embraces the outdoors, builds lasting friendships, and encourages a healthy lifestyle for generations to come.',
    },
    {
      image: './public/images/groupImage-3.webp',
      title: 'Our History',
      description:
        'Founded by a group of passionate cyclists, Davangere Cycling Club began with the simple goal of enjoying nature and connecting with like-minded individuals. Over the years, our community has grown, hosting events, group rides, and charitable activities, making a positive impact on society.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center py-12 px-4">
      <div className="max-w-5xl w-full mx-auto bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 border border-orange-500 rounded-xl shadow-2xl p-8">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-black mb-4 tracking-wide relative">
            About Davangere Cycling Club
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-16 h-1 bg-orange-400"></span>
          </h1>
          <p className="text-lg text-white leading-relaxed max-w-3xl mx-auto">
            Join our journey to inspire, connect, and foster a love for cycling. Embrace the outdoors, build friendships, and pedal towards a healthier future.
          </p>
        </div>
       
        {/* Carousel Section */}
        <div className="relative w-full md:w-3/4 mx-auto mb-10">
          <div className="overflow-hidden rounded-lg shadow-lg relative">
            <img
              src={slides[currentIndex].image}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-left text-white">
              <h3 className="text-2xl font-semibold text-orange-300">{slides[currentIndex].title}</h3>
              <p className="text-sm mt-2">{slides[currentIndex].description}</p>
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 transform -translate-y-1/2 left-0 text-white p-2 bg-black bg-opacity-70 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 transform -translate-y-1/2 right-0 text-white p-2 bg-black bg-opacity-70 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            &gt;
          </button>
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 w-2 rounded-full ${
                  currentIndex === idx ? 'bg-orange-500 scale-125' : 'bg-gray-500'
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;
