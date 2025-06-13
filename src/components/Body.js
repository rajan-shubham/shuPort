import React, { useState, useEffect, useRef } from 'react';
import profile from '../assets/shuProfile.jpeg';

const Body = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const [showForm, setShowForm] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const sectionRefs = {
        about: useRef(null),
        skill: useRef(null),
        project: useRef(null),
        contact: useRef(null)
    };

    // Function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        
        // Create the URL for form submission
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdnQdYsykRFTf8D6nGt5T7L4O8A4NeoAKXGcDCmCTYhMVLwyg/formResponse';
        
        // Create an iframe to submit the form (to avoid CORS issues)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Create a form inside the iframe
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const iframeForm = iframeDocument.createElement('form');
        iframeForm.method = 'POST';
        iframeForm.action = formUrl;
        
        // Add form data to the iframe form
        for (let pair of formData.entries()) {
            const input = iframeDocument.createElement('input');
            input.type = 'hidden';
            input.name = pair[0];
            input.value = pair[1];
            iframeForm.appendChild(input);
        }
        
        iframeDocument.body.appendChild(iframeForm);
        
        // Submit the form
        iframeForm.submit();
        
        // Show success message
        setFormSubmitted(true);
        setShowForm(false);
        
        // Reset form
        e.target.reset();
        
        // Show form again after 5 seconds
        setTimeout(() => {
            setShowForm(true);
            setFormSubmitted(false);
            // Remove the iframe
            document.body.removeChild(iframe);
        }, 5000);
    };

    // Animation on load
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Scroll to section function
    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        sectionRefs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Intersection Observer to detect which section is in view
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    setActiveSection(sectionId);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Observe all sections
        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    // Skill progress animation
    const skills = [
        { name: "React/Next.js", level: 80 },
        { name: "JavaScript", level: 80 },
        { name: "Java", level: 85 },
        { name: "Node.js", level: 75 },
        { name: "Python", level: 65 },
        { name: "Tailwind CSS", level: 80 }
    ];

    // Project data
    const featuredProjects = [
        {
            title: "Rajasthan Civil Services",
            description: "Educational platform for civil services aspirants",
            url: "https://crackras.com",
            gradient: "from-blue-500 to-purple-600",
            tags: ["Next.js", "Node.js", "MongoDB"]
        },
        {
            title: "Clienzon IT Solutions",
            description: "IT services and solutions company website",
            url: "https://clienzon.com",
            gradient: "from-green-500 to-teal-600",
            tags: ["Next.js", "Tailwind", "Firebase"]
        },
        {
            title: "Developer Meet",
            description: "A Tech Community Social Media (just like Tinder)",
            url: "http://13.51.158.208/",
            gradient: "from-yellow-500 to-red-600",
            tags: ["React.js", "AWS", "Express", "MongoDB"]
        }
    ];

    return (
        <div className="pt-16 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 font-mono text-white p-6">
            {/* Fixed navigation dots */}
            <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
                <div className="flex flex-col gap-4">
                    {Object.keys(sectionRefs).map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                activeSection === section 
                                    ? 'bg-yellow-400 scale-125' 
                                    : 'bg-gray-500 hover:bg-gray-400'
                            }`}
                            aria-label={`Scroll to ${section} section`}
                        />
                    ))}
                </div>
            </div>

            {/* Profile Section */}
            <div 
                ref={sectionRefs.about}
                id='about' 
                className={`max-w-6xl mx-auto flex flex-wrap items-center justify-center p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm shadow-xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="w-full md:w-1/3 flex justify-center">
                    {/* Replace with your actual image path or use a placeholder */}
                    <div className="rounded-full shadow-lg bg-slate-800/50 w-48 h-48 md:w-64 md:h-64  flex items-center justify-center hover:scale-105 transition-transform duration-300">
                            <img src={profile} alt="Shubham Kumar" className=" w-48 h-48 md:w-64 md:h-64      rounded-full" />
                    </div>
                </div>
                <div className="w-full md:w-2/3 p-4 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">Shubham Kumar</h1>
                    <p className="mt-4 text-lg leading-relaxed text-gray-300">
                        I am a Passionate Frontend Developer, currently focused on learning Backend Development and AI/ML.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                        <button 
                            onClick={() => scrollToSection('contact')}
                            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full transition-all hover:shadow-lg hover:shadow-yellow-500/20"
                        >
                            Contact Me
                        </button>
                        <button 
                            onClick={() => scrollToSection('project')}
                            className="px-6 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 rounded-full transition-all hover:shadow-lg hover:shadow-yellow-500/10"
                        >
                            View Projects
                        </button>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div 
                ref={sectionRefs.skill}
                id='skill' 
                className={`max-w-6xl mx-auto mt-16 p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm shadow-xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mb-6">My Skills</h3>
                
                {/* Skill bars */}
                <div className="mb-10">
                    {skills.map((skill, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-yellow-400">{skill.name}</span>
                                <span className="text-gray-400">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2.5">
                                <div 
                                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${isLoaded ? skill.level : 0}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
                        <h4 className="text-xl text-yellow-400 mb-3 group-hover:translate-x-1 transition-transform">Frontend Dev</h4>
                        <p className="text-gray-300">React/Next.js, JavaScript, TypeScript, Tailwind CSS</p>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all hover:shadow-lg hover:shadow-purple-500/10 group">
                        <h4 className="text-xl text-yellow-400 mb-3 group-hover:translate-x-1 transition-transform">AI/ML</h4>
                        <p className="text-gray-300">Numpy, Pandas, Matplotlib, networkx, PyTorch, Graphein</p>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all hover:shadow-lg hover:shadow-green-500/10 group">
                        <h4 className="text-xl text-yellow-400 mb-3 group-hover:translate-x-1 transition-transform">Database</h4>
                        <p className="text-gray-300">MongoDB, MySQL, Firebase</p>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all hover:shadow-lg hover:shadow-red-500/10 group">
                        <h4 className="text-xl text-yellow-400 mb-3 group-hover:translate-x-1 transition-transform">Backend Dev</h4>
                        <p className="text-gray-300">Express.js, Node.js, SpringBoot</p>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all hover:shadow-lg hover:shadow-yellow-500/10 group">
                        <h4 className="text-xl text-yellow-400 mb-3 group-hover:translate-x-1 transition-transform">Languages</h4>
                        <p className="text-gray-300">C, JAVA, Python, OCaml</p>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all hover:shadow-lg hover:shadow-cyan-500/10 group">
                        <h4 className="text-xl text-yellow-400 mb-3 group-hover:translate-x-1 transition-transform">DevOps</h4>
                        <p className="text-gray-300">Docker, AWS, Nginx, pm2, Google Cloud, Linux, Git</p>
                    </div>
                </div>
            </div>

            {/* Projects Section */}
            <div 
                ref={sectionRefs.project}
                id='project' 
                className={`max-w-6xl mx-auto mt-16 p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm shadow-xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mb-6">Featured Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project, index) => (
                        <a 
                            key={index}
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block p-5 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all group hover:-translate-y-2 duration-300 hover:shadow-lg"
                        >
                            <div className="h-40 bg-slate-600 rounded-lg mb-4 overflow-hidden">
                                <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                    <span className="text-white font-bold">{project.title}</span>
                                </div>
                            </div>
                            <h4 className="text-xl text-yellow-400 group-hover:text-yellow-300 transition-colors">{project.title}</h4>
                            <p className="text-gray-300 mt-2 text-sm">{project.description}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="text-xs bg-slate-800 px-2 py-1 rounded-full text-gray-300">{tag}</span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
                
                <div className="mt-8">
                    <h4 className="text-xl text-yellow-400 mb-4">More Projects</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="space-y-2">
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://gdsc-ticket.vercel.app/' target="_blank" rel="noopener noreferrer">GDG Ticket</a></li>
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://yummy-way-silk.vercel.app/' target="_blank" rel="noopener noreferrer">Swiggi <span className="text-xs">(enable your CORS extension)</span></a></li>
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://perfin-puce.vercel.app/' target="_blank" rel="noopener noreferrer">Personal Finance Management</a></li>
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://the-mauryans.vercel.app/' target="_blank" rel="noopener noreferrer">Mauryans Search Engine</a></li>
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://kley-finance-management.vercel.app/' target="_blank" rel="noopener noreferrer">Kley - Finance Management Dashboard</a></li>
                        </ul>
                        <ul className="space-y-2">
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://gdg-makaut-timeline.vercel.app/' target="_blank" rel="noopener noreferrer">GDG Makaut Timeline</a></li>
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://pig-dice-game-one.vercel.app/' target="_blank" rel="noopener noreferrer">Pig-Dice-Game</a></li>
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://tacos-shop-website.vercel.app/' target="_blank" rel="noopener noreferrer">Little Tacos Shop</a></li>
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://netflix-replica-hazel.vercel.app/' target="_blank" rel="noopener noreferrer">Netflix Replica</a></li>
                            <li><a className="block p-3 rounded-lg hover:bg-slate-700/70 transition-all text-sky-400 hover:text-sky-300 hover:translate-x-1 duration-200" href='https://github.com/rajan-shubham/python-AI_ML-projects' target="_blank" rel="noopener noreferrer">AI/ML Projects</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div 
                ref={sectionRefs.contact}
                id='contact' 
                className={`max-w-6xl mx-auto mt-16 p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm shadow-xl transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mb-6 text-center">Get In Touch</h3>
                
                {/* Contact form */}
                <div className="max-w-2xl mx-auto">
                    {showForm ? (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="entry.11793676" className="block text-sm font-medium text-gray-300">Name</label>
                                <input 
                                    type="text" 
                                    id="entry.11793676" 
                                    name="entry.11793676" 
                                    className="mt-1 block w-full border-b rounded-md bg-slate-800/50 text-white shadow-sm focus:border-yellow-500 focus:ring-yellow-500" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="entry.1415229216" className="block text-sm font-medium text-gray-300">Email</label>
                                <input 
                                    type="email" 
                                    id="entry.1415229216" 
                                    name="entry.1415229216"
                                    className="mt-1 block w-full rounded-md border-b bg-slate-800/50 text-white shadow-sm focus:border-yellow-500 focus:ring-yellow-500" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="entry.388319101" className="block text-sm font-medium text-gray-300">Message</label>
                                <textarea 
                                    id="entry.388319101" 
                                    name="entry.388319101"
                                    rows="4" 
                                    className="mt-1 block w-full rounded-md border-b bg-slate-800/50 text-white shadow-sm focus:border-yellow-500 focus:ring-yellow-500" 
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-center">
                                <button 
                                    type="submit" 
                                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full transition-all hover:shadow-lg hover:shadow-yellow-500/20"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="p-6 bg-green-500/20 border border-green-500 rounded-md text-center">
                            <p className="text-green-400 text-lg font-medium">Thank you for your message!</p>
                            <p className="text-green-300 mt-2">I'll get back to you as soon as possible.</p>
                        </div>
                    )}
                    
                    <div className="w-full p-4 mt-12">
                        <ul className="flex justify-center space-x-6">
                            <li><a className="hover:text-yellow-400" href="https://twitter.com/ShubhamRajanku1" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a className="hover:text-yellow-400" href="https://www.linkedin.com/in/shubham-kumar-617760258" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a className="hover:text-yellow-400" href="https://github.com/rajan-shubham" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Body;
