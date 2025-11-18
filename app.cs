/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Absans', sans-serif; /* Global font family */
  color: #F0EAD2; /* Global font color */
}

html, body {
  height: 100%; /* Ensure the entire document is styled */
  background-color: #023020; /* Set the background color for the entire document */
  color: #F0EAD2; /* Set the font color for the entire document */
}

/* CV Container Styles */
.cv-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 60px;
  background-color: #023020; /* Keep the same background for the container */
  color: #F0EAD2; /* Font color for text */
  line-height: 1.6;
}

/* Header Styles */
.cv-header {
  text-align: center;
  margin-bottom: 40px;
}

.name {
  font-family: 'Stack Sans Headline', sans-serif; /* Apply Google Font */
  font-size: 3.2rem; /* Larger font size for the name */
  font-weight: 700; /* Bold the name */
  letter-spacing: 3px;
  margin-bottom: 15px;
  color: #F0EAD2; /* Font color for name */
}

.contact-info {
  font-size: 0.95rem;
  color: #F0EAD2; /* Font color for contact info */
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.contact-item {
  display: inline-block;
}

.contact-item strong {
  font-weight: 600;
  color: #F0EAD2; /* Font color for contact item labels */
}

.contact-item a {
  color: #0066cc; /* Default link color */
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: #004499;
  text-decoration: underline;
}

/* Bright Orange Email Link */
.contact-item a[href^="mailto:"] {
  color: #FFA500; /* Bright orange color for email links */
}

.contact-item a[href^="mailto:"]:hover {
  color: #FF7F00; /* Darker orange for hover effect */
  text-decoration: underline;
}

.separator {
  color: #999;
  margin: 0 5px;
}

.divider {
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, transparent, #F0EAD2, transparent); /* Gradient to match theme */
  margin-top: 20px;
}

/* Content Styles */
.cv-content {
  margin-top: 30px;
}

.profile-section,
.skills-section,
.technical-skills {
  margin-bottom: 35px;
}

.section-title {
  font-family: 'Stack Sans Headline', sans-serif; /* Apply Google Font */
  font-size: 1.8rem; /* Larger font size for section titles */
  font-weight: 700; /* Bold section titles */
  letter-spacing: 2px;
  color: #F0EAD2; /* Font color for section titles */
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #F0EAD2; /* Border color matching the font */
  text-transform: uppercase;
}

/* Profile Section */
.profile-text {
  font-size: 1rem;
  color: #F0EAD2; /* Font color for profile text */
  text-align: justify;
  line-height: 1.8;
}

/* Skills Section */
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

.skills-column {
  display: flex;
  flex-direction: column;
}

.skills-list {
  list-style: none;
  padding-left: 0;
}

.skills-list li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: #F0EAD2; /* Font color for skills list */
  line-height: 1.6;
}

.skills-list li::before {
  content: "•";
  position: absolute;
  left: 5px;
  color: #F0EAD2; /* Bullet color */
  font-weight: bold;
  font-size: 1.2rem;
}

/* Technical Skills Section */
.tech-categories {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.tech-category {
  background-color: #024C3F; /* Slightly lighter shade for categories */
  padding: 15px 20px;
  border-radius: 5px;
  border-left: 4px solid #F0EAD2; /* Border color matching font */
}

.category-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #F0EAD2; /* Font color for category titles */
  margin-bottom: 8px;
}

.tech-items {
  font-size: 0.95rem;
  color: #F0EAD2; /* Font color for tech items */
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cv-container {
    padding: 30px 25px;
  }

  .name {
    font-size: 2.2rem;
    letter-spacing: 2px;
  }

  .contact-info {
    flex-direction: column;
    gap: 8px;
  }

  .separator {
    display: none;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .section-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .cv-container {
    padding: 20px 15px;
  }

  .name {
    font-size: 1.8rem;
    letter-spacing: 1px;
  }

  .contact-info {
    font-size: 0.85rem;
  }

  .section-title {
    font-size: 1.1rem;
    letter-spacing: 1px;
  }

  .profile-text,
  .skills-list li,
  .tech-items {
    font-size: 0.9rem;
  }
}

/* Print Styles */
@media print {
  .cv-container {
    padding: 20px;
    max-width: 100%;
  }

  .name {
    font-size: 2.5rem;
  }

  .section-title {
    page-break-after: avoid;
  }

  .profile-section,
  .skills-section,
  .technical-skills {
    page-break-inside: avoid;
  }
}
