import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-white font-serif">
      <div className="text-center">
        <div className="bg-cover h-96 bg-center" style={{ backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)" }}>
          <h1 className="text-8xl text-gray-800">404</h1>
        </div>
        <div className="mt-[-50px]">
          <h3 className="text-4xl">Look like you're lost</h3>
          <p className="mt-4 text-gray-600">The page you are looking for is not available!</p>
          <a href="" className="mt-6 inline-block px-6 py-3 text-white bg-green-600 rounded hover:bg-green-700 transition duration-300">
            <Link to={"/"}>Go to Home</Link>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
