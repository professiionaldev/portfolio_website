import React, { useState } from 'react';
import { Github, Linkedin, Mail, Download, ExternalLink, FileText, Link2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Certificate {
  title: string;
  issuer: string;
  pdfUrl: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  fileUrl?: string;
  imageUrl?: string;
}

function App() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const certificates: Certificate[] = [
    {
      title: "Data Science Certification",
      issuer: "Codebasics",
      pdfUrl: "/path/to/your/certificate.pdf"
    },
    {
      title: "Advanced SQL",
      issuer: "Maven Analytics",
      pdfUrl: "/path/to/your/certificate.pdf"
    }
  ];

  const projects: Project[] = [
    {
      title: "Customer Behavior Analysis",
      description: "Analyzed customer behavior patterns using Python and SQL to increase customer retention by 25%.",
      technologies: ["Python", "SQL", "Pandas"],
      demoUrl: "https://example.com",
      fileUrl: "/path/to/project-report.pdf",
      imageUrl: "data:image/jpeg;base64,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"
    },
    {
      title: "Sales Prediction Model",
      description: "Developed a machine learning model to predict future sales with 92% accuracy.",
      technologies: ["Python", "TensorFlow", "Scikit-learn"],
      demoUrl: "https://example.com",
      fileUrl: "/path/to/project-report.pdf",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Created an interactive dashboard for real-time sales monitoring.",
      technologies: ["Power BI", "SQL", "Excel"],
      demoUrl: "https://example.com",
      fileUrl: "/path/to/project-report.pdf",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
    },
    {
      title: "testing project",
      description: "Created an interactive dashboard for real-time sales monitoring.",
      technologies: ["Power BI", "SQL", "Excel"],
      demoUrl: "https://example.com",
      fileUrl: "/path/to/project-report.pdf",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-black shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">KS</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-32 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Transforming Data into</span>
              <span className="block text-zinc-400">Actionable Insights</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-zinc-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Leveraging data science to drive informed decisions
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="#projects" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-zinc-800 hover:bg-zinc-700 transition-colors md:py-4 md:text-lg md:px-10">
                  View My Work
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="#contact" className="w-full flex items-center justify-center px-8 py-3 border border-zinc-600 text-base font-medium rounded-md text-white bg-transparent hover:bg-zinc-800 transition-colors md:py-4 md:text-lg md:px-10">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-white">About Me</h2>
            <p className="mt-4 max-w-2xl text-xl text-zinc-400 lg:mx-auto">
              A dedicated and detail-oriented data science enthusiast with a passion for uncovering insights through data.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Skills */}
              <div className="bg-black p-6 rounded-lg border border-zinc-800">
                <h3 className="text-lg font-medium text-white">Technical Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['likhna', 'padhna', 'Power BI', 'Excel', 'Data Visualization', 'Machine Learning'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-zinc-800 text-zinc-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-black p-6 rounded-lg border border-zinc-800">
                <h3 className="text-lg font-medium text-white">Certifications</h3>
                <ul className="mt-4 space-y-4">
                  {certificates.map((cert, index) => (
                    <li key={index} className="flex items-center justify-between text-zinc-400 p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <div>
                          <p className="text-white">{cert.title}</p>
                          <p className="text-sm">{cert.issuer}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCertificate(cert)}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center">Featured Projects</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div key={index} className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                {project.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-white">{project.title}</h3>
                  <p className="mt-2 text-zinc-400">{project.description}</p>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-800 text-zinc-200 rounded text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="inline-flex items-center text-zinc-400 hover:text-white transition-colors">
                        <Link2 className="h-4 w-4 mr-1" /> Demo
                      </a>
                    )}
                    {project.fileUrl && (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
                      >
                        <FileText className="h-4 w-4 mr-1" /> View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Get in Touch</h2>
            <p className="mt-4 text-lg text-zinc-400">
              I'm always open to new opportunities and collaborations
            </p>
          </div>

          <div className="mt-12 max-w-lg mx-auto">
            <form className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300">Name</label>
                <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md bg-black border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-zinc-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email</label>
                <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md bg-black border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-zinc-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300">Message</label>
                <textarea name="message" id="message" rows={4} className="mt-1 block w-full rounded-md bg-black border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-zinc-800 text-white py-2 px-4 rounded-md hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500">
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-12 flex justify-center space-x-6">
            <a href="https://github.com" className="text-zinc-400 hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" className="text-zinc-400 hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:contact@example.com" className="text-zinc-400 hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-zinc-500">&copy; 2025 Kuldeep Singh. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">{selectedCertificate.title}</h3>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-8rem)]">
              <Document file={selectedCertificate.pdfUrl}>
                <Page pageNumber={1} />
              </Document>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-8rem)]">
              {selectedProject.fileUrl && (
                <Document file={selectedProject.fileUrl}>
                  <Page pageNumber={1} />
                </Document>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;