import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import CardNav from './components/CardNav.jsx';
// import logo from './assets/logo.svg';
import Innovation from './pages/Innovation/Innovation.jsx'

const items = [
  {
    label: 'About',
    bgColor: '#0D0716',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=60',
    textColor: '#fff',
    links: [
      { label: 'Company', ariaLabel: 'About Company', href: '/#about' },
      { label: 'Careers', ariaLabel: 'About Careers', href: '#' },
    ],
  },
  {
    label: 'Projects',
    bgColor: '#170D27',
    bgImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60',
    textColor: '#fff',
    links: [
      { label: 'Featured', ariaLabel: 'Featured Projects', href: '/#events' },
      { label: 'Case Studies', ariaLabel: 'Project Case Studies', href: '/#certificates' },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#271E37',
    bgImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=60',
    textColor: '#fff',
    links: [
      { label: 'Email', ariaLabel: 'Email us', href: '/#contact' },
      { label: 'Instagram', ariaLabel: 'Instagram', href: 'https://www.instagram.com/anveshakscienceforum/?igsh=MnQzZW1hODZtMWw1&utm_source=ig_contact_invite#' },
    ],
  },
  {
    label: 'Innovation',
    bgColor: '#1D1530',
    bgImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=60',
    textColor: '#fff',
    links: [
      { label: 'Innovation Page', ariaLabel: 'Innovation', href: '/innovation' },
    ],
  },
];

export default function App() {
  return (
    <>
      <CardNav
        // logo={logo}
        logoAlt="Company Logo"
        items={items}
        baseColor="rgba(255,255,255,0.18)"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/innovation" element={<Innovation />} />
      </Routes>
    </>
  );
}