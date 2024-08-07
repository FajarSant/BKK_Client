import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface Testimonial {
  photo: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  role: string; // Added role field
}

const testimonials: Testimonial[] = [
  {
    photo: "https://th.bing.com/th/id/OIP.23JlXzTrsjO3W7DlWEKwlQHaIc?w=868&h=990&rs=1&pid=ImgDetMain",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    whatsapp: "1234567890",
    role: "Developer", // Example role
  },
  {
    photo: "https://th.bing.com/th/id/OIP.23JlXzTrsjO3W7DlWEKwlQHaIc?w=868&h=990&rs=1&pid=ImgDetMain",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    whatsapp: "0987654321",
    role: "Designer", // Example role
  }
];

const Pelayanan: React.FC = () => {
  const handleWhatsAppClick = (number: string) => {
    window.open(`https://wa.me/${number}`, '_blank');
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center ">
          <span className="text-4xl text-gray-800 font-bold block mb-2">PELAYANAN BKK</span>
          <h2 className="text-xl md:text-2xl  text-gray-600 mb-10"> SMKN Ngargoyoso</h2>
          <p className="mt-4 text-lg text-gray-600 text-justify  md:text-center">
            Kami menyediakan berbagai layanan untuk membantu siswa dan alumni SMKN Ngargoyoso dalam mencari pekerjaan dan peluang magang. 
            Temukan informasi terbaru mengenai lowongan kerja, magang, dan dukungan karir di sini. Hubungi kami untuk bantuan lebih lanjut.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center p-6">
                <img className="rounded-full h-16 w-16 md:h-20 md:w-20 mr-4" src={testimonial.photo} alt={`${testimonial.name}'s photo`} />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h5 className="text-gray-900 font-semibold text-lg flex items-center">
                      {testimonial.name}
                      <span className="ml-2 inline-block bg-gray-200 text-gray-800 text-xs font-medium py-1 px-2 rounded-full">
                        {testimonial.role}
                      </span>
                    </h5>
                  </div>
                  <p className="text-gray-700 mb-1">{testimonial.email}</p>
                  <p className="text-gray-700 mb-1">{testimonial.phone}</p>
                  <p className="text-gray-700 mb-4">{testimonial.whatsapp}</p>
                  <button
                    onClick={() => handleWhatsAppClick(testimonial.whatsapp)}
                    className="flex items-center text-white bg-green-500 hover:bg-green-600 font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                  >
                    <FaWhatsapp className="text-xl mr-2" />
                    <span>Hubungi</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pelayanan;
