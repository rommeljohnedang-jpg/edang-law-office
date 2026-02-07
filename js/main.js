/* ===================================
   EDANG LAW OFFICE - Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile Navigation Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // --- Header Scroll Effect ---
  const header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Scroll Animations (Fade In) ---
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Contact Form Handling via FormSubmit ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  // Check if returning from successful submission
  if (window.location.search.indexOf('sent=true') > -1) {
    if (contactForm) contactForm.style.display = 'none';
    if (formSuccess) formSuccess.classList.add('show');
    setTimeout(function () {
      if (contactForm) contactForm.style.display = 'block';
      if (formSuccess) formSuccess.classList.remove('show');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }, 5000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Basic validation before allowing submit
      var firstName = document.getElementById('firstName').value.trim();
      var lastName = document.getElementById('lastName').value.trim();
      var email = document.getElementById('email').value.trim();
      var subject = document.getElementById('subject').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!firstName || !lastName || !email || !subject || !message) {
        e.preventDefault();
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        return;
      }

      // Set reply-to email
      var replyTo = document.getElementById('replyTo');
      if (replyTo) replyTo.value = email;

      // Show sending state
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // Allow the form to submit normally to FormSubmit
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Active nav link highlighting ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (link.classList.contains('active') && href !== currentPage) {
      // Don't remove active from CTA button
      if (!link.closest('.nav-cta')) {
        link.classList.remove('active');
      }
    }
  });

});
