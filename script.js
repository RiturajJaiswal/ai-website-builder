// Application State
let currentUser = localStorage.getItem('aether_user') || null;
let currentView = 'preview';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (currentUser) {
        showMainApp(currentUser);
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) {
            loginScreen.style.display = 'none';
        }
    }

    // Initialize Icons
    if (window.lucide) lucide.createIcons();
});

function handleLogin() {
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();
    if (!username) return;

    // Save User
    currentUser = username;
    localStorage.setItem('aether_user', username);

    // Transition
    const loginScreen = document.getElementById('loginScreen');
    loginScreen.style.opacity = '0';

    setTimeout(() => {
        loginScreen.style.display = 'none';
        showMainApp(username);
    }, 500);
}

function showMainApp(username) {
    const mainApp = document.getElementById('mainApp');
    mainApp.classList.remove('hidden');

    // Update Greeting
    const nameDisplay = document.getElementById('userNameDisplay');
    const avatar = document.getElementById('userAvatar');

    if (nameDisplay) nameDisplay.textContent = username;
    if (avatar) avatar.textContent = username.charAt(0).toUpperCase();
}

// Check for Enter key on login
const usernameInput = document.getElementById('usernameInput');
if (usernameInput) {
    usernameInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') handleLogin();
    });
}

async function generateWebsite() {
    const promptInput = document.getElementById('userPrompt');
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    // UI Elements
    const btn = document.getElementById('generateBtn');
    const btnText = document.getElementById('btnText');
    const previewContainer = document.getElementById('previewContainer');
    const iframe = document.getElementById('previewFrame');
    const codeArea = document.getElementById('codeArea');

    // Loading State
    btn.disabled = true;
    const originalText = btnText.textContent;
    btnText.textContent = "Dreaming...";

    // Show Preview Container immediately to indicate activity
    previewContainer.classList.remove('hidden');
    if (window.innerWidth < 768) {
        previewContainer.scrollIntoView({ behavior: 'smooth' });
    }

    try {
        let htmlContent = '';

        // --- NEW NETLIFY FUNCTION PATH ---
        // We try the serverless function first. If it fails (e.g. running locally without netlify dev),
        // we fall back to the simulation.
        try {
            const response = await fetch('/.netlify/functions/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt })
            });

            const data = await response.json();

            // If the server returns an error (like missing key), throw to go to catch block
            if (data.error) throw new Error(data.error.message);
            if (!data.choices) throw new Error("No choices returned from API");

            htmlContent = data.choices[0].message.content;

            // Cleanup potentially returned markdown
            htmlContent = htmlContent.replace(/```html/g, '').replace(/```/g, '');

        } catch (apiError) {
            console.warn("Backend API failed, falling back to simulation:", apiError);
            alert(`Backend API issue: ${apiError.message}. Switching to simulation mode.`);
            // Fallback to simulation
            await new Promise(resolve => setTimeout(resolve, 1000));
            htmlContent = generateSimulationTemplate(prompt);
        }

        /* 
           REMOVED: Old client-side API key logic. 
           Security is now handled by Netlify Functions.
        */

        // Update UI
        iframe.srcdoc = htmlContent;
        codeArea.value = htmlContent;

        // Ensure correct view is visible
        switchView(currentView);

    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred. Please try again.');
    } finally {
        // Reset Button
        btn.disabled = false;
        btnText.textContent = originalText;
    }
}

function generateFeatures(prompt) {
    // Generate topic-specific features
    if (prompt.includes("coffee") || prompt.includes("cafe")) {
        return [
            { icon: "fa-mug-hot", title: "Premium Beans", desc: "Ethically sourced coffee beans from the world's finest regions, roasted to perfection daily." },
            { icon: "fa-leaf", title: "Sustainable Practices", desc: "Committed to environmental responsibility with eco-friendly packaging and fair trade partnerships." },
            { icon: "fa-heart", title: "Community Hub", desc: "A welcoming space where connections are made over exceptional coffee and warm hospitality." }
        ];
    } else if (prompt.includes("tech") || prompt.includes("software") || prompt.includes("app")) {
        return [
            { icon: "fa-rocket", title: "Rapid Development", desc: "Agile methodologies and modern frameworks deliver your product faster without compromising quality." },
            { icon: "fa-shield-halved", title: "Enterprise Security", desc: "Bank-level encryption and compliance standards protect your data and user privacy." },
            { icon: "fa-chart-line", title: "Scalable Solutions", desc: "Cloud-native architecture that grows with your business, handling millions of users effortlessly." }
        ];
    } else if (prompt.includes("restaurant") || prompt.includes("food")) {
        return [
            { icon: "fa-utensils", title: "Chef's Specialties", desc: "Signature dishes crafted by award-winning chefs using seasonal, locally-sourced ingredients." },
            { icon: "fa-wine-glass", title: "Curated Selection", desc: "An extensive wine list and craft cocktails perfectly paired with every menu item." },
            { icon: "fa-clock", title: "Reservations Made Easy", desc: "Book your table instantly online or call us for special occasions and private events." }
        ];
    } else if (prompt.includes("fitness") || prompt.includes("gym")) {
        return [
            { icon: "fa-dumbbell", title: "Expert Trainers", desc: "Certified professionals create personalized workout plans tailored to your goals and fitness level." },
            { icon: "fa-people-group", title: "Group Classes", desc: "Energizing sessions from yoga to HIIT, designed to motivate and challenge every fitness level." },
            { icon: "fa-trophy", title: "Track Progress", desc: "Advanced metrics and regular assessments keep you motivated and on track to achieve your goals." }
        ];
    } else if (prompt.includes("nature") || prompt.includes("green") || prompt.includes("eco")) {
        return [
            { icon: "fa-seedling", title: "Conservation Efforts", desc: "Active programs protecting endangered species and preserving critical habitats worldwide." },
            { icon: "fa-recycle", title: "Zero Waste Initiative", desc: "Comprehensive recycling and composting programs reducing our environmental footprint to zero." },
            { icon: "fa-users", title: "Community Action", desc: "Join thousands of volunteers making a tangible difference through local and global projects." }
        ];
    } else {
        return [
            { icon: "fa-wand-magic-sparkles", title: "Intelligent Core", desc: "Powered by advanced algorithms that understand your needs before you even speak them." },
            { icon: "fa-shield-halved", title: "Unbreakable Security", desc: "Enterprise-grade encryption and privacy protocols protecting your data at every layer." },
            { icon: "fa-globe", title: "Global Scale", desc: "Deploy instantly to edge networks worldwide for lightning-fast access anywhere." }
        ];
    }
}

function generateDescription(prompt) {
    // Generate relevant descriptions based on keywords
    if (prompt.includes("coffee") || prompt.includes("cafe")) {
        return "Experience the perfect blend of artisanal coffee and cozy ambiance. Our carefully sourced beans and expert baristas create moments worth savoring.";
    } else if (prompt.includes("tech") || prompt.includes("software") || prompt.includes("app")) {
        return "Transform your business with cutting-edge technology solutions. We build scalable, innovative software that drives real results.";
    } else if (prompt.includes("portfolio") || prompt.includes("personal")) {
        return "Showcasing creative excellence through stunning design and compelling storytelling. Let's bring your vision to life.";
    } else if (prompt.includes("restaurant") || prompt.includes("food")) {
        return "Savor exceptional cuisine crafted with passion and the finest ingredients. Every dish tells a story of culinary excellence.";
    } else if (prompt.includes("fitness") || prompt.includes("gym")) {
        return "Achieve your fitness goals with expert guidance and state-of-the-art facilities. Your transformation starts here.";
    } else if (prompt.includes("nature") || prompt.includes("green") || prompt.includes("eco")) {
        return "Protecting our planet through sustainable practices and environmental awareness. Join us in making a difference for future generations.";
    } else if (prompt.includes("education") || prompt.includes("learning")) {
        return "Empowering minds through innovative education and personalized learning experiences. Unlock your full potential.";
    } else if (prompt.includes("travel") || prompt.includes("tourism")) {
        return "Discover unforgettable destinations and create memories that last a lifetime. Your next adventure awaits.";
    } else if (prompt.includes("fashion") || prompt.includes("clothing")) {
        return "Elevate your style with curated collections that blend timeless elegance with modern trends. Fashion that speaks to you.";
    } else if (prompt.includes("music") || prompt.includes("audio")) {
        return "Immerse yourself in exceptional sound quality and discover music that moves you. Where passion meets performance.";
    } else {
        return "Discover innovative solutions tailored to your needs. We combine creativity with expertise to deliver exceptional results that exceed expectations.";
    }
}

function generateSimulationTemplate(prompt) {
    const safePrompt = prompt.toLowerCase();

    // Theme Colors with enhanced visuals
    let theme = {
        bg: "bg-gradient-to-br from-slate-50 to-blue-50",
        text: "text-gray-900",
        primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
        secondary: "bg-white/80 backdrop-blur-sm hover:bg-white text-gray-900 border-2 border-blue-200",
        iconColor: "text-blue-500",
        accentGradient: "from-blue-400 via-purple-500 to-pink-500",
        heroImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        cardBg: "bg-white/70 backdrop-blur-md"
    };

    if (safePrompt.includes("dark")) {
        theme.bg = "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900";
        theme.text = "text-white";
        theme.primary = "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700";
        theme.secondary = "bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-indigo-400/30";
        theme.iconColor = "text-indigo-400";
        theme.accentGradient = "from-indigo-400 via-purple-400 to-cyan-400";
        theme.cardBg = "bg-white/5 backdrop-blur-xl";
    } else if (safePrompt.includes("coffee") || safePrompt.includes("cafe")) {
        theme.bg = "bg-gradient-to-br from-amber-900 via-orange-900 to-stone-900";
        theme.text = "text-amber-50";
        theme.primary = "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700";
        theme.secondary = "bg-amber-950/50 backdrop-blur-md hover:bg-amber-950/70 text-amber-100 border-2 border-amber-600/30";
        theme.iconColor = "text-orange-400";
        theme.accentGradient = "from-orange-400 via-amber-500 to-yellow-500";
        theme.heroImage = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";
        theme.cardBg = "bg-amber-950/30 backdrop-blur-xl";
    } else if (safePrompt.includes("nature") || safePrompt.includes("green") || safePrompt.includes("eco")) {
        theme.bg = "bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950";
        theme.text = "text-emerald-50";
        theme.primary = "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600";
        theme.secondary = "bg-emerald-950/50 backdrop-blur-md hover:bg-emerald-950/70 text-emerald-100 border-2 border-emerald-500/30";
        theme.iconColor = "text-emerald-400";
        theme.accentGradient = "from-emerald-400 via-teal-400 to-green-400";
        theme.heroImage = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";
        theme.cardBg = "bg-emerald-950/30 backdrop-blur-xl";
    } else if (safePrompt.includes("tech") || safePrompt.includes("cyber") || safePrompt.includes("software")) {
        theme.bg = "bg-gradient-to-br from-black via-purple-950 to-black";
        theme.text = "text-white";
        theme.primary = "bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-700 hover:to-cyan-700";
        theme.secondary = "bg-gray-900/50 backdrop-blur-md border-2 border-fuchsia-500/30 hover:bg-gray-800/50 text-white";
        theme.iconColor = "text-fuchsia-400";
        theme.accentGradient = "from-fuchsia-500 via-purple-500 to-cyan-500";
        theme.heroImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";
        theme.cardBg = "bg-gray-900/30 backdrop-blur-xl";
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
        
        /* Smooth Animations */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 2s ease-in-out infinite; }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
        
        /* Gradient Animation */
        .gradient-animate {
            background-size: 200% 200%;
            animation: gradientShift 8s ease infinite;
        }
        
        /* Glassmorphism */
        .glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Hover Effects */
        .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        /* Prevent navigation */
        a { cursor: pointer; }
    </style>
</head>
<body class="${theme.bg} ${theme.text} min-h-screen">
    <!-- Animated Background Orbs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br ${theme.accentGradient} rounded-full blur-3xl opacity-20 animate-float"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br ${theme.accentGradient} rounded-full blur-3xl opacity-20 animate-float" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br ${theme.accentGradient} rounded-full blur-3xl opacity-10 animate-float" style="animation-delay: 2s;"></div>
    </div>

    <!-- Navigation -->
    <nav class="fixed w-full z-50 ${theme.cardBg} border-b border-white/10 animate-fadeIn">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex items-center gap-3 font-bold text-2xl tracking-tight">
                   <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white shadow-xl shadow-purple-500/50 animate-pulse-slow">
                        <i class="fa-solid fa-sparkles"></i>
                   </div>
                   <span class="bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient} font-black">Nexus</span>
                </div>
                <div class="hidden md:flex items-center space-x-8 text-sm font-semibold">
                    <a href="#" onclick="return false" class="hover:text-purple-400 transition-colors">Home</a>
                    <a href="#" onclick="return false" class="hover:text-purple-400 transition-colors">Features</a>
                    <a href="#" onclick="return false" class="hover:text-purple-400 transition-colors">About</a>
                    <a href="#" onclick="return false" class="hover:text-purple-400 transition-colors">Contact</a>
                </div>
                <button onclick="return false" class="${theme.primary} text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-xl shadow-purple-500/30">
                    Get Started
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <!-- Hero Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
            <img src="${theme.heroImage}" class="w-full h-full object-cover" alt="Hero Background">
            <div class="absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-90"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <!-- Left Content -->
                <div class="text-left space-y-8">
                    <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${theme.cardBg} border border-white/20 text-sm font-semibold animate-fadeInUp backdrop-blur-md shadow-lg">
                        <span class="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse-slow shadow-lg shadow-green-400/50"></span>
                        AI-Powered Excellence
                    </div>
                    
                    <h1 class="text-6xl md:text-8xl font-black tracking-tight animate-fadeInUp delay-100 leading-[1.1]">
                        <span class="block mb-4">Transform</span>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient} gradient-animate">Your Vision</span>
                    </h1>
                    
                    <p class="text-xl md:text-2xl opacity-90 max-w-lg animate-fadeInUp delay-200 leading-relaxed font-medium">
                        ${generateDescription(safePrompt)}
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-300">
                        <button onclick="return false" class="${theme.primary} text-white px-10 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-2xl shadow-purple-500/50 hover-lift">
                            Start Your Journey
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <button onclick="return false" class="${theme.secondary} px-10 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl hover-lift">
                            <i class="fa-solid fa-play"></i>
                            Watch Demo
                        </button>
                    </div>
                    
                    <!-- Trust Indicators -->
                    <div class="flex items-center gap-8 pt-8 animate-fadeInUp delay-400">
                        <div class="flex -space-x-3">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-4 border-white shadow-lg"></div>
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 border-4 border-white shadow-lg"></div>
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-600 border-4 border-white shadow-lg"></div>
                        </div>
                        <div>
                            <div class="font-bold text-lg">50,000+ Happy Users</div>
                            <div class="text-sm opacity-70">Join our growing community</div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Visual Element -->
                <div class="relative animate-fadeInUp delay-300 hidden lg:block">
                    <div class="absolute inset-0 bg-gradient-to-r ${theme.accentGradient} rounded-3xl blur-3xl opacity-30 animate-pulse-slow"></div>
                    <div class="relative ${theme.cardBg} border border-white/20 rounded-3xl p-10 shadow-2xl hover-lift">
                        <div class="space-y-6">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br ${theme.accentGradient} shadow-xl shadow-purple-500/50 animate-pulse-slow"></div>
                                <div class="flex-1">
                                    <div class="h-4 bg-white/30 rounded-full mb-2 w-3/4"></div>
                                    <div class="h-3 bg-white/20 rounded-full w-1/2"></div>
                                </div>
                            </div>
                            <div class="h-48 bg-gradient-to-br ${theme.accentGradient} rounded-2xl shadow-xl opacity-80"></div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="h-24 bg-white/20 rounded-xl backdrop-blur-sm"></div>
                                <div class="h-24 bg-white/20 rounded-xl backdrop-blur-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Stats Section -->
    <div class="relative py-20 ${theme.cardBg} border-y border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div class="animate-fadeInUp delay-100">
                    <div class="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient} mb-2">500+</div>
                    <div class="text-sm md:text-base font-semibold opacity-70">Projects Delivered</div>
                </div>
                <div class="animate-fadeInUp delay-200">
                    <div class="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient} mb-2">50k</div>
                    <div class="text-sm md:text-base font-semibold opacity-70">Active Users</div>
                </div>
                <div class="animate-fadeInUp delay-300">
                    <div class="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient} mb-2">99.9%</div>
                    <div class="text-sm md:text-base font-semibold opacity-70">Uptime</div>
                </div>
                <div class="animate-fadeInUp delay-400">
                    <div class="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGradient} mb-2">24/7</div>
                    <div class="text-sm md:text-base font-semibold opacity-70">Support</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Features Section -->
    <div class="relative py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20 animate-fadeInUp">
                <h2 class="text-5xl md:text-7xl font-black mb-6">
                    Why Choose <span class="text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}">Us</span>
                </h2>
                <p class="text-xl md:text-2xl opacity-70 max-w-3xl mx-auto font-medium">
                    Experience the perfect blend of innovation, reliability, and excellence
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${generateFeatures(safePrompt).map((feature, index) => `
                <div class="group ${theme.cardBg} border border-white/20 rounded-3xl p-10 hover-lift animate-fadeInUp delay-${(index + 1) * 100}">
                    <div class="w-20 h-20 rounded-2xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white text-3xl mb-8 shadow-2xl shadow-purple-500/50 group-hover:scale-110 transition-transform">
                        <i class="fa-solid ${feature.icon}"></i>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold mb-4">${feature.title}</h3>
                    <p class="opacity-80 leading-relaxed text-lg">${feature.desc}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="relative py-32 ${theme.cardBg} border-y border-white/10">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="animate-fadeInUp">
                <h2 class="text-5xl md:text-7xl font-black mb-8">
                    Ready to <span class="text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}">Get Started?</span>
                </h2>
                <p class="text-xl md:text-2xl opacity-80 mb-12 max-w-2xl mx-auto font-medium">
                    Join thousands of satisfied customers and transform your vision into reality today
                </p>
                <div class="flex flex-col sm:flex-row gap-6 justify-center">
                    <button onclick="return false" class="${theme.primary} text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all hover:scale-105 shadow-2xl shadow-purple-500/50 hover-lift">
                        Start Free Trial
                        <i class="fa-solid fa-arrow-right ml-3"></i>
                    </button>
                    <button onclick="return false" class="${theme.secondary} px-12 py-6 rounded-2xl text-xl font-bold transition-all hover:scale-105 shadow-xl hover-lift">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="relative py-16 border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center opacity-70">
                <p class="text-lg">&copy; 2024 Generated with Aether AI. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

function switchView(view) {
    const iframe = document.getElementById('previewFrame');
    const codeView = document.getElementById('codeView');
    const bnts = document.querySelectorAll('.view-btn');

    // Update state
    currentView = view;

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
const userPrompt = document.getElementById('userPrompt');
if (userPrompt) {
    userPrompt.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateWebsite();
        }
    });
}
