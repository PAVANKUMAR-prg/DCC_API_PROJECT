import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Panel Header */}
      <div className="bg-gray-100 shadow-md rounded-t-lg p-4">
        <h1 className="text-2xl font-bold">About Us</h1>
      </div>

      {/* Panel Body */}
      <div className="bg-white shadow-md rounded-b-lg p-6">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-5/12 p-4">
            <img
              //src= "https://images.pexels.com/photos/17950464/pexels-photo-17950464/free-photo-of-person-on-bicycle-on-crosswalk.jpeg" // Update this path
              src='https://i.pinimg.com/736x/d5/8b/e8/d58be8784e8d9af68a76e135ce7882ae.jpg'
              alt="Cycling Club"
              className="img-responsive rounded-md shadow-md"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-7/12 p-4">
            <p className="text-lg text-justify indent-8">
              A group of enthusiasts with a passion for nature, health, and
              friendship started cycling a few years ago. With a common interest,
              we founded the “Davanagere Cycling Club” with the passion “Pedal With Pride.”
            </p>

            <p className="mt-4 text-lg text-justify indent-8">
              We started riding every alternate day with the motto of the Great Cyclist
              Mr. Eddy Merckx: “Ride as much or as little, or as long or as short as you feel,
              but ride.”
            </p>

            <p className="mt-4 text-lg text-justify indent-8">
              Very soon, the movement gained momentum with members of all ages, and we began
              connecting and inspiring many to join. Today, it’s one of the most premium
              cycling clubs in Davangere, boasting members from various professions, including
              businessmen, doctors, professors, students, and more.
            </p>

            <p className="mt-4 text-lg text-justify indent-8">
              Our club is affiliated with Audax India Randonneurs (AIR), and we regularly organize
              events like 100km to 600km brevets. We also successfully organized the MTB Challenge
              in May 2023.
            </p>

            <p className="mt-4 text-lg text-justify indent-8">
              The First Sunday of the Month (FSOM) Ride was introduced as a platform for new riders
              to enjoy the pleasure of cycling in nature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
