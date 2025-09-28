export default function Home(){
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="text-center">
            <div className="flex justify-center">
              <i className="hero-icon fas fa-book-open" />
            </div>
            <h1 className="hero-title">Research Paper <span>Management System</span></h1>
            <p className="hero-description">Streamline your academic workflow with our comprehensive platform for paper submission, peer review, and publication management.</p>
            <div className="hero-buttons">
              <a href="/register" className="btn btn-primary btn-lg">Get Started <i className="fas fa-arrow-right ml-2" /></a>
              <a href="/about" className="btn btn-outline btn-lg">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Papers Submitted</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Active Reviewers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Universities</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Powerful Features for Academic Excellence</h2>
            <p className="section-description">Our platform provides everything you need to manage the complete research publication lifecycle.</p>
          </div>
          <div className="features-grid grid">
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-file-alt" /></div>
              <h3 className="feature-title">Paper Submission</h3>
              <p className="feature-description">Submit research papers with ease and track their progress through the review process.</p>
            </div>
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-users" /></div>
              <h3 className="feature-title">Role-Based Access</h3>
              <p className="feature-description">Portals for authors, reviewers, and administrators with tailored workflows.</p>
            </div>
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-check-circle" /></div>
              <h3 className="feature-title">Review Management</h3>
              <p className="feature-description">Streamlined reviews with notifications and status tracking.</p>
            </div>
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-star" /></div>
              <h3 className="feature-title">Quality Assurance</h3>
              <p className="feature-description">Comprehensive review system ensuring high-quality publications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container text-center">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="section-description">Join researchers, reviewers, and institutions who trust our platform.</p>
          <div className="cta-buttons">
            <a href="/register" className="btn btn-primary btn-lg">Create Account</a>
            <a href="/contact" className="btn btn-outline btn-lg">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
