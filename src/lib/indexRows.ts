import type { HealthPackage } from '../../config/packages';
import { tests, type DepartmentId, type Parameter, type Test } from '../../config/tests';

type L = { en: string; ml: string };

/** One row of the Index, whatever it came from. */
export type IndexRow = {
  key: string;
  testId: string;
  name: string;
  department?: DepartmentId;
  kind: Test['kind'];
  parameters: Parameter[];
  /** Only where the lab supplied wording. */
  about?: L;
  method?: string;
  methodPerPart?: boolean;
  sample?: Test['sample'];
  prep?: 'fasting';
  /** CRP, RA Factor: nothing beyond the name is known. */
  nameOnly?: boolean;
  viaPackagesOnly?: boolean;
  inPackages?: Test['inPackages'];
};

export function rowFromTest(t: Test): IndexRow {
  return {
    key: t.id,
    testId: t.id,
    name: t.name,
    department: t.department,
    kind: t.kind,
    parameters: t.parameters ?? [],
    about: t.about,
    method: t.method,
    methodPerPart: !t.method && Boolean(t.parameters?.some((p) => p.method)),
    sample: t.sample,
    prep: t.prep,
    nameOnly: t.nameOnly,
    viaPackagesOnly: t.viaPackagesOnly,
    inPackages: t.inPackages,
  };
}

/**
 * Package contents as Index rows. The package's own wording and
 * parameters win; method, sample and preparation come from the matching
 * directory test only when that row is the whole test (not one part of it).
 */
export function rowsFromPackage(pkg: HealthPackage): IndexRow[] {
  return pkg.tests.map((pt, i) => {
    const t = tests.find((x) => x.id === pt.testId);
    const whole = t ? t.name === pt.name || pt.name.startsWith(t.name.split(' (')[0]) : false;
    // Fasting only where the package names the test as fasting (FBS, Fasting Lipid Profile).
    const fasting = /fasting/i.test(pt.name) && !/random/i.test(pt.name) ? 'fasting' : undefined;
    return {
      key: `${pkg.id}-${i}`,
      testId: pt.testId,
      name: pt.name,
      department: t?.department,
      kind: 'test',
      parameters: (pt.parameters ?? []).map((name) => ({ name })),
      about: pt.about,
      method: whole ? t?.method : undefined,
      sample: whole || t?.sample === 'urine' ? t?.sample : undefined,
      prep: fasting as 'fasting' | undefined,
    };
  });
}
