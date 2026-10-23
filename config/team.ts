/** Team, as printed on the lab's reports. No photos or signatures until supplied. */
export type TeamMember = {
  id: string;
  name: { en: string; ml: string };
  role: { en: string; ml: string };
  registration?: string;
};

export const team: TeamMember[] = [
  {
    id: 'ajmal',
    name: { en: 'Ajmal Majeed', ml: 'അജ്മൽ മജീദ്' },
    role: { en: 'Chief Lab Tech', ml: 'ചീഫ് ലാബ് ടെക്' },
    registration: 'Paramed Reg. No. 2232\\MLTn\\15',
  },
  {
    id: 'najeema',
    name: { en: 'Najeema Sathar', ml: 'നജീമ സത്താർ' },
    role: { en: 'Lab In Charge', ml: 'ലാബ് ഇൻ ചാർജ്' },
  },
  {
    id: 'remya',
    name: { en: 'Remya Sajan', ml: 'രമ്യ സാജൻ' },
    role: { en: 'Sr. Lab Technician', ml: 'സീനിയർ ലാബ് ടെക്നീഷ്യൻ' },
  },
];
