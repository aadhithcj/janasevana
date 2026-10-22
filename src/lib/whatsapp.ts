import { siteConfig } from '@/config/site';
import { DiagnosticTest } from '@/config/tests';

export interface BookingPayload {
  patientName?: string;
  phone?: string;
  area?: string;
  serviceType?: 'lab-visit' | 'home-collection';
  preferredTime?: string;
  selectedTests?: DiagnosticTest[];
  notes?: string;
  lang?: 'en' | 'ml';
}

export function buildWhatsAppLink(payload: BookingPayload): string {
  const isMl = payload.lang === 'ml';

  const lines: string[] = [];

  if (isMl) {
    lines.push('നമസ്കാരം ജനസേവന ലാബ്,');
    lines.push('');
    lines.push('ഞാൻ ലാബ് പരിശോധനയ്ക്കായി വിവരങ്ങൾ അന്വേഷിക്കുകയാണ്:');
    if (payload.patientName) {
      lines.push(`• രോഗിയുടെ പേര്: ${payload.patientName}`);
    }
    if (payload.phone) {
      lines.push(`• ഫോൺ നമ്പർ: ${payload.phone}`);
    }
    if (payload.area) {
      lines.push(`• സ്ഥലം (ആലപ്പുഴ): ${payload.area}`);
    }
    if (payload.serviceType) {
      const typeText =
        payload.serviceType === 'home-collection'
          ? 'വീട്ടിൽ സാമ്പിൾ ശേഖരണം (Home Collection)'
          : 'കൈചൂണ്ടി ലാബിൽ നേരിട്ടെത്തുന്നു (Lab Visit)';
      lines.push(`• ആവശ്യമായ സേവനം: ${typeText}`);
    }
    if (payload.preferredTime) {
      lines.push(`• സൗകര്യപ്രദമായ സമയം: ${payload.preferredTime}`);
    }
    if (payload.selectedTests && payload.selectedTests.length > 0) {
      lines.push('');
      lines.push('ആവശ്യമായ പരിശോധനകൾ (Tests):');
      payload.selectedTests.forEach((test, idx) => {
        lines.push(`  ${idx + 1}. ${test.nameEn} (${test.nameMl})`);
      });
    }
    if (payload.notes) {
      lines.push('');
      lines.push(`കുറിപ്പ്: ${payload.notes}`);
    }
    lines.push('');
    lines.push('ദയവായി ലഭ്യമായ സമയവും കൂടുതൽ വിവരങ്ങളും അറിയിക്കുമല്ലോ.');
  } else {
    lines.push('Hello Janasevana Lab,');
    lines.push('');
    lines.push('I would like to enquire about diagnostic testing:');
    if (payload.patientName) {
      lines.push(`• Patient Name: ${payload.patientName}`);
    }
    if (payload.phone) {
      lines.push(`• Contact Phone: ${payload.phone}`);
    }
    if (payload.area) {
      lines.push(`• Locality / Area: ${payload.area}, Alappuzha`);
    }
    if (payload.serviceType) {
      const typeText =
        payload.serviceType === 'home-collection'
          ? 'Home Sample Collection'
          : 'Direct Visit to Kaichoondy Lab';
      lines.push(`• Service Requested: ${typeText}`);
    }
    if (payload.preferredTime) {
      lines.push(`• Preferred Date & Time: ${payload.preferredTime}`);
    }
    if (payload.selectedTests && payload.selectedTests.length > 0) {
      lines.push('');
      lines.push('Selected Investigations:');
      payload.selectedTests.forEach((test, idx) => {
        lines.push(`  ${idx + 1}. ${test.nameEn} [${test.code}]`);
      });
    }
    if (payload.notes) {
      lines.push('');
      lines.push(`Notes: ${payload.notes}`);
    }
    lines.push('');
    lines.push('Please let me know availability and preparation instructions.');
  }

  const rawMessage = lines.join('\n');
  const encoded = encodeURIComponent(rawMessage);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encoded}`;
}
