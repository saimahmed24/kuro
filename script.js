// Add event listeners to all relevant elements
const menuItems = ['home', 'about', 'services', 'skills', 'experience', 'contact'];

menuItems.forEach(item => {
    document.getElementById(item).addEventListener('click', active);
});

function active(event) {
    // Remove 'active' class from all items
    menuItems.forEach(item => {
        const element = document.getElementById(item);
        element.classList.remove('active');

        // Ensure the blurr class is retained on inactive elements
        element.classList.add('blurr');
    });

    // Add 'active' class to the clicked item
    event.currentTarget.classList.add('active');
    event.currentTarget.classList.remove('blurr');
}

window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.section'); // Select all sections with the class 'section'
    const navbarItems = document.querySelectorAll('ul li');  // Select all navbar <li> items

    sections.forEach((section, index) => {
        const sectionPosition = section.getBoundingClientRect();

        // Check if the section is in the viewport (threshold: middle of the screen)
        if (sectionPosition.top <= window.innerHeight / 2 && sectionPosition.bottom >= window.innerHeight / 2) {
            // Remove 'active' class from all navbar items
            navbarItems.forEach(item => {
                item.classList.remove('active');
                item.classList.add('blurr'); // Ensure inactive items retain the blurr class
            });

            // Add 'active' class to the corresponding navbar item based on the index
            navbarItems[index].classList.add('active');
            navbarItems[index].classList.remove('blurr'); // Remove blurr class from the active item
        }
    });
});

menuItems.forEach(item => {
    document.getElementById(item).addEventListener('click', view);
});

function view(event) {
    const item = event.currentTarget.textContent;
    let secc = Array.from(document.querySelectorAll('.section'));
    let lii = Array.from(document.querySelectorAll('ul li'));

    for (let x = 0; x < lii.length; x++) {
        const a = lii[x].textContent;
        if (item === a) {
            let ct = x;
            event.preventDefault();

            // Get the target section's top position relative to the viewport
            const targetSection = secc[ct];
            const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: targetPosition - 80,
                behavior: 'smooth'
            });
        }
    }
}

document.querySelectorAll('.open-carousel-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-target');
        document.getElementById(modalId).style.display = 'flex';
        currentSlide(1, modalId);
    });
});

document.querySelectorAll('.close-carousel').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.carousel-modal').style.display = 'none';
    });
});

document.querySelectorAll('.prev, .next').forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.closest('.carousel-modal').id;
        const direction = this.classList.contains('next') ? 1 : -1;
        plusSlides(direction, modalId);
    });
});

let slideIndex = {};

function plusSlides(n, modalId) {
    currentSlide(slideIndex[modalId] += n, modalId);
}

function currentSlide(n, modalId) {
    const slides = document.querySelectorAll(`#${modalId} .carousel-slide`);
    if (n > slides.length) slideIndex[modalId] = 1;
    if (n < 1) slideIndex[modalId] = slides.length;
    
    slides.forEach((slide, index) => {
        slide.style.display = (index + 1 === slideIndex[modalId]) ? 'flex' : 'none';
    });
}

// Initialize slide index for each modal
document.querySelectorAll('.carousel-modal').forEach(modal => {
    slideIndex[modal.id] = 1; // Set initial slide index
});
