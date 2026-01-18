function generateWebsite() {
    const promptInput = document.getElementById('userPrompt');
    const prompt = promptInput.value.trim();
    const btn = document.getElementById('generateBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const previewContainer = document.getElementById('previewContainer');
    const iframe = document.getElementById('previewFrame');

    if (!prompt) return;

    // Loading State
    btn.disabled = true;
    btnText.textContent = "Dreaming...";
    // We can't easily animate the lucide icon without React, so we just keep it simple or swap classes if needed
    
    // Simulate AI Delay
    setTimeout(() => {
        // Reset Button
        btn.disabled = false;
        btnText.textContent = "Generate";

        // Generate Content
        const safePrompt = prompt.toLowerCase();
        let bgColor = "white";
        let textColor = "black";
        let accentColor = "#3b82f6";

        if (safePrompt.includes("dark")) {
            bgColor = "#1a1a1a";
            textColor = "#ffffff";
        }
        if (safePrompt.includes("blue")) {
            bgColor = "#eff6ff";
            textColor = "#1e3a8a";
        }
        if (safePrompt.includes("coffee")) {
            bgColor = "#2c241b";
            textColor = "#e3d5ca";
            accentColor = "#a67b5b";
        }

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: system-ui, -apple-system, sans-serif;
                        margin: 0;
                        padding: 40px;
                        background-color: ${bgColor};
                        color: ${textColor};
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                    }
                    h1 {
                        font-size: 3.5rem;
                        margin-bottom: 20px;
                        font-weight: 800;
                        letter-spacing: -0.05em;
                        line-height: 1.1;
                    }
                    .highlight {
                        color: ${accentColor};
                    }
                    p {
                        font-size: 1.25rem;
                        opacity: 0.8;
                        max-width: 600px;
                        line-height: 1.6;
                        margin-bottom: 40px;
                    }
                    .btn-group {
                        display: flex;
                        gap: 16px;
                    }
                    .primary-btn {
                        padding: 16px 32px;
                        background: ${accentColor};
                        color: white;
                        border: none;
                        border-radius: 12px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-weight: 600;
                        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                        transition: transform 0.2s;
                    }
                    .primary-btn:hover {
                        transform: translateY(-2px);
                    }
                    .secondary-btn {
                        padding: 16px 32px;
                        background: transparent;
                        color: inherit;
                        border: 1px solid currentColor;
                        border-radius: 12px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-weight: 600;
                    }
                </style>
            </head>
            <body>
                <h1>Your Vision <br> <span class="highlight">Realized</span></h1>
                <p>${prompt}</p>
                <div class="btn-group">
                    <button class="primary-btn">Get Started</button>
                    <button class="secondary-btn">Learn More</button>
                </div>
            </body>
            </html>
        `;

        // Inject content into iframe
        iframe.srcdoc = htmlContent;
        
        // Show Preview
        previewContainer.classList.remove('hidden');

        // Scroll to preview on mobile
        if (window.innerWidth < 768) {
            previewContainer.scrollIntoView({ behavior: 'smooth' });
        }

    }, 2000); // 2 second delay
}

// Allow Enter key to submit
document.getElementById('userPrompt').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateWebsite();
    }
});
