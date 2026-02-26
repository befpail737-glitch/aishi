/* Aishi Distributor Website - Main JavaScript */
// Mobile Navigation Toggle
function initMobileNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const navUl = nav.querySelector('ul');
    if (!navUl) return;
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
    nav.insertBefore(hamburger, navUl);
}
// Add CSS for hamburger menu
function addHamburgerCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .hamburger { display: none; flex-direction: column; cursor: pointer; padding: 5px; }
        .hamburger span { width: 25px; height: 3px; background-color: #4a5568; margin: 3px 0; transition: 0.3s; }
        .mobile-nav { display: none; }
        .mobile-nav.show { display: block; }
        .hamburger.active span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }
        @media (max-width: 768px) { .hamburger { display: flex; } nav ul { display: none; } nav ul.show { display: block; } }
    `;
    document.head.appendChild(style);
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addHamburgerCSS();
    initMobileNav();
    console.log('Aishi website JavaScript initialized');
});