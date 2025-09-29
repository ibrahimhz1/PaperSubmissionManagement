export default function About() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 animate-fadeIn">About the Platform</h1>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto animate-fadeIn delay-200">
              Our system streamlines the entire publication lifecycle — from submission to review and decision — with a modern, role-based experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-xl transform hover:-translate-y-2 hover:scale-105 transition duration-500">
              <div className="flex justify-center mb-4">
                <i className="fas fa-paper-plane text-5xl text-indigo-500 animate-bounce"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Seamless Submissions</h3>
              <p className="text-gray-600">Authors can submit, track versions, and resubmit revisions with clarity.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-xl transform hover:-translate-y-2 hover:scale-105 transition duration-500">
              <div className="flex justify-center mb-4">
                <i className="fas fa-user-check text-5xl text-green-500 animate-bounce"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Efficient Reviews</h3>
              <p className="text-gray-600">Reviewers get concise queues, quick download links, and structured feedback.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-xl transform hover:-translate-y-2 hover:scale-105 transition duration-500">
              <div className="flex justify-center mb-4">
                <i className="fas fa-shield-alt text-5xl text-red-500 animate-bounce"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Admin Controls</h3>
              <p className="text-gray-600">Assign reviewers, view history, and keep submissions moving.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-xl transform hover:-translate-y-2 hover:scale-105 transition duration-500">
              <div className="flex justify-center mb-4">
                <i className="fas fa-bell text-5xl text-yellow-500 animate-bounce"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Notifications</h3>
              <p className="text-gray-600">Email updates keep stakeholders informed at each step.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
