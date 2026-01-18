function generateWebsite() {
    const promptInput = document.getElementById('userPrompt');
    const prompt = promptInput.value.trim();
    const btn = document.getElementById('generateBtn');
    const btnText = document.getElementById('btnText');
    const previewContainer = document.getElementById('previewContainer');
    const iframe = document.getElementById('previewFrame');
    const codeArea = document.getElementById('codeArea');

    if (!prompt) return;

    // Loading State
    btn.disabled = true;
    btnText.textContent = "Dreaming...";
    
    // Simulate AI Delay
    setTimeout(() => {
        // Reset Button
        btn.disabled = false;
        btnText.textContent = "Generate";

        // Generate Content based on keywords
        const safePrompt = prompt.toLowerCase();
        
        // Theme Colors
        let theme = {
            bg: "bg-white",
            text: "text-gray-900",
            primary: "bg-blue-600 hover:bg-blue-700",
            secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
            iconColor: "text-blue-500",
            accentGradient: "from-blue-400 to-purple-600"
        };

        if (safePrompt.includes("dark")) {
            theme.bg = "bg-slate-900";
            theme.text = "text-white";
            theme.primary = "bg-indigo-600 hover:bg-indigo-700";
            theme.secondary = "bg-white/10 hover:bg-white/20 text-white";
            theme.iconColor = "text-indigo-400";
            theme.accentGradient: "from-indigo-400 to-cyan-400"
        } else if (safePrompt.includes("coffee") || safePrompt.includes("cafe")) {
            theme.bg = "bg-[#1c1917]";
            theme.text = "text-[#e7e5e4]";
            theme.primary = "bg-[#d97706] hover:bg-[#b45309]";
            theme.secondary = "bg-[#292524] hover:bg-[#44403c] text-[#d6d3d1]";
            theme.iconColor = "text-orange-500";
            theme.accentGradient: "from-orange-400 to-amber-600"
        } else if (safePrompt.includes("nature") || safePrompt.includes("green")) {
            theme.bg = "bg-emerald-50";
            theme.text = "text-emerald-900";
            theme.primary = "bg-emerald-600 hover:bg-emerald-700";
            theme.secondary = "bg-emerald-200 hover:bg-emerald-300 text-emerald-900";
            theme.iconColor = "text-emerald-600";
            theme.accentGradient: "from-emerald-400 to-teal-500"
        } else if (safePrompt.includes("red") || safePrompt.includes("bold")) {
            theme.bg = "bg-white";
            theme.text = "text-gray-900";
            theme.primary = "bg-red-600 hover:bg-red-700";
            theme.secondary = "bg-gray-100 hover:bg-gray-200";
            theme.iconColor = "text-red-500";
            theme.accentGradient: "from-red-500 to-pink-600"
        }

        // Production Grade Template (Tailwind + FontAwesome + Animation)
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; transform: translateY(20px); }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body class="${theme.bg} ${theme.text} antialiased selection:bg-blue-500 selection:text-white">
    
    <!-- Navbar -->
    <nav class="fixed w-full z-50 backdrop-blur-lg border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center gap-2 font-bold text-xl tracking-tight">
                   <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${theme.accentGradient || 'from-blue-500 to-purple-600'} flex items-center justify-center text-white">
                        <i class="fa-solid fa-layer-group"></i>
                   </div>
                   <span>Brand</span>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8 text-sm font-medium opacity-80">
                        <a href="#" class="hover:opacity-100 transition-opacity">Home</a>
                        <a href="#" class="hover:opacity-100 transition-opacity">Features</a>
                        <a href="#" class="hover:opacity-100 transition-opacity">About</a>
                        <a href="#" class="hover:opacity-100 transition-opacity">Contact</a>
                    </div>
                </div>
                <div>
                   <button class="${theme.primary} text-white px-5 py-2 rounded-full text-sm font-medium transition-transform active:scale-95 shadow-lg shadow-black/5">
                    Get Started
                   </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 fade-in-up backdrop-blur-md">
                <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Coming Soon
            </div>

            <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-8 fade-in-up delay-100 leading-tight">
                Build your dream <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient || 'from-blue-400 to-purple-600'}">without limits.</span>
            </h1>
            
            <p class="mt-6 text-xl opacity-70 max-w-3xl mx-auto fade-in-up delay-200 leading-relaxed">
                ${prompt}
            </p>

            <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-300">
                <button class="${theme.primary} text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-xl">
                    <i class="fa-solid fa-rocket"></i> Start Building
                </button>
                <button class="${theme.secondary} px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition-all hover:bg-opacity-80 backdrop-blur-sm border border-white/10">
                    <i class="fa-solid fa-play"></i> Watch Demo
                </button>
            </div>

             <!-- Floating Stats -->
            <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto fade-in-up delay-300">
                <div class="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-transform hover:-translate-y-1">
                    <div class="text-3xl font-bold ${theme.iconColor}">99%</div>
                    <div class="text-sm opacity-60">Customer Satisfaction</div>
                </div>
                 <div class="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-transform hover:-translate-y-1">
                    <div class="text-3xl font-bold ${theme.iconColor}">24/7</div>
                    <div class="text-sm opacity-60">Expert Support</div>
                </div>
                 <div class="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-transform hover:-translate-y-1">
                    <div class="text-3xl font-bold ${theme.iconColor}">10k+</div>
                    <div class="text-sm opacity-60">Active Users</div>
                </div>
            </div>
        </div>
        
        <!-- Background Decor -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-50">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]"></div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]"></div>
        </div>
    </div>

    <!-- Features Section Mockup -->
    <div class="py-24 border-t border-white/10 bg-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">Why choose us?</h2>
                <p class="text-lg opacity-60">Everything you need to succeed.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="p-8 rounded-2xl ${theme.bg === 'bg-white' ? 'bg-gray-50' : 'bg-white/5'} border border-white/10">
                    <div class="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center ${theme.iconColor} mb-6 text-xl">
                        <i class="fa-solid fa-bolt"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Lightning Fast</h3>
                    <p class="opacity-60">Optimized for speed and performance across all devices.</p>
                </div>
                <div class="p-8 rounded-2xl ${theme.bg === 'bg-white' ? 'bg-gray-50' : 'bg-white/5'} border border-white/10">
                    <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center ${theme.iconColor} mb-6 text-xl">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Secure by Design</h3>
                    <p class="opacity-60">Enterprise-grade security to keep your data safe.</p>
                </div>
                <div class="p-8 rounded-2xl ${theme.bg === 'bg-white' ? 'bg-gray-50' : 'bg-white/5'} border border-white/10">
                    <div class="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center ${theme.iconColor} mb-6 text-xl">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">AI Powered</h3>
                    <p class="opacity-60">Intelligent features that adapt to your needs.</p>
                </div>
            </div>
        </div>
    </div>

</body>
</html>`;

        // Inject content into iframe
        iframe.srcdoc = htmlContent;
        
        // Inject content into code area
        codeArea.value = htmlContent;
        
        // Show Preview
        previewContainer.classList.remove('hidden');

        // Scroll to preview on mobile
        if (window.innerWidth < 768) {
            previewContainer.scrollIntoView({ behavior: 'smooth' });
        }

    }, 2000);
}

function switchView(view) {
    const iframe = document.getElementById('previewFrame');
    const codeView = document.getElementById('codeView');
    const bnts = document.querySelectorAll('.view-btn');
    
    bnts.forEach(btn => btn.classList.remove('active'));

    if (view === 'preview') {
        iframe.classList.remove('hidden');
        codeView.classList.add('hidden');
        bnts[0].classList.add('active');
    } else {
        iframe.classList.add('hidden');
        codeView.classList.remove('hidden');
        bnts[1].classList.add('active');
    }
}

// Allow Enter key to submit
document.getElementById('userPrompt').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateWebsite();
    }
});
