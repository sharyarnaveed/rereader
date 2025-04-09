import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PriacyPolicy = () => {

const [date,SetDate]=useState('')

 

    useEffect(()=>
    {
        const Thedate= new Date().toUTCString();
        SetDate(Thedate)
    })

    return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-8">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-sm font-[var(--normalfont)] mb-12">
            Effective Date: <span className="font-medium">      {date}
            </span>
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 font-[var(--normalfont)] mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-gray-600 font-[var(--normalfont)] space-y-2">
                <li>
                  <strong>Personal Information:</strong> When you sign up, we
                  may collect your name, email address, phone number, and
                  location.
                </li>
                <li>
                  <strong>Book Listings & Activity:</strong> We store the books
                  you upload, purchase, or save for later.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may collect information about
                  how you interact with the platform (e.g., pages visited, time
                  spent).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 font-[var(--normalfont)]">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-gray-600 font-[var(--normalfont)] space-y-2">
                <li>Provide and improve our services</li>
                <li>Help buyers and sellers connect</li>
                <li>
                  Send you notifications (e.g., offers, messages, updates)
                </li>
                <li>Prevent fraud and ensure a safe user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                3. Sharing of Information
              </h2>
              <p className="text-gray-600 font-[var(--normalfont)] mb-4">
                We do not sell your personal information to third parties. We
                may share data:
              </p>
              <ul className="list-disc list-inside text-gray-600 font-[var(--normalfont)] space-y-2">
                <li>
                  With trusted service providers (e.g., for hosting, email)
                </li>
                <li>
                  If required by law or to protect our platform from misuse
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                4. Cookies and Tracking
              </h2>
              <p className="text-gray-600 font-[var(--normalfont)] mb-4">
                We may use cookies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 font-[var(--normalfont)] space-y-2">
                <li>Keep you logged in</li>
                <li>Improve site performance</li>
                <li>Understand how users interact with Rereader</li>
              </ul>
              <p className="text-gray-600 font-[var(--normalfont)]">
                You can manage your cookie preferences through your browser
                settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                5. Your Rights
              </h2>
              <p className="text-gray-600 font-[var(--normalfont)]">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 font-[var(--normalfont)] space-y-2">
                <li>Access or update your personal data</li>
                <li>Delete your account and all related data</li>
                <li>Contact us with any questions or concerns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                6. Data Security
              </h2>
              <p className="text-gray-600 font-[var(--normalfont)]">
                We take reasonable steps to protect your information using
                secure technologies and practices. However, no system is 100%
                secure, so we encourage strong passwords and caution when
                sharing personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-600 font-[var(--normalfont)]">
                We may update this Privacy Policy from time to time. When we do,
                we’ll notify you through the app or website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--maintextcolor)] font-[var(--headingfonts)] mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600 font-[var(--normalfont)]">
                If you have any questions about this Privacy Policy, feel free
                to reach out:
              </p>
              <ul className="list-none text-gray-600 font-[var(--normalfont)] space-y-2">
                <li>
                  📧 Email:{" "}
                  <a
                    href="mailto:your-email@example.com"
                    className="text-[var(--btn-color)] hover:text-[var(--maintextcolor)] transition-colors"
                  >
                    your-email@example.com
                  </a>
                </li>
                <li>
                  🌐 Website:{" "}
                  <a
                    href="https://www.rereader.com"
                    className="text-[var(--btn-color)] hover:text-[var(--maintextcolor)] transition-colors"
                  >
                    www.rereader.com
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PriacyPolicy;
