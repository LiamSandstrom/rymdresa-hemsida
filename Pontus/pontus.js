let allProjects = [];

function initSlider() {
    const slidesEl = document.getElementById('slides');
    const slides = slidesEl.children;
    const dotsEl = document.getElementById('dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let idx = 0;

    function createDots() {
        for (let i = 0; i < slides.length; i++) {
            const d = document.createElement('div');
            d.className = 'dot';
            d.addEventListener('click', () => { goTo(i) });
            dotsEl.appendChild(d);
        }
        dotsEl.children[0].classList.add('active');
    }

    function update() {
        slidesEl.style.transform = `translateX(-${idx * 100}%)`;
        Array.from(dotsEl.children).forEach((dot, i) => dot.classList.toggle('active', i === idx));
    }

    function goTo(i) {
        idx = i;
        update();
    }

    function next() {
        idx = (idx + 1) % slides.length;
        update();
    }

    function prev() {
        idx = (idx - 1 + slides.length) % slides.length;
        update();
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    createDots();
}

function initSkillsAnimation() {
    const bars = document.querySelectorAll('.bar i');

    function animate() {
        bars.forEach(b => {
            const p = parseInt(b.getAttribute('data-skill') || 0, 10);
            b.style.width = p + '%';
        });
    }

    animate();
}

function loadProjects() {
    const container = document.getElementById('projects');
    container.innerHTML = '';

    axios.get('pontus.json')
        .then(response => {
            allProjects = response.data;
            renderProjects(allProjects);
            setupSorting();
        })
        .catch(err => {
            console.error('Kunde inte läsa in projekten', err);
        });
}

function renderProjects(projects) {
    const container = document.getElementById('projects');
    container.innerHTML = '';

    projects.forEach((project, index) => {
        const el = document.createElement('div');
        el.className = 'proj';
        el.innerHTML = `
      <h4>${project.title}</h4>
      <p>${project.description}</p>
    `;
        container.appendChild(el);
    });

    setTimeout(() => {
        initScrollAnimationsForProjects();
    }, 100);
}

function setupSorting() {
    const sortSelect = document.getElementById('projectSort');
    sortSelect.addEventListener('change', handleSorting);
}

function handleSorting() {
  const sortSelect = document.getElementById('projectSort');
  const sortValue = sortSelect.value;
  let sortedProjects;

  if (sortValue === 'original') {
    sortedProjects = allProjects;
  } else {
    sortedProjects = [...allProjects];
    sortedProjects.sort((a, b) => {
      if (sortValue === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }
  
  renderProjects(sortedProjects);
}

function initScrollAnimationsForProjects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.proj').forEach((proj, index) => {
        proj.classList.remove('visible');
        proj.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(proj);
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('skill')) {
                    const bar = entry.target.querySelector('.bar i');
                    const skillLevel = bar.getAttribute('data-skill');
                    setTimeout(() => {
                        bar.style.width = skillLevel + '%';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    document.querySelectorAll('.card, .proj, .skill').forEach(element => {
        observer.observe(element);
    });
}

function initPage() {
    initSlider();
    initSkillsAnimation();
    loadProjects();
    setTimeout(() => {
        initScrollAnimations();
    }, 300);
}

document.addEventListener('DOMContentLoaded', initPage);