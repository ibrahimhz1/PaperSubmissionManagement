export default function CallForPapers(){
  return (
    <div>
      {/* Page header */}
      <section className="hero">
        <div className="container-pad">
          <h1 className="hero-title text-center">Call for Papers</h1>
          <p className="hero-description text-center">Submit your research to the International Conference on Academic Research and Innovation (ICARI)</p>
        </div>
      </section>

      {/* Conference info */}
      <section className="py-12">
        <div className="container-pad">
          <div className="grid md:grid-cols-[2fr_1fr] gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">ICARI</h2>
              <p className="text-gray-600 mb-6">The International Conference on Academic Research and Innovation (ICARI) brings together researchers, academics, and industry professionals to share cutting-edge research and foster collaboration across disciplines.</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start gap-3"><i className="fas fa-calendar-alt text-blue-600 mt-1"/><div><strong>Conference Dates</strong><p>October 15-17</p></div></div>
                <div className="flex items-start gap-3"><i className="fas fa-map-marker-alt text-blue-600 mt-1"/><div><strong>Location</strong><p>San Francisco, CA</p></div></div>
                <div className="flex items-start gap-3"><i className="fas fa-laptop text-blue-600 mt-1"/><div><strong>Format</strong><p>Hybrid</p></div></div>
                <div className="flex items-start gap-3"><i className="fas fa-graduation-cap text-blue-600 mt-1"/><div><strong>Proceedings</strong><p>Springer LNCS</p></div></div>
              </div>
              <span className="inline-flex items-center bg-amber-500 text-white px-4 py-2 rounded-full font-semibold"><i className="fas fa-clock mr-2"/>Submission Deadline: June 30</span>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                <a className="btn btn-primary" href="/author">Submit Paper</a>
                <a className="btn btn-outline" href="#">Download Template</a>
                <a className="btn btn-outline" href="#guidelines">View Guidelines</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="features">
        <div className="container-pad">
          <div className="text-center mb-12">
            <h2 className="section-title">Conference Tracks</h2>
            <p className="section-description">We welcome submissions across multiple research domains and interdisciplinary topics</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {t:'Computer Science & AI', items:['Machine Learning','NLP','Computer Vision','Data Science','Cybersecurity']},
              {t:'Engineering & Technology', items:['Renewable Energy','IoT','Robotics','Biomedical Eng','Infrastructure']},
              {t:'Social Sciences & Humanities', items:['Digital Humanities','EdTech','AI & Society','Cross-cultural','Policy']},
              {t:'Health & Life Sciences', items:['Bioinformatics','Medical Imaging','Public Health','Drug Discovery','Healthcare Analytics']},
            ].map((g,idx)=> (
              <div className="card border-l-4 border-blue-600" key={idx}>
                <h3 className="text-blue-600 font-semibold mb-2">{g.t}</h3>
                <ul className="text-gray-700 space-y-2">
                  {g.items.map((x,i)=>(<li key={i}>• {x}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section id="guidelines" className="py-16">
        <div className="container-pad">
          <div className="text-center mb-12">
            <h2 className="section-title">Submission Guidelines</h2>
            <p className="section-description">Ensure your submission meets all requirements for consideration</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><i className="fas fa-file-alt text-blue-600"/>Paper Format</h3>
                <p className="text-gray-600">Follow the Springer LNCS format. Max 12 pages including references.</p>
                <ul className="text-gray-700 mt-3 space-y-2 list-disc pl-5">
                  <li>Official LNCS template</li>
                  <li>12-page limit</li>
                  <li>PDF only</li>
                  <li>Anonymous submission</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><i className="fas fa-language text-blue-600"/>Language</h3>
                <p className="text-gray-600">All papers in English; proofreading recommended.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><i className="fas fa-clipboard-check text-blue-600"/>Originality</h3>
                <ul className="text-gray-700 mt-1 space-y-2 list-disc pl-5">
                  <li>Original, unpublished work</li>
                  <li>No simultaneous submissions</li>
                  <li>Proper citation of related work</li>
                  <li>Plagiarism check will be conducted</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><i className="fas fa-edit text-blue-600"/>Review Process</h3>
                <p className="text-gray-600">Double-blind peer review by at least three committee members.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
