document.addEventListener('DOMContentLoaded', function() {
    // Only display once per session so browsing is smooth
    const hasSeenAlert = sessionStorage.getItem('llmira_welcome_alert');

    if (!hasSeenAlert && typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Welcome Cherished Guest',
            html: `
                <div style="text-align: center; margin-top: 0.5rem;">
                    <p style="margin-bottom: 1rem; color: #334155;">
                        This celebration invitation has been prepared exclusively for you to share in the joy of our sacred union.
                    </p>
                    <div style="background-color: #faf6ee; border-left: 3px solid #10266e; padding: 0.75rem 1rem; text-align: left; font-size: 0.88rem; color: #1e293b; margin-bottom: 1rem;">
                        <strong>Friendly Note:</strong> We kindly ask that this private invitation link is not forwarded to others without prior approval from the couple or family.
                    </div>
                    <p style="font-size: 0.85rem; color: #64748b;">
                        Thank you for your warm love, prayers, and understanding!
                    </p>
                </div>
            `,
            iconHtml: '<i class="fas fa-envelope-open-text" style="color: #10266e; font-size: 2.2rem;"></i>',
            confirmButtonText: 'Enter Celebration',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                htmlContainer: 'custom-swal-html-container',
                confirmButton: 'custom-swal-confirm-button'
            },
            buttonsStyling: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            stopKeydownPropagation: false
        }).then((result) => {
            sessionStorage.setItem('llmira_welcome_alert', 'true');
            // Trigger confetti on confirmation
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.7 },
                    colors: ['#0f2b76', '#556b2f', '#faf6ee', '#c59b27']
                });
            }
        });
    }
});