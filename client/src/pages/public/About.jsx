export default function About(){
  return (
    <div>
      <section className="features">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title">About the Platform</h1>
            <p className="section-description">Our system streamlines the entire publication lifecycle — from submission to review and decision — with a modern, role-based experience.</p>
          </div>
          <div className="features-grid grid">
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-paper-plane" /></div>
              <h3 className="feature-title">Seamless Submissions</h3>
              <p className="feature-description">Authors can submit, track versions, and resubmit revisions with clarity.</p>
            </div>
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-user-check" /></div>
              <h3 className="feature-title">Efficient Reviews</h3>
              <p className="feature-description">Reviewers get concise queues, quick download links, and structured feedback.</p>
            </div>
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-shield-alt" /></div>
              <h3 className="feature-title">Admin Controls</h3>
              <p className="feature-description">Assign reviewers, view history, and keep submissions moving.</p>
            </div>
            <div className="card feature-card">
              <div className="flex justify-center"><i className="feature-icon fas fa-bell" /></div>
              <h3 className="feature-title">Smart Notifications</h3>
              <p className="feature-description">Email updates keep stakeholders informed at each step.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
