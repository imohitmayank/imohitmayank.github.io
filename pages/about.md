---
layout: page
title: Me
permalink: /about/
weight: 5
---

<!-- # **About Me**
<br>

Hey, I’m Mohit Mayank, a Lead AI Engineer and Data Scientist with 9+ years of hands-on experience helping SaaS startups and enterprises set up, scale, and supercharge their AI capabilities.

## What I Do
I specialize in building and deploying cutting-edge AI solutions with expertise spanning over Generative AI (Text & Audio), Large Language Models (LLMs), Reinforcement Learning, Knowledge Graphs, and advanced Audio & Computer Vision systems. Whether you’re looking to launch an AI-powered product, optimize existing workflows, or make sense of complex data, I bring a blend of deep technical know-how and practical business acumen to every project.

## My Journey
- **Current**: Lead AI Engineer at O.XYZ, where I architect world-class AI products like OCEAN (a blazing-fast AI search engine), Miss O (low-latency voice assistant), and ORI (dynamic multi-LLM routing frameworks).
- **Previously**: Led AI innovation at Outplay, driving products such as SureConnect.ai, Conversation Intelligence, and in-house ASR systems that transformed sales and communication for global teams.
- **Past Experience**: Tata Research Development and Design Centre (TCS), AlgoAnalytics, and CDAC, delivering impactful NLP, forecasting, recommendation, and optimization solutions.

## Notable Projects & Achievements
- **Products**: Creator of “Jaal” (open-source network visualization), Sankshep (AI-powered research summarizer), Law Finder, and more.
- **Awards**: Winner, TCS SUPERCoder 2019 (1st out of 20,000+), Digitate Ideathon Winner.
- **Publications**: Published papers on LLM Routing, Knowledge Graphs Fake News detection and Embeddings. 
- **Articles**: Author of “A Lazy Data Science Guide” and technical articles on LLMs, Knowledge Graphs, Explainable AI, and RL.
- **Speaker & Mentor**: Guest lecturer and collaborator with top universities; passionate about sharing knowledge and nurturing the next generation of AI talent.

## Why Work With Me?
- **Full-Stack AI Expertise**: From research to production, I cover the entire AI lifecycle-ideation, prototyping, deployment, and scaling.
- **Domain Versatility**: Proven track record in Web3 and Web2 - Sales, Finance, Retail, and beyond.
- **Open Source & Community**: Active contributor and creator in the AI/ML open-source ecosystem.
- **Results-Driven**: My solutions don’t just work-they deliver measurable business impact.

Want to connect with me? [Book a 1:1 chat with me on Topmate](https://topmate.io/mohit_mayank)

Let's build the future of AI together.

## Resume -->

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
