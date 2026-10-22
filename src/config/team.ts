import { ConfirmationStatus } from './site';

export interface StaffMember {
  id: string;
  nameEn: string;
  nameMl: string;
  roleEn: string;
  roleMl: string;
  initials: string;
  credentials: ConfirmationStatus<string>;
  bioEn?: string;
  bioMl?: string;
}

export const staffMembers: StaffMember[] = [
  {
    id: 'najeema-sathar',
    nameEn: 'Najeema Sathar',
    nameMl: 'നജീമ സത്താർ',
    roleEn: 'Lab In Charge',
    roleMl: 'ലാബ് ഇൻ ചാർജ്ജ്',
    initials: 'NS',
    credentials: {
      status: 'TODO_CONFIRM',
      note: 'Specific academic degrees and registration require owner confirmation.',
      fallbackMessageEn: '',
      fallbackMessageMl: '',
    },
  },
  {
    id: 'ajmal-majeed',
    nameEn: 'Ajmal Majeed',
    nameMl: 'അജ്മൽ മജീദ്',
    roleEn: 'Chief Lab Technician',
    roleMl: 'ചീഫ് ലാബ് ടെക്നീഷ്യൻ',
    initials: 'AM',
    credentials: {
      status: 'TODO_CONFIRM',
      note: 'Specific academic degrees and registration require owner confirmation.',
      fallbackMessageEn: '',
      fallbackMessageMl: '',
    },
  },
  {
    id: 'remya-sajan',
    nameEn: 'Remya Sajan',
    nameMl: 'രമ്യ സാജൻ',
    roleEn: 'Sr. Lab Technician',
    roleMl: 'സീനിയർ ലാബ് ടെക്നീഷ്യൻ',
    initials: 'RS',
    credentials: {
      status: 'TODO_CONFIRM',
      note: 'Specific academic degrees and registration require owner confirmation.',
      fallbackMessageEn: '',
      fallbackMessageMl: '',
    },
  },
];
