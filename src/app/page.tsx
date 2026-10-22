import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: 'var(--text-display)', marginBottom: 'var(--space-4)' }}>
          Janasevana Lab
        </h1>
        <p style={{ maxWidth: '60ch', margin: '0 auto var(--space-6)' }}>
          Diagnostic Laboratory · Kattungal Building, Kaichoondy Jn., Alappuzha
        </p>
        <Link
          href="/specimen"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'var(--teal-500)',
            color: '#fff',
            borderRadius: '4px',
            fontWeight: 600,
          }}
        >
          View Phase 1 Design Specimen Page
        </Link>
      </div>
    </main>
  );
}
