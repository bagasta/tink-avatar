/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });

    // Immersive Avatar Modal Logic
    const avatarModal = document.getElementById('avatar-modal');
    const openModalBtns = document.querySelectorAll('.open-avatar-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const openModal = (e) => {
        if(e) e.preventDefault();
        avatarModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        avatarModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal on clicking outside the container
    avatarModal.addEventListener('click', (e) => {
        if (e.target === avatarModal) {
            closeModal();
        }
    });

    // Close modal on pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && avatarModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Send message logic
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if (chatInput && chatSend && chatMessages) {
        function sendMessage() {
            const text = chatInput.value.trim();
            if (text) {
                // Add user message
                const userBubble = document.createElement('div');
                userBubble.classList.add('chat-bubble', 'user');
                userBubble.textContent = text;
                chatMessages.appendChild(userBubble);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate bot response
                setTimeout(() => {
                    const botBubble = document.createElement('div');
                    botBubble.classList.add('chat-bubble', 'bot');
                    botBubble.textContent = "Thank you for your message. Tinka is processing your request...";
                    chatMessages.appendChild(botBubble);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
