// Collaboration records reported by the portfolio owner and described in a teammate's CV.
// These are NOT individually verified sole-authored projects or employment records.
// Never copy the teammate's contact details, employer dates, performance metrics, or
// technology-level proficiency claims into the owner's CV.
export type Collaboration = {
  slug: string;
  name: string;
  type: string;
  description: string;
  link: string | null;
  linkStatus: 'reported' | 'public-website' | 'unverified';
};
export const collaborations: Collaboration[] = [
  {
    "slug": "jizzakh-school",
    "name": "Jizzakh City School",
    "type": "Education website",
    "description": "School announcements and online application submission.",
    "link": "https://jizzaxshaharkhm.uz",
    "linkStatus": "reported"
  },
  {
    "slug": "ehm-gymnasium",
    "name": "EHM Gymnasium",
    "type": "Private school website",
    "description": "School website design with frontend and backend functionality.",
    "link": "https://ehmgymnasium.uz",
    "linkStatus": "reported"
  },
  {
    "slug": "equip-offer",
    "name": "Equip-offer",
    "type": "E-commerce campaign",
    "description": "Equipment sales and promotional commerce website.",
    "link": "https://equip-offer.uz",
    "linkStatus": "reported"
  },
  {
    "slug": "crycoud",
    "name": "Crycoud",
    "type": "GameDev team website",
    "description": "Web presence created for a game development team.",
    "link": "https://crycoud.com",
    "linkStatus": "reported"
  },
  {
    "slug": "idealuc",
    "name": "Idealuc Telegram Bot",
    "type": "Commerce automation",
    "description": "Telegram bot for sales, advertising and basic statistics.",
    "link": "https://t.me/idealuc_bot",
    "linkStatus": "reported"
  },
  {
    "slug": "tasviriy-oyina",
    "name": "Tasviriy Oyina",
    "type": "Organization website",
    "description": "Website for the Republic of Uzbekistan creative union.",
    "link": "https://tasviriyoyinaorg.uz",
    "linkStatus": "public-website"
  },
  {
    "slug": "hyundai-ce",
    "name": "Hyundai C.E.",
    "type": "Automotive dealership web",
    "description": "Website for a Hyundai dealer in Uzbekistan; the exact public address is not confirmed.",
    "link": null,
    "linkStatus": "unverified"
  },
  {
    "slug": "loftmee",
    "name": "Loftmee",
    "type": "Furniture commerce",
    "description": "Online store for a furniture factory.",
    "link": null,
    "linkStatus": "unverified"
  },
  {
    "slug": "equipuz",
    "name": "Equip.uz",
    "type": "E-commerce engineering",
    "description": "Equipment marketplace and website engineering, maintenance and product updates.",
    "link": "https://equip.uz",
    "linkStatus": "public-website"
  },
  {
    "slug": "it-progress",
    "name": "IT Progress client work",
    "type": "Web development & support",
    "description": "Team-delivered customer websites and technical support; specific sites have not been mapped.",
    "link": null,
    "linkStatus": "unverified"
  }
];
