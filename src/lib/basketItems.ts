import { formatInr, type HealthPackage } from '../../config/packages';
import type { BasketItem } from '@/components/booking/BasketContext';

/** The basket entry for a package: its id and the name the WhatsApp message uses. */
export function packageItem(pkg: HealthPackage): BasketItem {
  return { id: `pkg-${pkg.id}`, name: `${pkg.shortName} (${formatInr(pkg.priceInr)})`, kind: 'package' };
}
