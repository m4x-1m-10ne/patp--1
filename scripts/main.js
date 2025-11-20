const scrollButton = document.getElementById('toTop');
const jobPopup = document.getElementById('jobPopup');
const workButton = document.getElementById('workButton');

function toggleScrollButton() {
    if (window.scrollY > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
}

toggleScrollButton();
window.addEventListener('scroll', toggleScrollButton);

scrollButton.addEventListener('click', function() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
});

const navbarToggler = document.getElementById('navbarToggler');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
}

function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.height = '';
}

function hideElements() {
    if (scrollButton) scrollButton.style.display = 'none';
    if (jobPopup) jobPopup.style.display = 'none';
    if (workButton) workButton.style.display = 'none';
}

function showElements() {
    if (scrollButton) scrollButton.style.display = '';
    if (jobPopup) jobPopup.style.display = '';
    if (workButton) workButton.style.display = '';
}

navbarToggler.addEventListener('click', function() {
    const isActive = this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.classList.toggle('mobile-menu-open', isActive);
    
    if (isActive) {
        disableScroll();
        hideElements();
    } else {
        enableScroll();
        showElements();
    }
});

mobileMenuOverlay.addEventListener('click', function() {
    navbarToggler.classList.remove('active');
    mobileMenu.classList.remove('active');
    this.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
    enableScroll();
    showElements();
});

const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (this.getAttribute('target') === '_blank') return;
        
        navbarToggler.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        enableScroll();
        showElements();
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        navbarToggler.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        enableScroll();
        showElements();
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
        navbarToggler.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        enableScroll();
        showElements();
    }
});
