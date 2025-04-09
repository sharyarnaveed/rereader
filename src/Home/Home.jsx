import React from "react";
import Navbar from "../components/Navbar";
import bgimage from "../assets/img/bgimage.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const categories = [
    { name: "Primary Class", description: "Classes 1 to 5/6", id: 1 },
    { name: "Secondary Class", description: "Classes 6 to 10", id: 2 },
    { name: "Higher Secondary Class", description: "Classes 11 to 12", id: 3 },
    {
      name: "Higher Education",
      description: "Graduation and Post Graduation",
      id: 4,
    },
    {
      name: "Competitive Exams",
      description: "UPSC, SSC, Banking, etc.",
      id: 5,
    },
    {
      name: "Professional Courses",
      description: "Engineering, Medical, etc.",
      id: 6,
    },
  ];

  const navigate=useNavigate()
  return (
    <>
      <Navbar />

      <main className="h-[90vh] flex items-center justify-center bg-white relative overflow-hidden">
    
        <div
          className="absolute inset-0 z-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/90 before:to-transparent"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

    
        <div className="max-w-4xl mx-auto px-4 py-16 text-center relative z-10">
          <div className="animate-fadeIn">
            <h1 className="text-7xl mb-8 font-headingfonts text-[#07484A] leading-tight relative">
              Books That Deserve
              <span className="block">a Second Chapter.</span>
              <div className="absolute -right-8 top-0 w-12 h-12 border-t-2 border-r-2 border-[#70908B] opacity-50" />
              <div className="absolute -left-8 bottom-0 w-12 h-12 border-b-2 border-l-2 border-[#70908B] opacity-50" />
            </h1>
            <p className="text-xl mb-12 font-normalfont text-[#07484A] max-w-2xl mx-auto leading-relaxed">
              Rereader connects book lovers to a world of second chances, where
              old books find new homes. Buy, sell — and make reading accessible
              for everyone.
            </p>
            <button
              className="bg-[#70908B] hover:bg-[#07484A] transition-all duration-300 cursor-pointer
              text-white font-normalfont py-4 px-10 rounded-full text-lg
              hover:shadow-[0_4px_20px_rgba(112,144,139,0.3)] transform hover:-translate-y-1"
              onClick={()=>navigate("/product")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </main>

   
      <main className="py-24 bg-gradient-to-b from-white to-[#70908B]/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-headingfonts text-[#07484A] text-center mb-20 relative inline-block">
            Browse Categories
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#70908B]/30" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group p-10 rounded-xl border-2 border-[#70908B]/20 hover:border-[#70908B] 
                transition-all duration-300 cursor-pointer bg-white hover:shadow-lg"
              >
                <h3 className="text-2xl font-headingfonts text-[#07484A] mb-2">
                  {category.name}
                </h3>
                <p className="text-[#70908B] font-normalfont">
                  {category.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#07484A] font-normalfont text-sm">
                    Explore →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer/>
    </>
  );
};

export default Home;
