export default function Speakers(){
  const speakers = [
    { name: 'Dr. John Smith', title: 'Professor of Computer Science', bio: 'Expert in artificial intelligence and machine learning with over 20 years of research experience.' },
    { name: 'Dr. Emily Johnson', title: 'Professor of Biomedical Engineering', bio: 'Renowned for her work in medical imaging and bioinformatics, published in top-tier journals.' },
    { name: 'Dr. Michael Chen', title: 'Professor of Environmental Science', bio: 'Leading researcher in climate change and sustainable systems with multiple award-winning publications.' },
    { name: 'Dr. Sarah Patel', title: 'Professor of Economics', bio: 'Specialist in behavioral economics and data analysis, known for innovative research methodologies.' },
  ];
  return (
    <section className="bg-gray-50 py-16">
      <div className="container-pad">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Esteemed Speakers</h2>
          <p className="section-description max-w-3xl mx-auto">Meet the distinguished researchers and academics sharing their insights and expertise.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {speakers.map((s, idx)=> (
            <div className="card text-center" key={idx}>
              <div className="w-[150px] h-[150px] rounded-full bg-gray-100 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-1">{s.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{s.title}</p>
              <p className="text-gray-600">{s.bio}</p>
              <div className="flex justify-center gap-3 mt-3 text-gray-600">
                <a href="#" aria-label="twitter" className="hover:text-blue-600"><i className="fab fa-twitter"/></a>
                <a href="#" aria-label="linkedin" className="hover:text-blue-600"><i className="fab fa-linkedin-in"/></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
