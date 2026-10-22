import { diagnosticTests, DiagnosticTest, DepartmentKey } from '@/config/tests';

export function filterTests(
  query: string,
  department: DepartmentKey
): DiagnosticTest[] {
  const cleanQuery = query.trim().toLowerCase();

  return diagnosticTests.filter((test) => {
    // 1. Department match
    if (department !== 'all' && test.department !== department) {
      return false;
    }

    // 2. Query match
    if (!cleanQuery) {
      return true;
    }

    // Check nameEn, nameMl, code
    if (
      test.nameEn.toLowerCase().includes(cleanQuery) ||
      test.nameMl.toLowerCase().includes(cleanQuery) ||
      test.code.toLowerCase().includes(cleanQuery) ||
      test.sampleTypeEn.toLowerCase().includes(cleanQuery) ||
      test.sampleTypeMl.toLowerCase().includes(cleanQuery)
    ) {
      return true;
    }

    // Check subcomponents
    if (
      test.subComponents?.some((c) => c.toLowerCase().includes(cleanQuery)) ||
      test.subComponentsMl?.some((c) => c.toLowerCase().includes(cleanQuery))
    ) {
      return true;
    }

    // Check clinical synonyms
    if (test.synonyms.some((syn) => syn.toLowerCase().includes(cleanQuery))) {
      return true;
    }

    return false;
  });
}
