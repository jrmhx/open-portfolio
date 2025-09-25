import type { Profile } from '@/lib/types'

export const profileData: Profile = {
  id: 'me-001',
  name: 'Jeremiah Xing',
  title: 'Software Engineer | ANU CS Grad | System and Architectures',
  bio: 'I am an ANU CS graduate with a specialization on system and architectures;  with hands-on experience in fullstack and cloud-native development; passionate about system programming.',
  detailedBio: `I am an ANU CS graduate with a specialization on system and architectures. Skilled in C/C++, Python and Typescipt, with hands-on experience in fullstack and cloud-native development. Passionate about system programming.`,
  avatar: '/images/profile-avatar.jpg', // add your actual image here
  contactInfo: {
    email: 'i@jrmh.dev',
    // phone: '+1 (555) 123-4567', 
    location: 'Sydney, AU',
    timezone: 'AEST (UTC+10)',
    availability: 'Available for new opportunities'
  },
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/jrmhx',
      icon: 'github',
      label: 'Check out my code'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/jrmhx',
      icon: 'linkedin',
      label: 'Connect professionally'
    },
    {
      platform: 'X',
      url: 'https://x.com/ijrmhii',
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
