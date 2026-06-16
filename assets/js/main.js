/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the shadow-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('shadow-header') 
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== TYPED JS ===============*/
const typed = new Typed('.home__profession', {
    strings: ['Data Analyst', 'ML Engineer', 'Data Scientist'],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 2000,
    loop: true
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') 
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
})

sr.reveal(`.home__data, .about__data, .contact__form`)
sr.reveal(`.home__images, .about__images, .projects__container`, {origin: 'bottom'})

/*=============== CONTACT EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()
    // Try EmailJS SDK first if available
    const sdk = window['emailjs'];
    if (sdk && typeof sdk.sendForm === 'function') {
        sdk.sendForm('service_02iyt3k', 'template_a4y9ks5', '#contact-form', '-wdemEg7UV1_ZiS4i')
            .then(() => {
                contactMessage.textContent = 'Message sent successfully ✅'

                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 5000)

                contactForm.reset()
            }, () => {
                contactMessage.textContent = 'Message not sent (service error) ❌'
            })
        return
    }

    // Fallback: use EmailJS REST API directly
    const payload = {
        service_id: 'service_02iyt3k',
        template_id: 'template_a4y9ks5',
        user_id: '-wdemEg7UV1_ZiS4i',
        template_params: {
            user_name: contactForm.user_name ? contactForm.user_name.value : '',
            user_email: contactForm.user_email ? contactForm.user_email.value : '',
            user_project: contactForm.user_project ? contactForm.user_project.value : ''
        }
    }

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            contactMessage.textContent = 'Message sent successfully ✅'
            setTimeout(() => { contactMessage.textContent = '' }, 5000)
            contactForm.reset()
        } else {
            contactMessage.textContent = 'Message not sent (service error) ❌'
            return response.text().then(t => console.error('EmailJS API error:', t))
        }
    })
    .catch(err => {
        console.error('Email send failed:', err)
        contactMessage.textContent = 'Message not sent (network error) ❌'
    })
}

if (contactForm) {
    contactForm.addEventListener('submit', sendEmail)
}