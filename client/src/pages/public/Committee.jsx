export default function Committee(){
  const members = [
    { name: 'Dr. Alice Thompson', role: 'Chairperson', bio: 'Experienced academic leader overseeing the strategic direction of the platform.' },
    { name: 'Prof. Robert Davis', role: 'Program Coordinator', bio: 'Manages the review process and coordinates with reviewers and authors.' },
    { name: 'Dr. Linda Martinez', role: 'Technical Lead', bio: 'Oversees the technical infrastructure and ensures platform reliability and security.' },
    { name: 'Prof. James Lee', role: 'Outreach Coordinator', bio: 'Promotes the platform to academic institutions and manages community engagement.' },
  ];
  return (
    <section className="bg-gray-50 py-16">
      <div className="container-pad">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Organizing Committee</h2>
          <p className="section-description max-w-3xl mx-auto">Meet the dedicated team behind the conference, ensuring seamless operations and academic excellence.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((m, idx)=> (
            <div className="card text-center" key={idx}>
              <div className="w-[150px] h-[150px] rounded-full bg-gray-100 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-1">{m.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{m.role}</p>
              <p className="text-gray-600">{m.bio}</p>
              <div className="flex justify-center gap-3 mt-3 text-gray-600">
                <a href="#" aria-label="email" className="hover:text-blue-600"><i className="fas fa-envelope"/></a>
                <a href="#" aria-label="linkedin" className="hover:text-blue-600"><i className="fab fa-linkedin-in"/></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
