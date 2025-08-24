// AI Ethics Lab - Fixed JavaScript with Working Case Study Expansion

let currentPage = 'landing-page';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing AI Ethics Lab...');
    initializeApp();
});

function initializeApp() {
    // Show initial page
    showPage('landing-page');
    
    // Set up all event listeners
    setupTopicCardListeners();
    setupBackButtonListeners();
    setupCaseStudyListeners();
    setupButtonEffects();
    
    console.log('AI Ethics Lab initialized successfully!');
}

function setupTopicCardListeners() {
    console.log('Setting up topic card listeners...');
    
    // Get all topic cards
    const topicCards = document.querySelectorAll('.topic-card');
    console.log('Found topic cards:', topicCards.length);
    
    topicCards.forEach(card => {
        const topicId = card.getAttribute('data-topic');
        console.log('Setting up listener for:', topicId);
        
        // Add click listener to entire card
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Topic card clicked:', topicId);
            navigateToTopic(topicId);
        });
        
        // Also add listener to explore button specifically
        const exploreBtn = card.querySelector('.explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Explore button clicked:', topicId);
                navigateToTopic(topicId);
            });
        }
    });
}

function setupBackButtonListeners() {
    console.log('Setting up back button listeners...');
    
    // Use event delegation to handle all back buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('back-btn') || e.target.closest('.back-btn')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Back button clicked via delegation');
            navigateToHome();
            return false;
        }
    });
}

function setupCaseStudyListeners() {
    console.log('Setting up case study listeners...');
    
    // Get all case study cards on the current page
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    console.log('Found case study cards:', caseStudyCards.length);
    
    caseStudyCards.forEach((card, index) => {
        console.log('Setting up case study listener', index);
        
        // Remove any existing event listeners by cloning
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        // Add click listener to the new card
        newCard.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Case study clicked:', index);
            toggleCaseStudy(newCard);
        });
    });
}

function navigateToTopic(topicId) {
    console.log('Attempting to navigate to:', topicId);
    
    if (!topicId) {
        console.error('No topic ID provided');
        return;
    }
    
    // Check if target page exists
    const targetPage = document.getElementById(topicId);
    if (!targetPage) {
        console.error('Topic page not found:', topicId);
        return;
    }
    
    console.log('Target page found, navigating...');
    
    // Hide current page and show target
    hideAllPages();
    showPage(topicId);
    currentPage = topicId;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Set up case study listeners for the new page after a short delay
    setTimeout(() => {
        setupCaseStudyListeners();
    }, 200);
    
    console.log('Successfully navigated to:', topicId);
}

function navigateToHome() {
    console.log('Navigating to home...');
    
    hideAllPages();
    showPage('landing-page');
    currentPage = 'landing-page';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Re-setup topic card listeners
    setTimeout(() => {
        setupTopicCardListeners();
    }, 100);
    
    console.log('Successfully navigated to home');
}

function hideAllPages() {
    console.log('Hiding all pages...');
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
        page.style.opacity = '';
        page.style.transition = '';
    });
}

function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'block';
        page.classList.add('active');
        
        // Add smooth entrance effect
        page.style.opacity = '0';
        setTimeout(() => {
            page.style.transition = 'opacity 0.3s ease';
            page.style.opacity = '1';
        }, 10);
        
        console.log('Page shown:', pageId);
    } else {
        console.error('Page not found:', pageId);
    }
}

function toggleCaseStudy(card) {
    console.log('Toggling case study...');
    
    const content = card.querySelector('.case-study-content');
    const indicator = card.querySelector('.toggle-indicator');
    
    if (!content || !indicator) {
        console.error('Case study elements not found');
        console.log('Card HTML:', card.innerHTML);
        return;
    }
    
    const isHidden = content.classList.contains('hidden');
    console.log('Case study is hidden:', isHidden);
    
    if (isHidden) {
        // Show case study
        console.log('Expanding case study...');
        content.classList.remove('hidden');
        content.style.display = 'block';
        indicator.textContent = 'CLICK TO CLOSE';
        card.classList.add('expanded');
        
        // Smooth animation
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.transition = 'opacity 0.3s ease';
            content.style.opacity = '1';
        }, 10);
        
    } else {
        // Hide case study
        console.log('Collapsing case study...');
        content.style.transition = 'opacity 0.3s ease';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.classList.add('hidden');
            content.style.display = 'none';
            indicator.textContent = 'CLICK TO read';
            card.classList.remove('expanded');
            content.style.transition = '';
            content.style.opacity = '';
        }, 300);
    }
}

function setupButtonEffects() {
    // Add press effects to buttons using event delegation
    document.addEventListener('mousedown', function(e) {
        const button = e.target.closest('.explore-btn, .back-btn');
        if (button) {
            button.style.transform = 'translate(2px, 2px)';
            button.style.boxShadow = '2px 2px 0px #000000';
        }
    });
    
    document.addEventListener('mouseup', function(e) {
        const button = e.target.closest('.explore-btn, .back-btn');
        if (button) {
            setTimeout(() => {
                button.style.transform = '';
                button.style.boxShadow = '';
            }, 100);
        }
    });
    
    // Add hover effects to topic cards using event delegation
    document.addEventListener('mouseenter', function(e) {
        const card = e.target.closest('.topic-card');
        if (card) {
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.transition = 'transform 0.3s ease';
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        const card = e.target.closest('.topic-card');
        if (card) {
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        }
    }, true);
}

// Debug functions for testing
window.debugApp = function() {
    console.log('Current page:', currentPage);
    console.log('All pages:', document.querySelectorAll('.page').length);
    console.log('Active pages:', document.querySelectorAll('.page.active').length);
    console.log('Topic cards:', document.querySelectorAll('.topic-card').length);
    console.log('Back buttons:', document.querySelectorAll('.back-btn').length);
    console.log('Case studies:', document.querySelectorAll('.case-study-card').length);
};

window.testNavigation = function(topicId) {
    console.log('Testing navigation to:', topicId);
    navigateToTopic(topicId);
};

window.testHome = function() {
    console.log('Testing navigation to home');
    navigateToHome();
};

window.testCaseStudy = function() {
    console.log('Testing case study toggle');
    const caseStudyCard = document.querySelector('.case-study-card');
    if (caseStudyCard) {
        toggleCaseStudy(caseStudyCard);
    } else {
        console.log('No case study card found');
    }
};

// Add keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && currentPage !== 'landing-page') {
        navigateToHome();
    }
});

console.log('AI Ethics Lab JavaScript loaded!');