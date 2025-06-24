 // Preloader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('preloader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('preloader').style.display = 'none';
                }, 500);
            }, 1000);
        });
        
        // Scroll Progress Bar
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
            document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
        });
        
        // Back to Top Button
        const backToTopBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            backToTopBtn.style.display = (window.scrollY > 300) ? 'flex' : 'none';
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // إضافة active class للروابط عند التمرير
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 300)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
        
        // تأثيرات الظهور عند التمرير
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });
        
        // Lightbox
        document.querySelectorAll('.portfolio-item img').forEach(img => {
            img.addEventListener('click', () => {
                document.getElementById('lightbox-img').src = img.src;
                document.getElementById('lightbox').style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        document.getElementById('close-lightbox').addEventListener('click', () => {
            document.getElementById('lightbox').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Lazy loading for iframes
        const lazyLoadIframes = () => {
            const iframes = document.querySelectorAll('iframe[loading="lazy"]');
            
            const iframeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const iframe = entry.target;
                        iframe.src = iframe.getAttribute('data-src');
                        iframeObserver.unobserve(iframe);
                    }
                });
            }, { rootMargin: '200px' });
            
            iframes.forEach(iframe => {
                iframe.setAttribute('data-src', iframe.src);
                iframe.removeAttribute('src');
                iframeObserver.observe(iframe);
            });
        };
        
        // Run lazy loading after DOM is loaded
        document.addEventListener('DOMContentLoaded', lazyLoadIframes);