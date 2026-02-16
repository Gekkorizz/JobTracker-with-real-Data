export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  mode: 'Remote' | 'Hybrid' | 'Onsite';
  experience: 'Fresher' | '0-1 Years' | '1-3 Years' | '3-5 Years' | '5+ Years';
  skills: string[];
  source: 'LinkedIn' | 'Naukri' | 'Indeed' | 'Wellfound' | 'Company Site';
  postedDaysAgo: number;
  salaryRange: string;
  applyUrl: string;
  description: string;
}

export const companies = [
  'Infosys', 'TCS', 'Wipro', 'Accenture', 'Capgemini', 'Cognizant', 'IBM', 'Oracle', 'SAP', 'Dell',
  'Amazon', 'Flipkart', 'Swiggy', 'Razorpay', 'PhonePe', 'Paytm', 'Zoho', 'Freshworks', 'Juspay', 'CRED',
  'Zerodha', 'Groww', 'Postman', 'BrowserStack', 'Zomato', 'Meesho', 'Urban Company', 'Dream11'
];

export const roles = [
  'SDE Intern', 'Graduate Engineer Trainee', 'Junior Backend Developer', 'Frontend Intern',
  'QA Intern', 'Data Analyst Intern', 'Java Developer', 'Python Developer', 'React Developer',
  'Full Stack Engineer', 'DevOps Engineer', 'Product Analyst'
];

export const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Gurgaon', 'Noida', 'Mumbai', 'Remote'];
export const modes = ['Remote', 'Hybrid', 'Onsite'] as const;
export const sources = ['LinkedIn', 'Naukri', 'Indeed', 'Wellfound', 'Company Site'] as const;
export const experiences = ['Fresher', '0-1 Years', '1-3 Years', '3-5 Years', '5+ Years'] as const;

const skillsPool = [
  'Java', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Spring Boot', 
  'TypeScript', 'JavaScript', 'C++', 'Data Structures', 'Algorithms', 'System Design', 'Figma'
];

const generateDescription = (role: string, company: string) => {
  return `We are looking for a passionate ${role} to join our team at ${company}. 
  You will be responsible for designing and implementing scalable software solutions. 
  Collaborate with cross-functional teams to define, design, and ship new features. 
  Work on bug fixing and improving application performance. 
  Continuously discover, evaluate, and implement new technologies to maximize development efficiency.`;
};

const getSalary = (exp: string, role: string) => {
  if (role.includes('Intern')) return '₹15k–₹40k/month';
  if (exp === 'Fresher' || exp === '0-1 Years') return '₹3.5–₹8 LPA';
  if (exp === '1-3 Years') return '₹8–₹16 LPA';
  return '₹16–₹28 LPA';
};

const getExperience = (role: string): Job['experience'] => {
  if (role.includes('Intern')) return 'Fresher';
  if (role.includes('Trainee')) return '0-1 Years';
  if (role.includes('Junior')) return '0-1 Years';
  const rand = Math.random();
  if (rand < 0.3) return '1-3 Years';
  if (rand < 0.6) return '3-5 Years';
  return '5+ Years';
};

export const jobs: Job[] = Array.from({ length: 60 }, (_, i) => {
  const company = companies[Math.floor(Math.random() * companies.length)];
  const role = roles[Math.floor(Math.random() * roles.length)];
  const experience = getExperience(role);
  
  // Pick 3-5 random skills
  const jobSkills = [];
  const numSkills = 3 + Math.floor(Math.random() * 3);
  for(let j=0; j<numSkills; j++) {
    jobSkills.push(skillsPool[Math.floor(Math.random() * skillsPool.length)]);
  }

  return {
    id: `job-${i + 1}`,
    title: role,
    company: company,
    location: locations[Math.floor(Math.random() * locations.length)],
    mode: modes[Math.floor(Math.random() * modes.length)],
    experience: experience,
    skills: [...new Set(jobSkills)], // unique skills
    source: sources[Math.floor(Math.random() * sources.length)],
    postedDaysAgo: Math.floor(Math.random() * 10),
    salaryRange: getSalary(experience, role),
    applyUrl: '#',
    description: generateDescription(role, company)
  };
});