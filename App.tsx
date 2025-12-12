import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InvoiceGenerator } from './components/InvoiceGenerator';
import { TeamMember, Service } from './types';

function App() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Music',
    budget: 'Under ₹50k',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks for reaching out! The HR Crew will get back to you within 24-48 hours.');
    setContactForm({
      name: '', email: '', phone: '', projectType: 'Music', budget: 'Under ₹50k', message: ''
    });
  };

  const services: Service[] = [
    {
      title: "Music Production",
      description: "From demo to master, we handle the full sonic journey.",
      features: ["Professional Recording", "Mixing & Mastering", "Beat Production", "Vocal Tuning"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      title: "Video Production",
      description: "Cinematic visuals that elevate your brand and sound.",
      features: ["Music Videos", "Commercial Promos", "Short Films", "Live Sessions"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Post-Production",
      description: "The magic happens in the edit. We refine until it's perfect.",
      features: ["Video Editing", "Color Grading", "VFX / Motion Graphics", "Sound Design"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: "Equipment Rental",
      description: "Top-tier gear available for your production needs.",
      features: ["Cinema Cameras", "Prime Lenses", "Gimbals & Stabilizers", "Lighting & Grip"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const team: TeamMember[] = [
    { name: "Harsh", role: "Head Audio Engineer", description: "The ear behind the mix. 10+ years in Logic & Pro Tools.", image: "https://picsum.photos/200/200?random=1" },
    { name: "Sarah", role: "Director of Photography", description: "Visual storyteller with a keen eye for lighting.", image: "https://picsum.photos/200/200?random=2" },
    { name: "Mike", role: "Editor & VFX", description: "Turning raw footage into cinematic gold.", image: "https://picsum.photos/200/200?random=3" },
    { name: "Leo", role: "Production Manager", description: "Keeps the crew moving and the projects on time.", image: "https://picsum.photos/200/200?random=4" }
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black"></div>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 animate-pulse">
            HR CREW PRODUCTIONS
          </h1>
          <p className="text-xl md:text-3xl text-slate-300 font-light mb-4">
            Music & Video Production Crew
          </p>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            We are not freelancers. We are a unified creative team dedicated to bringing your artistic vision to life through sound and cinema.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => document.getElementById('invoice-tool')?.scrollIntoView({ behavior: 'smooth'})} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/30">
              Get a Quote
            </button>
            <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth'})} className="px-8 py-4 bg-transparent border border-slate-500 hover:border-white text-slate-300 hover:text-white rounded-full font-bold transition-all">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img src="https://picsum.photos/800/600?grayscale" alt="Studio" className="rounded-2xl shadow-2xl opacity-80 hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-indigo-500 font-bold tracking-widest uppercase mb-2">Who We Are</h2>
              <h3 className="text-4xl font-bold text-white mb-6">More Than Just a Studio.</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                HR Crew Productions started in a garage with a simple idea: creative work is better together. We realized that artists struggle when they have to hire a separate audio engineer, a separate videographer, and a separate editor who don't talk to each other.
              </p>
              <p className="text-slate-400 leading-relaxed">
                We bridge that gap. We are a cohesive unit that handles your project from the first beat to the final cut. Whether you are an emerging artist or an established brand, our crew becomes your crew.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-slate-400">End-to-end production capabilities.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-colors group">
                <div className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-slate-400 mb-6 text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-slate-300 text-xs">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Selected Work</h2>
            <p className="text-slate-400">A glimpse into what we've created.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer">
                <img 
                  src={`https://picsum.photos/600/400?random=${item + 10}`} 
                  alt="Project" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                    {item % 2 === 0 ? 'Music Video' : 'Studio Session'}
                  </span>
                  <h3 className="text-white font-bold text-xl">Project Title {item}</h3>
                  <p className="text-slate-300 text-sm mt-2">Brief description of the artistic direction.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Crew</h2>
            <p className="text-slate-400">Experts in every discipline.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl overflow-hidden w-full sm:w-64 border border-slate-700 hover:shadow-xl hover:shadow-indigo-500/10 transition-all">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-indigo-400 text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVOICE GENERATOR TOOL */}
      <InvoiceGenerator />

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Create?</h2>
              <p className="text-slate-400">Fill out the form below and we'll reply within 24-48 hours.</p>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
                  <input required type="text" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                  <input required type="email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                  <input type="tel" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Project Type</label>
                  <select value={contactForm.projectType} onChange={e => setContactForm({...contactForm, projectType: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                    <option>Music Production</option>
                    <option>Video Production</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Budget Range</label>
                <select value={contactForm.budget} onChange={e => setContactForm({...contactForm, budget: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                  <option>Under ₹50k</option>
                  <option>₹50k - ₹2 Lakhs</option>
                  <option>₹2 Lakhs - ₹5 Lakhs</option>
                  <option>₹5 Lakhs+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Tell us about your project</label>
                <textarea required rows={4} value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Genre, timeline, references, etc..."></textarea>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:-translate-y-1">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-slate-600 text-sm">
        <div className="mb-6 space-y-1">
          <p className="text-slate-400">House no. 1070/3, Street 2, East Rajiv Nagar, Gurgaon</p>
          <p className="text-slate-400">Ph: 7048998256, 9717155406</p>
        </div>
        <p>&copy; {new Date().getFullYear()} HR Crew Productions. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-indigo-500">Instagram</a>
          <a href="#" className="hover:text-indigo-500">YouTube</a>
          <a href="#" className="hover:text-indigo-500">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default App;