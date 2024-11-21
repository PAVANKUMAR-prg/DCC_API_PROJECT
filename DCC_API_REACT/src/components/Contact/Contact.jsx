// import React, { useState } from 'react';
// import 'tailwindcss/tailwind.css';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// function Contact() {
//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     message: '',
//   });
  
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Prepare the payload with the additional fields
//     const payload = {
//       ...form,
//       isReviewed: false,
//       reviewedDate: new Date().toISOString(), // Current date and time in ISO format
//       reviewedBy: "", // Assuming initially empty
//     };
  
//     try {
//       const response = await fetch('https://localhost:7157/api/Contact/PostContactDetails', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });
  
//       if (response.ok) {
//         setSuccessMessage('Form submitted successfully!');
//         setErrorMessage('');
//         setForm({ firstName: '', lastName: '', email: '', message: '' }); // Clear form
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(`Failed to submit: ${errorData.message || 'Please try again.'}`);
//       }
//     } catch (error) {
//       setErrorMessage(`An error occurred: ${error.message}`);
//     }
//   };
  

//   return (
//     <div className="flex justify-between items-center min-h-screen bg-orange-300 p-10">
//       {/* Left Side Text */}
  
//       <div className="w-1/2 pr-10">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact us</h1>
//         <p className="text-lg text-gray-600 mb-6">
//         Have a question or need assistance? Fill out the form below with your inquiry.
//         Feel free to reach out to me through any of these below channels.

// </p>

//         {/* Social Media Links */}
//         <div className="mt-4">
//           <h2 className="text-gray-600 font-semibold mb-4">Follow us on</h2>
//           <div className="flex space-x-6">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
//               <FaFacebookF size={24} />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
//               <FaTwitter size={24} />
//             </a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500">
//               <FaInstagram size={24} />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
//               <FaLinkedinIn size={24} />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="w-1/3 bg-white shadow-md rounded-lg p-8">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex space-x-4">
//             <div className="w-1/2">
//               <label className="block text-sm font-semibold text-gray-700" htmlFor="firstName">
//                 First name*
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={form.firstName}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
//                 required
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="block text-sm font-semibold text-gray-700" htmlFor="lastName">
//                 Last name*
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={form.lastName}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
//               Email*
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700" htmlFor="message">
//               What can we help you with?
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               rows="4"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
//               required
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               Submit
//             </button>
//           </div>
//           {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
//           {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
//         </form>
//       </div>
      
//     </div>
//   );
// }

// export default Contact;

//000000000000000000000000000000000000000000000000000000000000000000
// import React, { useState } from 'react';
// import 'tailwindcss/tailwind.css';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// function Contact() {
//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     message: '',
//   });

//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       ...form,
//       isReviewed: false,
//       reviewedDate: new Date().toISOString(),
//       reviewedBy: '',
//     };

//     try {
//       const response = await fetch('https://localhost:7157/api/Contact/PostContactDetails', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setSuccessMessage('Thank you! Your message has been sent successfully.');
//         setErrorMessage('');
//         setForm({ firstName: '', lastName: '', email: '', message: '' });
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(`Submission failed: ${errorData.message || 'Please try again later.'}`);
//       }
//     } catch (error) {
//       setErrorMessage(`An error occurred: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-gray-200 p-5 md:p-10">
//       {/* Left Side Text */}
//       <div className="w-full md:w-1/2 md:pr-10 mb-8 md:mb-0">
//         <h1 className="text-5xl font-bold text-gray-100 mb-4">Contact Us</h1>
//         <p className="text-lg text-gray-400 mb-6">
//           We're here to help! Please fill out the form below to send us a message, or reach us via
//           our social channels. We'll get back to you as soon as possible.
//         </p>

//         {/* Social Media Links */}
//         <div className="mt-4">
//           <h2 className="text-gray-400 font-semibold mb-4">Connect with us</h2>
//           <div className="flex space-x-6">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
//               <FaFacebookF size={24} />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
//               <FaTwitter size={24} />
//             </a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
//               <FaInstagram size={24} />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors duration-200">
//               <FaLinkedinIn size={24} />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="w-full md:w-1/3 bg-gray-800 shadow-xl rounded-lg p-8 md:p-10 border border-gray-700">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//             <div className="w-full md:w-1/2">
//               <label className="block text-sm font-semibold text-gray-400" htmlFor="firstName">
//                 First Name*
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={form.firstName}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="w-full md:w-1/2">
//               <label className="block text-sm font-semibold text-gray-400" htmlFor="lastName">
//                 Last Name*
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={form.lastName}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-400" htmlFor="email">
//               Email*
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-400" htmlFor="message">
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               rows="4"
//               className="mt-1 block w-full px-3 py-2 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full bg-blue-600 text-white py-2 rounded-md transition-opacity ${
//                 loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'
//               } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             >
//               {loading ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//           {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
//           {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Contact;

//======================================================================================
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      isReviewed: false,
      reviewedDate: new Date().toISOString(),
      reviewedBy: '',
    };

    try {
      const response = await fetch('https://localhost:7157/api/Contact/PostContactDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast('Message sent successfully!')
        setSuccessMessage('Your message has been sent successfully. Thank you!');
        setErrorMessage('');
        setForm({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        toast.error('Submission failed!')
        setErrorMessage(`Submission failed: ${errorData.message || 'Please try again later.'}`);
      }
    } catch (error) {
      setErrorMessage(`An error occurred: ${error.message}`);
      toast('An error occured!')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-center items-center max-w-6xl w-full mx-auto bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 border border-orange-500 rounded-xl shadow-2xl p-8">
        {/* Left Side Text */}
        <div className="max-w-lg w-full md:w-1/2 px-4 md:px-10 mb-8 md:mb-0">
          <h1 className="text-4xl font-extrabold text-black mb-4 tracking-wide relative">
            Get in Touch with Us
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-16 h-1 "></span>
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            We’re here to assist you! Please fill out the form below to send us a message, or reach out through our social media. We'll get back to you as soon as possible.
          </p>

          {/* Social Media Links */}
          <div className="mt-6">
            <h2 className="text-gray-200 font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-600 transition-colors duration-200">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-400 transition-colors duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-pink-600 transition-colors duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-700 transition-colors duration-200">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/3 bg-black shadow-xl rounded-lg p-8 md:p-10 border border-orange-500">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-semibold text-gray-200" htmlFor="firstName">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-semibold text-gray-200" htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200" htmlFor="email">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-orange-600 text-white py-3 rounded-lg transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
