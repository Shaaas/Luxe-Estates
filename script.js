document.addEventListener('DOMContentLoaded', () => {

    // ---------- Navbar Scroll Effect ----------
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        navbar.style.padding = window.scrollY > 50 ? "15px 8%" : "25px 8%";
        navbar.style.background = window.scrollY > 50 ? "white" : "rgba(255,255,255,0.95)";
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        document.querySelectorAll('.reveal').forEach(el => {
            if(el.getBoundingClientRect().top < window.innerHeight - 100){
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ---------- Property Sliders ----------
    window.moveSlider = (id, dir) => {
        const container = document.getElementById(id);
        const track = container.querySelector('.slider-track');
        const slides = track.querySelectorAll('img').length;

        if (!container.dataset.index) container.dataset.index = 0;
        let index = (parseInt(container.dataset.index) + dir + slides) % slides;
        container.dataset.index = index;
        track.style.transform = `translateX(-${index * 100}%)`;

        // Update dots
        const dots = container.querySelectorAll('.dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    // Initialize slider dots
    document.querySelectorAll('.slider-container').forEach(s => {
        const dotsContainer = s.querySelector('.slider-dots');
        const count = s.querySelectorAll('.slider-track img').length;
        for(let i=0; i<count; i++){
            const dot = document.createElement('div');
            dot.className = i===0?'dot active':'dot';
            dot.onclick = ()=> {
                s.dataset.index = i;
                s.querySelector('.slider-track').style.transform = `translateX(-${i*100}%)`;
                s.querySelectorAll('.dot').forEach(d=>d.classList.remove('active'));
                dot.classList.add('active');
            };
            dotsContainer.appendChild(dot);
        }

        // Optional auto-scroll
        setInterval(()=> moveSlider(s.id,1), 6000);
    });

    // ---------- Filters & Sorting ----------
    const filterProps = () => {
        const type = document.getElementById('typeFilter').value;
        const beds = document.getElementById('bedFilter').value;
        const baths = document.getElementById('bathFilter').value;
        const sort = document.getElementById('sortFilter').value;
        const priceFilter = document.getElementById('priceFilter').value;

        const cards = [...document.querySelectorAll('.prop-card')];

        cards.forEach(card => {
            let show = true;
            if(type !== 'All' && card.dataset.type !== type) show = false;
            if(beds !== 'Any' && parseInt(card.dataset.bed) < parseInt(beds)) show = false;
            if(baths !== 'Any' && parseInt(card.dataset.bath) < parseInt(baths)) show = false;

            // Price filtering
            const cardPrice = parseInt(card.dataset.price);
            if(priceFilter === "$1M - $3M" && (cardPrice < 1000000 || cardPrice > 3000000)) show = false;
            if(priceFilter === "$3M - $10M" && (cardPrice < 3000000 || cardPrice > 10000000)) show = false;
            if(priceFilter === "$10M+" && cardPrice < 10000000) show = false;

            card.style.display = show ? 'block' : 'none';
        });

        // Sort cards
        if(sort === "Price: Low → High") {
            cards.sort((a,b)=> a.dataset.price - b.dataset.price);
        } else if(sort === "Price: High → Low") {
            cards.sort((a,b)=> b.dataset.price - a.dataset.price);
        } else { // Newest (original order)
            cards.sort((a,b)=> 0);
        }
        const grid = document.querySelector('.property-grid');
        cards.forEach(c => grid.appendChild(c));
    };

    document.querySelectorAll('#typeFilter, #bedFilter, #bathFilter, #sortFilter, #priceFilter').forEach(i => i.onchange = filterProps);
    filterProps();

    // ---------- Modal Logic ----------
    const modal = document.getElementById('contactModal');
    const triggers = document.querySelectorAll('#openModal, .inquiry-trigger');
    triggers.forEach(t => t.onclick = e => {
        e.preventDefault();
        modal.style.display = 'flex';
    });
    document.querySelector('.close-modal').onclick = () => modal.style.display='none';
    window.onclick = e => { if(e.target == modal) modal.style.display='none'; }

    // ---------- Form Submission Simulation ----------
    document.getElementById('leadForm').onsubmit = e => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerText = "Processing...";
        setTimeout(()=>{
            alert("Your exclusive inquiry has been received. An advisor will reach out shortly.");
            modal.style.display='none';
            e.target.reset();
            btn.innerText = "Submit Inquiry";
        }, 1500);
    };

    // ---------- Mortgage Calculator ----------
    const calculate = () => {
        const P = parseFloat(document.getElementById('price').value) || 0;
        const r = parseFloat(document.getElementById('interest').value)/100/12;
        const n = parseInt(document.getElementById('years').value)*12;
        if(P && r && n){
            const M = (P*r*Math.pow(1+r,n)) / (Math.pow(1+r,n)-1);
            document.getElementById('monthly-payment').innerText = new Intl.NumberFormat('en-US',{
                style:'currency', currency:'USD', maximumFractionDigits:0
            }).format(M);
        }
    };
    document.querySelectorAll('#calculator input, #calculator select').forEach(i=>i.oninput=calculate);
    calculate();
});
