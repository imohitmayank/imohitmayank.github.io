---
layout: page
title: Me
permalink: /about/
weight: 5
---

# **About Me**
<br>

<div class="about-intro">
  <p class="lead text-center">
    This is Mohit. I have 9+ years of experience in AI/ML, actively contributing across <strong class="domain-highlight">professional</strong>, <strong class="domain-highlight">academic</strong>, and <strong class="domain-highlight">personal</strong> domains.
  </p>
</div>

---

<!-- ## **Professional Perspective** 👔 -->

<div class="professional-section">
  <div class="section-header">
    <h3>Professional Experience</h3>
  </div>
  <div class="section-content">
    <ul class="styled-list">
      <li><strong>Leadership Roles:</strong> I have held both hands-on and leadership roles, most recently as Senior Manager of AI at Loopio, Head of AI at O.XYZ, and Lead Data Scientist at Outplay, where I drove AI strategy and technical vision across organizations.</li>
      <li><strong>Domain Expertise:</strong> My work spans domains such as Enterprise RAG, Agentic AI, Knowledge Graphs, Multi-modal Generative AI, Voice Intelligence, Recommendation Systems, Root Cause Analytics, etc, covering the entire lifecycle from ideation and research to production deployment.</li>
      <li><strong>Flagship Products:</strong> I have developed flagship products including:
        <ul class="nested-list">
          <li><strong>Enterprise RAG at Scale</strong> - Production RAG serving millions of requests monthly</li>
          <li><strong>Agentic Memory using Knowledge Graphs</strong> - Enterprise knowledge layer for persistent AI memory</li>
          <li><strong>OriginStudio</strong> - A Vibe Coding platform akin to v0 and Lovable</li>
          <li><strong>OCEAN</strong> - One of the world's fastest AI search engines (powered by Cerebras)</li>
          <li><strong>SureConnect.ai</strong> - AI-powered voice-calling sales agent</li>
          <li><strong>Conversation Intelligence</strong> - A meeting bot for scheduling, data capture, advanced analytics, and CTAs</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

---

<!-- ## **Academic Perspective** 🎓 -->

<div class="academic-section">
  <div class="section-header">
    <h3>Academic Contributions</h3>
  </div>
  <div class="section-content">
    <ul class="styled-list">
      <li><strong>University Collaboration:</strong> I have collaborated with universities as a guest lecturer and co-authored research publications with professors.</li>
      <li><strong>Lecture Topics:</strong> My lectures have spanned topics like Knowledge Graphs and Graph Neural Networks, covering both deep technical details and high-level applications.</li>
      <li><strong>Research Publications:</strong> My research work includes papers such as:
        <ul class="nested-list">
          <li><strong>ORI</strong> - Dynamic LLM request routing</li>
          <li><strong>Fact-checker</strong> - Using Reinforcement Learning with Knowledge Graph Reasoning</li>
          <li><strong>DEAP-FAKED</strong> - A knowledge-graph-based approach for fake news detection</li>
          <li><strong>xAI on Embeddings</strong> - Intrinsic analysis for dual word embedding space models</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

---

<!-- ## **Personal Perspective** 🚀 -->

<div class="personal-section">
  <div class="section-header">
    <h3>Personal Contributions</h3>
  </div>
  <div class="section-content">
    <ul class="styled-list">
      <li><strong>Open Source & Education:</strong> I am an active open source contributor, educator, and tech influencer on social media.</li>
      <li><strong>Key Projects:</strong> I created and open-sourced:
        <ul class="nested-list">
          <li><strong>Jaal</strong> - Python package for interactive network visualization</li>
          <li><strong>Sankshep</strong> - Website summarizing Arxiv research</li>
          <li><strong>ML Dojo</strong> - Daily AI newsletter</li>
          <li><strong>Fine-tuned TTS and LLM models</strong> - Published on HuggingFace</li>
        </ul>
      </li>
      <li><strong>Book:</strong> I am the author of <a href="https://mohitmayank.com/a_lazy_data_science_guide/" target="_blank"><strong>"A Lazy Data Science Guide"</strong></a>, an online book covering a range of topics including NLP, audio intelligence, network science, data science tools, machine learning, and reinforcement learning.</li>
    </ul>
  </div>
</div>

---

<div class="cta-section text-center">
  <p class="mb-3"><strong>Here is a more detailed overview of <a href="https://mohitmayank.com/work" target="_blank">my work</a>, <a href="https://mohitmayank.com/projects" target="_blank">my projects</a>, or <a href="https://mohitmayank.com/research" target="_blank">my research</a>.<br>Check out my resume below.</strong></p>
</div>

---

## Resume

<div class="container-fluid p-0 resume-fullpage">
  <div class="row no-gutters">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center p-3 resume-header border-bottom">
        <h4 class="mb-0 resume-title">
          <i class="fas fa-file-pdf text-danger me-2"></i>My Resume
        </h4>
        <div class="resume-actions">
          <a href="../resume.pdf" target="_blank" class="btn btn-outline-primary btn-sm me-2">
            <i class="fas fa-download"></i> Download PDF
          </a>
          <button class="btn btn-outline-secondary btn-sm" onclick="toggleFullscreen()">
            <i class="fas fa-expand"></i> Fullscreen
          </button>
        </div>
      </div>
      <div class="resume-viewer-container">
        <iframe 
          id="resume-iframe"
          src="../resume.pdf#toolbar=0&navpanes=0&scrollbar=1&statusbar=0&messages=0&scrollbar=1&view=FitH" 
          width="100%" 
          height="100%"
          frameborder="0"
          style="min-height: 90vh;"
          title="Mohit Mayank Resume">
          <p>Your browser does not support PDFs. 
            <a href="../resume.pdf" target="_blank">Download the PDF</a> to view it.
          </p>
        </iframe>
      </div>
    </div>
  </div>
</div>

---

<div class="connect-section">
  <p class="text-center">Want to connect with me? <a href="https://topmate.io/mohit_mayank" target="_blank">Book a 1:1 chat</a> or <a href="mailto:mohitmayank1@gmail.com">mail me</a></p>
  <p class="text-center"><em>Let's build the future of AI together.</em></p>
</div>

<script>
function toggleFullscreen() {
  const iframe = document.getElementById('resume-iframe');
  const container = document.querySelector('.resume-fullpage');
  
  if (!document.fullscreenElement) {
    container.requestFullscreen().then(() => {
      iframe.style.height = '100vh';
      document.querySelector('.resume-header').style.display = 'none';
    }).catch(err => {
      console.log('Error attempting to enable fullscreen:', err.message);
    });
  } else {
    document.exitFullscreen().then(() => {
      iframe.style.height = '';
      iframe.style.minHeight = '90vh';
      document.querySelector('.resume-header').style.display = 'flex';
    });
  }
}

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', () => {
  const iframe = document.getElementById('resume-iframe');
  const header = document.querySelector('.resume-header');
  
  if (!document.fullscreenElement) {
    iframe.style.height = '';
    iframe.style.minHeight = '90vh';
    header.style.display = 'flex';
  }
});
</script>

<!-- ## Connect With Me

- :mortar_board: [google scholar profile](https://scholar.google.com/citations?user=LnW2hcYAAAAJ&hl=en)
- <i class="fab fa-linkedin"></i> [linkedin profile](https://www.linkedin.com/in/imohitmayank/)
- <i class="fab fa-twitter"></i> [twitter profile](https://twitter.com/imohitmayank)
- <i class="fab fa-github"></i> [github profile](https://github.com/imohitmayank)
- <i class="fab fa-medium"></i> [medium profile](https://medium.com/@MohitMayank)

<div class="row">
<!-- {% include about/skills.html title="Programming Skills" source=site.data.programming-skills %} -->
<!-- {% include about/skills.html title="Other Skills" source=site.data.other-skills %} -->
<!-- {% include about/skills.html title="Hobbies" source=site.data.hobbies %} -->
<!-- </div> -->

<!-- ## Timeline

<div class="row">
{% include about/timeline.html %}
</div> -->
