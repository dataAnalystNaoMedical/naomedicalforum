document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const feedbackButton = document.getElementById('feedback-button');
    const feedbackPopup = document.getElementById('feedback-popup');
    const feedbackClose = document.getElementById('feedback-close');
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackNext = document.getElementById('feedback-next');
    const feedbackPrev = document.getElementById('feedback-prev');
    const feedbackSubmit = document.getElementById('feedback-submit');

    // Comment functionality
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = commentForm.querySelector('textarea');
        const comment = textarea.value.trim();
        if (comment) {
            addComment(comment);
            textarea.value = '';
        }
    });

    function addComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <div class="comment-header">
                <strong>Anonymous</strong>
                <span>Just now</span>
            </div>
            <p>${comment}</p>
        `;
        commentsList.prepend(commentElement);
    }

    // Feedback popup functionality
    feedbackButton.addEventListener('click', () => {
        feedbackPopup.style.display = 'block';
        showFeedbackStep(1);
    });

    feedbackClose.addEventListener('click', () => {
        feedbackPopup.style.display = 'none';
    });

    let currentStep = 1;
    const totalSteps = 4;

    function showFeedbackStep(step) {
        document.querySelectorAll('.feedback-step').forEach(el => el.classList.remove('active'));
        document.querySelector(`.feedback-step[data-step="${step}"]`).classList.add('active');
        
        feedbackPrev.style.display = step > 1 ? 'block' : 'none';
        feedbackNext.style.display = step < totalSteps ? 'block' : 'none';
        feedbackSubmit.style.display = step === totalSteps ? 'block' : 'none';
        
        currentStep = step;
    }

    feedbackNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            showFeedbackStep(currentStep + 1);
        }
    });

    feedbackPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            showFeedbackStep(currentStep - 1);
        }
    });

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the feedback data to your server
        console.log('Feedback submitted:', new FormData(feedbackForm));
        feedbackPopup.style.display = 'none';
        alert('Thank you for your feedback!');
    });

    initAccordion();
});


function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

