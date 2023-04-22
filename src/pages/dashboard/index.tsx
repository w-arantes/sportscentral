import { PageLayout, Section } from '@/layout';

export default function Dashboard() {
  return (
    <PageLayout title="Dashboard" mt="1rem">
      <Section title="Following">
        <h1>Follow</h1>
      </Section>
      <Section title="Events">
        <h1>Events</h1>
      </Section>
      <Section title="Categories">
        <h1>Categories</h1>
      </Section>
    </PageLayout>
  );
}
