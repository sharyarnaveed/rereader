import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen py-16">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[var(--btn-color)]/10 to-transparent rounded-full -z-10 blur-[120px]"></div>
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[var(--maintextcolor)]/5 rounded-full -z-10 blur-[100px]"></div>

        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-600 font-[var(--normalfont)] max-w-2xl mx-auto">
              Have questions about ReReader? We're here to help. Send us a
              message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--btn-color)]/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[var(--btn-color)]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--maintextcolor)] font-[var(--normalfont)]">
                        Email
                      </h3>
                      <a
                        href="mailto:support@rereader.com"
                        className="text-gray-600 hover:text-[var(--btn-color)] transition-colors font-[var(--normalfont)]"
                      >
                        support@rereader.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--btn-color)]/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[var(--btn-color)]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--maintextcolor)] font-[var(--normalfont)]">
                        Location
                      </h3>
                      <p className="text-gray-600 font-[var(--normalfont)]">
                        123 Reader Street
                        <br />
                        Book City, BC 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--btn-color)]/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[var(--btn-color)]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--maintextcolor)] font-[var(--normalfont)]">
                        Phone
                      </h3>
                      <a
                        href="tel:+1234567890"
                        className="text-gray-600 hover:text-[var(--btn-color)] transition-colors font-[var(--normalfont)]"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22454.582227278835!2d72.9153536!3d33.9083264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfb1ec2cec8405%3A0xecea542d8a6b1d0a!2sPak-Austria%20Fachhochschule%20Institute%20of%20Applied%20Sciences%20and%20Technology!5e1!3m2!1sen!2s!4v1744176509630!5m2!1sen!2s"
                  width="600"
                  height="450"
                ></iframe>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-[var(--normalfont)]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--btn-color)] focus:border-transparent outline-none transition-all font-[var(--normalfont)]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-[var(--normalfont)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--btn-color)] focus:border-transparent outline-none transition-all font-[var(--normalfont)]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-[var(--normalfont)]">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--btn-color)] focus:border-transparent outline-none transition-all font-[var(--normalfont)]"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-[var(--normalfont)]">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--btn-color)] focus:border-transparent outline-none transition-all font-[var(--normalfont)]"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[var(--btn-color)] text-white rounded-lg font-medium font-[var(--normalfont)] shadow-md hover:bg-[var(--maintextcolor)] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
