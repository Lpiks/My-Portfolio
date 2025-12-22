import { FaLaptopCode, FaMobileAlt, FaDraftingCompass } from 'react-icons/fa';

export const services = [
    {
        id: "custom-web-apps",
        title: "Custom Web Apps",
        subtitle: "High-performance, scalable solutions built for the future.",
        description: "Scalable, data-driven applications built with the MERN stack. I focus on performance, security, and intuitive user experiences.",
        tech: "React, Node.js, MongoDB",
        icon: FaLaptopCode,
        span: "col-span-1 md:col-span-2",
        gradient: "from-purple-900/20 to-blue-900/20",
        roadmap: [
            { title: "Architecture Design", desc: "Planning scalable DB schemas and API endpoints." },
            { title: "Frontend Development", desc: "Building responsive, interactive UI with React." },
            { title: "API Integration", desc: "Connecting secure REST/GraphQL APIs." },
            { title: "Performance Tuning", desc: "Caching, code-splitting, and SEO optimization." }
        ],
        features: [
            "Advanced Authentication (JWT/OAuth)",
            "Real-time Data Updates (Socket.io)",
            "Complex Dashboard Analytics",
            "Payment Gateway Integration",
            "Role-Based Access Control",
            "Automated Testing & CI/CD"
        ]
    },
    {
        id: "cross-platform-mobile",
        title: "Cross-Platform Mobile",
        subtitle: "One codebase, two powerful native experiences.",
        description: "Seamless mobile experiences for iOS and Android using React Native power.",
        tech: "React Native, Expo",
        icon: FaMobileAlt,
        span: "col-span-1",
        gradient: "from-emerald-900/20 to-teal-900/20",
        roadmap: [
            { title: "UX/UI Prototyping", desc: "Mobile-first wireframes and gestures." },
            { title: "Native Development", desc: "Building with React Native & Expo." },
            { title: "Device Testing", desc: "Testing on real iOS and Android devices." },
            { title: "Store Deployment", desc: "Submission to App Store & Google Play." }
        ],
        features: [
            "Offline Functionality",
            "Push Notifications",
            "Native Camera & GPS Access",
            "Biometric Authentication",
            "Smooth 60fps Animations",
            "App Store Optimization"
        ]
    },
    {
        id: "cms-wordpress",
        title: "CMS & WordPress",
        subtitle: "Empower your team with full content control.",
        description: "Flexible, client-managed solutions with custom themes and plugins.",
        tech: "WordPress, PHP, Headless CMS",
        icon: FaDraftingCompass,
        span: "col-span-1 md:col-span-3",
        gradient: "from-orange-900/20 to-red-900/20",
        roadmap: [
            { title: "Theme Strategy", desc: "Determining functionality vs aesthetics." },
            { title: "Custom Development", desc: "PHP theme or Headless React setup." },
            { title: "Content Migration", desc: "Importing existing data seamlessly." },
            { title: "Client Training", desc: "Hand-off documentation and tutorials." }
        ],
        features: [
            "Custom Post Types & Fields",
            "Headless API Architecture",
            "Super-fast Page Speed",
            "SEO-first Structure",
            "E-commerce (WooCommerce)",
            "Multi-language Support"
        ]
    }
];
