import React from 'react';
import profilePic from '../assets/shuProfile.jpeg';

const Body = () => {
    return (
        <div className="h-auto w-auto bg-slate-900 font-mono text-white p-6">
            {/* Profile Section */}
            <div id='about' className="flex flex-wrap items-center justify-center p-4">
                <div className="w-full md:w-1/3 flex justify-center">
                    <img src={profilePic} alt="Profile" className="rounded-xl shadow-lg border-4 border-yellow-400 w-48 h-48 md:w-64 md:h-64 object-cover"/>
                </div>
                <div className="w-full md:w-2/3 p-4 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">Shubham Kumar</h1>
                    <p className="mt-4 text-lg leading-relaxed">I am a Passionate Frontend Developer, currently focused on learning Backend Development. My journey in tech started during my early college years, and I've worked with Artificial Intelligence to enhance app performance.</p>
                </div>
            </div>

            {/* Projects Section */}
            <div id='project' className="flex flex-wrap mt-12">
                <div className="w-full md:w-1/2 p-4">
                    <h3 className="text-2xl text-yellow-400 mb-4">My Projects</h3>
                    <ul className="space-y-2">
                        <li><a className="hover:underline text-sky-400" href='https://github.com/rajan-shubham/React'>Swiggi Replica</a></li>
                        <li><a className="hover:underline text-sky-400" href='https://kley-finance-management.vercel.app/'>Kley - Finance Management Dashboard</a></li>
                        <li><a className="hover:underline text-sky-400" href='https://pig-dice-game-one.vercel.app/'>Pig-Dice-Game</a></li>
                        <li><a className="hover:underline text-sky-400" href='https://tacos-shop-website.vercel.app/'>Little Tacos Shop</a></li>
                        <li><a className="hover:underline text-sky-400" href='https://netflix-replica-hazel.vercel.app/'>Netflix Replica</a></li>
                        <li><a className="hover:underline text-sky-400" href='https://github.com/rajan-shubham/python-AI_ML-projects'>AI/ML Projects</a></li>
                    </ul>
                </div>

                {/* Skills Section */}
                <div id='skill' className="w-full md:w-1/2 p-4">
                    <h3 className="text-2xl text-yellow-400 mb-4">My Skills</h3>
                    <ul className="space-y-2">
                        <li><strong>Frontend Dev:</strong> JavaScript, TypeScript, Tailwind CSS, HTML & CSS</li>
                        <li><strong>Framework:</strong> React.js, Next.js</li>
                        <li><strong>Database:</strong> MongoDB</li>
                        <li><strong>Backend Dev:</strong> Express.js, Node.js, Firebase</li>
                        <li><strong>Languages:</strong> C, JAVA, Python, OCaml</li>
                        <li><strong>DevOps:</strong> Bash, Google Cloud, Linux, Git</li>
                    </ul>
                </div>
            </div>

            {/* Contact Section */}
            <div id='contact' className="w-full p-4 mt-12">
                <h3 className="text-2xl text-yellow-400 mb-4 text-center">Contact Me</h3>
                <ul className="flex justify-center space-x-6">
                    <li><a className="hover:text-yellow-400" href="https://twitter.com/ShubhamRajanku1">Twitter</a></li>
                    <li><a className="hover:text-yellow-400" href="https://www.linkedin.com/in/shubham-kumar-617760258">LinkedIn</a></li>
                    <li><a className="hover:text-yellow-400" href="https://github.com/rajan-shubham">GitHub</a></li>
                </ul>
            </div>
        </div>
    )
};

export default Body;
