// --- 1. Navigation & Scroll Effects ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    nav.style.padding = window.scrollY > 50 ? "15px 8%" : "25px 8%";
    nav.style.boxShadow = window.scrollY > 50 ? "0 10px 30px rgba(0,0,0,0.05)" : "none";
    
    // Trigger Reveal Animation
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
});

// --- 2. Property Slider Logic ---
let sliderStates = {};
function moveSlider(id, dir) {
    const track = document.querySelector(`#${id} .slider-track`);
    const slides = track.querySelectorAll('img').length;
    if (!sliderStates[id]) sliderStates[id] = 0;
    
    sliderStates[id] = (sliderStates[id] + dir + slides) % slides;
    track.style.transform = `translateX(-${sliderStates[id] * 100}%)`;
}

// --- 3. Mortgage Calculator ---
const calculate = () => {
    const P = parseFloat(document.getElementById('price').value);
    const r = parseFloat(document.getElementById('interest').value) / 100 / 12;
    const n = parseInt(document.getElementById('years').value) * 12;
    const display = document.getElementById('monthly-payment');

    if (P && r && n) {
        const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        display.innerText = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD', maximumFractionDigits: 0
        }).format(M);
    }
};
document.querySelectorAll('.input-group input, select').forEach(i => i.oninput = calculate);
calculate();

// --- 4. Modal System ---
const modal = document.getElementById('contactModal');
const openModal = (e) => { e.preventDefault(); modal.style.display = 'flex'; };
document.getElementById('openModal').onclick = openModal;
document.querySelectorAll('.inquiry-trigger').forEach(b => b.onclick = openModal);
document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';

// --- 5. Lead Form Submission (Simulation) ---
document.getElementById('leadForm').onsubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "Sending...";
    setTimeout(() => {
        alert("Portfolio Inquiry Sent Successfully.");
        modal.style.display = 'none';
        btn.innerText = "Send Portfolio Request";
        e.target.reset();
    }, 1500);
};
