import type { Profile } from '@/lib/types'

export const profileData: Profile = {
  id: 'me-001',
  name: 'Ophie Folio',
  title: 'Open Portfolio',
  bio: 'I am Open Portfolio.',
  detailedBio: `With over 99 years of experience in full-stack development, I specialize in building 
    scalable web applications using modern technologies. I'm passionate about clean code, 
    user experience, and staying up-to-date with the latest industry trends. 
    
    I believe in creating digital experiences that not only solve problems but also delight users. 
    My approach combines technical expertise with creative problem-solving to deliver solutions 
    that make a real impact.`,
  avatar: '/images/profile-avatar.jpg', // add your actual image here
  contactInfo: {
    email: 'i@jrmh.dev',
    phone: '+1 (555) 123-4567', 
    location: 'San Francisco, CA',
    timezone: 'Pacific Time (UTC-8)',
    availability: 'Available for new opportunities'
  },
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/jrmhx/open-portfolio',
      icon: 'github',
      label: 'Check out my code'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/',
      icon: 'linkedin',
      label: 'Connect professionally'
    },
    {
      platform: 'X',
      url: 'https://x.com/',
      icon: 'twitter',
      label: 'Follow for tech insights'
    },
    {
      platform: 'Email',
      url: 'mailto:i@jrmh.dev',
      icon: 'mail',
      label: 'Get in touch'
    }
  ],
  resumeUrl: '/resume.pdf',
  status: 'available'
}
