import React from 'react';

const GoogleFormEmbed = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfn_5SzAXX-TWV8DypiuUuFxM7nOryB-ARtMRPwJ_R4g2XiXA/viewform?usp=sf_link"; 

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full lg:w-3/4 bg-base-100 shadow-xl p-6">
        <iframe
          src={googleFormUrl}
          width="100%"
          height="500"
          frameBorder="0"
          marginHeight={0} // Mengubah ke angka
          marginWidth={0}  // Mengubah ke angka
          className="rounded-lg"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default GoogleFormEmbed;
