document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Effects & Reveal
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        navbar.style.padding = window.scrollY > 50 ? "15px 8%" : "25px 8%";
        navbar.style.background = window.scrollY > 50 ? "white" : "rgba(255,255,255,0.95)";
        
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 2. Property Slider Logic
    window.moveSlider = (id, dir) => {
        const container = document.getElementById(id);
        const track = container.querySelector('.slider-track');
        const slides = track.querySelectorAll('img').length;
        
        if (!container.dataset.index) container.dataset.index = 0;
        let index = (parseInt(container.dataset.index) + dir + slides) % slides;
        
        container.dataset.index = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update Dots
        const dots = container.querySelectorAll('.dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    // Initialize Dots
    document.querySelectorAll('.slider-container').forEach(s => {
        const dotsContainer = s.querySelector('.slider-dots');
        const count = s.querySelectorAll('.slider-track img').length;
        for(let i=0; i<count; i++) {
            const dot = document.createElement('div');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dotsContainer.appendChild(dot);
        }
    });

    // 3. Mortgage Calculator
    const calculate = () => {
        const P = parseFloat(document.getElementById('price').value) || 0;
        const r = parseFloat(document.getElementById('interest').value) / 100 / 12;
        const n = parseInt(document.getElementById('years').value) * 12;
        
        if (P && r && n) {
            const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            document.getElementById('monthly-payment').innerText = new Intl.NumberFormat('en-US', {
                style: 'currency', currency: 'USD', maximumFractionDigits: 0
            }).format(M);
        }
    };
    document.querySelectorAll('#calculator input, #calculator select').forEach(i => i.oninput = calculate);
    calculate();

    // 4. Modal Logic
    const modal = document.getElementById('contactModal');
    const triggers = document.querySelectorAll('#openModal, .inquiry-trigger');
    
    triggers.forEach(t => t.onclick = (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; };

    // 5. Form Submission Simulation
    document.getElementById('leadForm').onsubmit = (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerText = "Processing...";
        setTimeout(() => {
            alert("Your exclusive inquiry has been received. An advisor will reach out shortly.");
            modal.style.display = 'none';
            e.target.reset();
            btn.innerText = "Submit Inquiry";
        }, 1500);
    };
});
