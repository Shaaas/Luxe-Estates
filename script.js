// Scroll Reveal
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) { el.classList.add('active'); }
    });
};
window.addEventListener('scroll', reveal);
reveal(); // Run on load

// Mortgage Calculator Logic
const calculateMortgage = () => {
    const price = document.getElementById('price').value;
    const interest = document.getElementById('interest').value / 100 / 12;
    const years = document.getElementById('years').value * 12;
    
    if (price && interest && years) {
        const x = Math.pow(1 + interest, years);
        const monthly = (price * x * interest) / (x - 1);
        document.getElementById('monthly-payment').innerText = `$${monthly.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
};

// Listen for inputs
document.querySelectorAll('.input-group input, .input-group select').forEach(input => {
    input.addEventListener('input', calculateMortgage);
});

// Run initial calculation
calculateMortgage();
