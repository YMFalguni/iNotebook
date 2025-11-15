import React from "react";
import "./About.css";

const About = () => {
  const features = [
    {
      icon: "fas fa-lock",
      title: "Secure Storage",
      description: "Your notes are encrypted and stored safely in the cloud with industry-standard security."
    },
    {
      icon: "fas fa-sync-alt",
      title: "Real-time Sync",
      description: "Access your notes from any device. Changes sync instantly across all your devices."
    },
    {
      icon: "fas fa-tags",
      title: "Organize with Tags",
      description: "Categorize your notes with custom tags for better organization and retrieval."
    }
  ];


  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <i className="fas fa-book"></i> About iNotebook
            </h1>
            <p className="hero-subtitle">
              Your secure, cloud-based notebook for capturing, organizing, and sharing ideas
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="mission-content">
                <h2>Our Mission</h2>
                <p>
                  At iNotebook, we believe that great ideas deserve a safe home. Our mission is to provide
                  a simple, secure, and intuitive platform where you can capture, organize, and access your
                  thoughts anytime, anywhere.
                </p>
                <p>
                  Whether you're a student, professional, or creative thinker, iNotebook empowers you to
                  keep your ideas organized and never lose a brilliant thought again.
                </p>
                <div className="stats">
                  <div className="stat-item">
                    <h3>100%</h3>
                    <p>Secure</p>
                  </div>
                  <div className="stat-item">
                    <h3>24/7</h3>
                    <p>Available</p>
                  </div>
                  <div className="stat-item">
                    <h3>∞</h3>
                    <p>Storage</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mission-image">
                <div className="floating-card">
                  <i className="fas fa-lightbulb"></i>
                  <p>Ideas Take Flight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose iNotebook?</h2>
          <p className="section-subtitle">Powerful features designed for your productivity</p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="container">
          <div className="row align-items-center flex-lg-row-reverse">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="vision-content">
                <h2>Our Vision</h2>
                <p>
                  We envision a world where capturing and organizing ideas is effortless. A place where
                  knowledge flows seamlessly across devices and teams collaborate without barriers.
                </p>
                <ul className="vision-list">
                  <li><i className="fas fa-check-circle"></i> Simplify note-taking</li>
                  <li><i className="fas fa-check-circle"></i> Enhance productivity</li>
                  <li><i className="fas fa-check-circle"></i> Protect privacy</li>
                  <li><i className="fas fa-check-circle"></i> Foster collaboration</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="vision-image">
                <div className="floating-card vision-card">
                  <i className="fas fa-rocket"></i>
                  <p>Reaching New Heights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who trust iNotebook with their ideas</p>
            <a href="/" className="btn btn-light btn-lg">
              <i className="fas fa-arrow-right me-2"></i> Start Taking Notes
            </a>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="info-section">
        <div className="container">
          <div className="row">
            {/* <div className="col-md-4 mb-4">
              <div className="info-card">
                <h4><i className="fas fa-globe"></i> Global Reach</h4>
                <p>Available worldwide with servers in multiple regions for optimal performance.</p>
              </div>
            </div> */}
            <div className="col-md-6 mb-6">
              <div className="info-card">
                <h4><i className="fas fa-shield-alt"></i> Enterprise Security</h4>
                <p>Bank-level encryption and compliance with international security standards.</p>
              </div>
            </div>
            <div className="col-md-6 mb-6">
              <div className="info-card">
                <h4><i className="fas fa-headset"></i> 24/7 Support</h4>
                <p>Our dedicated support team is always ready to help you succeed. </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="footer-section-about">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-box">
              <h4><i className="fas fa-book"></i> About iNotebook</h4>
              <p>
                iNotebook is your secure, cloud-based notebook for capturing,
                organizing, and sharing ideas. Keep your thoughts safe and
                accessible anywhere.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-box">
              <h4><i className="fas fa-link"></i> Quick Links</h4>
              <ul className="footer-links-list">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/">Notes</a></li>
                <li><a href="/login">Login</a></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="footer-box">
              <h4><i className="fas fa-envelope"></i> Contact Us</h4>
              <div className="contact-box">
                <div className="contact-row">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:support@inotebook.com">support@inotebook.com</a>
                </div>
                <div className="contact-row">
                  <i className="fas fa-phone"></i>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="contact-row">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Innovation Street, Tech City, India</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="footer-box">
              <h4><i className="fas fa-share-alt"></i> Follow Us</h4>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom-about">
            <div className="footer-copyright">
              <p>&copy; 2025 iNotebook. All rights reserved.</p>
            </div>
            <div className="footer-policies">
              <a href="#privacy">Privacy Policy</a>
              <span>|</span>
              <a href="#terms">Terms of Service</a>
              <span>|</span>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
