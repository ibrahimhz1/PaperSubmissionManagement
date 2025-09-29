import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
    const countdownDate = new Date("2025-12-12T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });

      if (distance < 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center px-4" data-aos="fade-up">
          <div className="flex justify-center mb-6">
            <i className="fas fa-book-open text-6xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Singapore Conference <span className="text-yellow-300">Management Systems</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Streamline your academic workflow with our comprehensive platform for paper submission, peer review, and publication management.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/register" className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg" data-aos="zoom-in">
              Get Started <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <a href="/about" className="btn border border-white hover:bg-white hover:text-indigo-600 font-bold py-3 px-6 rounded-lg" data-aos="zoom-in" data-aos-delay="200">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
<section className="bg-gray-50 py-12" data-aos="fade-up">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6">⏳ Registration Closes In</h2>

    <div className="flex justify-center gap-6 text-xl font-mono">
      {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-2xl p-6 w-24 flex flex-col items-center animate-bounce"
          data-aos="flip-left"
          data-aos-delay={idx * 150}
        >
          <div className="text-3xl font-extrabold text-indigo-600 transition-transform duration-300">
            {timeLeft[unit] || "0"}
          </div>
          <div className="text-sm uppercase text-gray-500">{unit}</div>
        </div>
      ))}
    </div>

    <p className="mt-6 text-gray-600">Hurry up! Register before the deadline to participate in the conference.</p>
  </div>
</section>



      {/* Features Section */}
      <section className="features bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold">Powerful Features for Academic Excellence</h2>
            <p className="max-w-2xl mx-auto text-gray-600">Our platform provides everything you need to manage the complete research publication lifecycle.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "fa-file-alt", title: "Paper Submission", desc: "Submit research papers with ease and track their progress." },
              { icon: "fa-users", title: "Role-Based Access", desc: "Portals for authors, reviewers, and administrators." },
              { icon: "fa-check-circle", title: "Review Management", desc: "Streamlined reviews with notifications and status tracking." },
              { icon: "fa-star", title: "Quality Assurance", desc: "Comprehensive review system ensuring high-quality publications." },
            ].map((feature, idx) => (
              <div key={idx} className="card feature-card bg-indigo-50 p-6 rounded-lg shadow-lg text-center" data-aos="zoom-in" data-aos-delay={idx * 150}>
                <div className="flex justify-center mb-4">
                  <i className={`feature-icon fas ${feature.icon} text-4xl text-indigo-500`}></i>
                </div>
                <h3 className="feature-title font-bold text-xl mb-2">{feature.title}</h3>
                <p className="feature-description text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="important-dates bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Important Dates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { date: "25 March 2025", event: "Manuscript Submission Deadline", desc: "Last date to submit your research papers and manuscripts." },
              { date: "5 April 2025", event: "Acceptance Notification", desc: "Authors will be notified about the acceptance of their papers." },
              { date: "12 April 2025", event: "Registration Deadline", desc: "Last date for conference registration." },
              { date: "26-27 April 2025", event: "Conference Dates", desc: "Main conference days." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay={idx * 150}>
                <h3 className="text-xl font-bold">{item.date}</h3>
                <p className="font-semibold">{item.event}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta bg-gray-100 py-12" data-aos="fade-up">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">Join researchers, reviewers, and institutions who trust our platform.</p>
          <div className="flex justify-center gap-4">
            <a href="/register" className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg">Create Account</a>
            <a href="/contact" className="btn border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold py-3 px-6 rounded-lg">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
