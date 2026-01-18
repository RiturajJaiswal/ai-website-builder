function handleLogin() {
    const username = document.getElementById('usernameInput').value.trim();
    if (!username) return;
    
    // Hide login, show app
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    
    loginScreen.style.opacity = '0';
    setTimeout(() => {
        loginScreen.style.display = 'none';
        mainApp.classList.remove('hidden');
    }, 500);
}

// Check for Enter key on login
document.getElementById('usernameInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleLogin();
});

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
            accentGradient: "from-blue-400 to-purple-600",
            heroImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        };

        if (safePrompt.includes("dark")) {
            theme.bg = "bg-slate-900";
            theme.text = "text-white";
            theme.primary = "bg-indigo-600 hover:bg-indigo-700";
            theme.secondary = "bg-white/10 hover:bg-white/20 text-white";
            theme.iconColor = "text-indigo-400";
            theme.accentGradient = "from-indigo-400 to-cyan-400";
        } else if (safePrompt.includes("coffee") || safePrompt.includes("cafe")) {
            theme.bg = "bg-[#1c1917]";
            theme.text = "text-[#e7e5e4]";
            theme.primary = "bg-[#d97706] hover:bg-[#b45309]";
            theme.secondary = "bg-[#292524] hover:bg-[#44403c] text-[#d6d3d1]";
            theme.iconColor = "text-orange-500";
            theme.accentGradient = "from-orange-400 to-amber-600";
            theme.heroImage = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";
        } else if (safePrompt.includes("nature") || safePrompt.includes("green") || safePrompt.includes("species") || safePrompt.includes("animal")) {
            theme.bg = "bg-emerald-950";
            theme.text = "text-emerald-50";
            theme.primary = "bg-emerald-500 hover:bg-emerald-600";
            theme.secondary = "bg-emerald-900/50 hover:bg-emerald-900/70 text-emerald-100";
            theme.iconColor = "text-emerald-400";
            theme.accentGradient = "from-emerald-400 to-teal-500";
            theme.heroImage = "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";
        } else if (safePrompt.includes("future") || safePrompt.includes("tech") || safePrompt.includes("cyber")) {
            theme.bg = "bg-black";
            theme.text = "text-white";
            theme.primary = "bg-fuchsia-600 hover:bg-fuchsia-700";
            theme.secondary = "bg-gray-900 border border-gray-800 hover:bg-gray-800";
            theme.iconColor = "text-fuchsia-500";
            theme.accentGradient = "from-fuchsia-500 to-cyan-500";
             theme.heroImage = "https://images.unsplash.com/photo-1535378437327-b7107a770652?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";
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
        .glass-nav { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.1); }
        ${safePrompt.includes("future") ? ".cyber-grid { background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 50px 50px; }" : ""}
    </style>
</head>
<body class="${theme.bg} ${theme.text} antialiased selection:bg-blue-500 selection:text-white ${safePrompt.includes("future") ? "cyber-grid" : ""}">
    
    <!-- Navbar -->
    <nav class="fixed w-full z-50 glass-nav transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex items-center gap-2 font-bold text-2xl tracking-tight">
                   <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white shadow-lg">
                        <i class="fa-solid fa-bolt"></i>
                   </div>
                   <span class="bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient} font-extrabold">Nexus</span>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-10 text-sm font-semibold">
                        <a href="#" class="hover:text-blue-500 transition-colors">Home</a>
                        <a href="#" class="hover:text-blue-500 transition-colors">Services</a>
                        <a href="#" class="hover:text-blue-500 transition-colors">About</a>
                        <a href="#" class="hover:text-blue-500 transition-colors">Contact</a>
                    </div>
                </div>
                <div>
                   <button class="${theme.primary} text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                    Get Started
                   </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <!-- Background Image overlay -->
        <div class="absolute inset-0 z-0">
            <img src="${theme.heroImage}" class="w-full h-full object-cover opacity-20" alt="Background">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-${theme.bg.replace("bg-", "")}"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="text-left">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 fade-in-up backdrop-blur-md">
                        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        AI-Powered Platform
                    </div>

                    <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-8 fade-in-up delay-100 leading-[1.1]">
                        <span class="block">Imagine.</span>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}">Create. Inspire.</span>
                    </h1>
                    
                    <p class="mt-6 text-xl opacity-80 max-w-lg fade-in-up delay-200 leading-relaxed">
                        ${prompt}
                    </p>

                    <div class="mt-10 flex flex-col sm:flex-row gap-4 fade-in-up delay-300">
                        <button class="${theme.primary} text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl">
                            Start Journey <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <button class="${theme.secondary} px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 backdrop-blur-md border border-white/10">
                            View Demo
                        </button>
                    </div>
                </div>

                <!-- Abstract Visual -->
                <div class="relative fade-in-up delay-300 hidden lg:block">
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r ${theme.accentGradient} rounded-full blur-[100px] opacity-30 animate-pulse"></div>
                    <div class="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br ${theme.accentGradient}"></div>
                            <div>
                                <div class="h-4 w-32 bg-white/20 rounded mb-2"></div>
                                <div class="h-3 w-20 bg-white/10 rounded"></div>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="h-32 w-full bg-white/5 rounded-xl border border-white/5"></div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="h-20 bg-white/5 rounded-xl"></div>
                                <div class="h-20 bg-white/5 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Stats Section -->
    <div class="relative py-20 border-t border-white/5 bg-white/5 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient}">100+</div>
                    <div class="text-sm font-medium opacity-60 mt-2">Projects Launched</div>
                </div>
                <div>
                   <div class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient}">50k</div>
                    <div class="text-sm font-medium opacity-60 mt-2">Community Members</div>
                </div>
                 <div>
                    <div class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient}">99.9%</div>
                    <div class="text-sm font-medium opacity-60 mt-2">Uptime Guarantee</div>
                </div>
                 <div>
                    <div class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient}">24/7</div>
                    <div class="text-sm font-medium opacity-60 mt-2">Global Support</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Features Grid -->
    <div class="py-24 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold mb-6">Built for the <span class="text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}">Future</span></h2>
                <p class="text-xl opacity-60 max-w-2xl mx-auto">Experience the next generation of digital solutions, tailored to your unique vision.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="group p-8 rounded-3xl ${theme.bg === 'bg-white' ? 'bg-gray-50' : 'bg-white/5'} border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white text-2xl mb-6 shadow-lg">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Intelligent Core</h3>
                    <p class="opacity-70 leading-relaxed">Powered by advanced algorithms that understand your needs before you even speak them.</p>
                </div>

                <!-- Feature 2 -->
                 <div class="group p-8 rounded-3xl ${theme.bg === 'bg-white' ? 'bg-gray-50' : 'bg-white/5'} border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white text-2xl mb-6 shadow-lg">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Unbreakable Security</h3>
                    <p class="opacity-70 leading-relaxed">Enterprise-grade encryption and privacy protocols protecting your data at every layer.</p>
                </div>

                <!-- Feature 3 -->
                 <div class="group p-8 rounded-3xl ${theme.bg === 'bg-white' ? 'bg-gray-50' : 'bg-white/5'} border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white text-2xl mb-6 shadow-lg">
                        <i class="fa-solid fa-globe"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Global Scale</h3>
                    <p class="opacity-70 leading-relaxed">Deploy instantly to edge networks worldwide for lightning-fast access anywhere.</p>
                </div>
            </div>
        </div>
    </div>
    
    <footer class="py-12 border-t border-white/10 text-center opacity-60 text-sm">
        <p>&copy; 2024 Generated with Aether AI. All rights reserved.</p>
    </footer>

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
