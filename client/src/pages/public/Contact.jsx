export default function Contact(){
  return (
    <div>
      <section className="features">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title">Contact Us</h1>
            <p className="section-description">We'd love to hear from you. Reach out for support, feedback, or partnership inquiries.</p>
          </div>
          <div className="features-grid grid">
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-envelope" /></div>
              <h3 className="feature-title">Email</h3>
              <p className="feature-description">support@example.com</p>
            </div>
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-phone" /></div>
              <h3 className="feature-title">Phone</h3>
              <p className="feature-description">+1 (555) 123-4567</p>
            </div>
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-map-marker-alt" /></div>
              <h3 className="feature-title">Address</h3>
              <p className="feature-description">123 University Ave, Academic City, AC 12345</p>
            </div>
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-clock" /></div>
              <h3 className="feature-title">Hours</h3>
              <p className="feature-description">Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
