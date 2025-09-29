export default function Footer() {
  return (
    <footer className="footer bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center px-4">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">SCMS 2025</h2>
        <p className="text-sm mb-4">Singapore Conference Management Systems</p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          <a href="#" className="hover:text-blue-500" aria-label="Facebook">
            <i className="fab fa-facebook-f text-xl" />
          </a>
          <a href="#" className="hover:text-pink-500" aria-label="Instagram">
            <i className="fab fa-instagram text-xl" />
          </a>
          <a href="#" className="hover:text-sky-400" aria-label="Twitter">
            <i className="fab fa-twitter text-xl" />
          </a>
          <a href="#" className="hover:text-red-600" aria-label="YouTube">
            <i className="fab fa-youtube text-xl" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © Copyright 2025. All Rights Reserved
        </p>
      </div>
    </footer>
  )
}
