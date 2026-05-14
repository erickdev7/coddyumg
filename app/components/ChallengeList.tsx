import ProgressButton from '@/app/components/ProgressButton';

export type ChallengeItem = {
  title: string;
  description: string;
  steps: string[];
  sample: string;
};

type ChallengeListProps = {
  accentClass?: string;
  challenges: ChallengeItem[];
  course: string;
};

export default function ChallengeList({ accentClass = 'text-blue-600', challenges, course }: ChallengeListProps) {
  const groups = Array.from({ length: Math.ceil(challenges.length / 5) }, (_, groupIndex) => ({
    title: `Módulo ${groupIndex + 1}`,
    range: `${groupIndex * 5 + 1}-${Math.min((groupIndex + 1) * 5, challenges.length)}`,
    items: challenges.slice(groupIndex * 5, groupIndex * 5 + 5).map((challenge, itemIndex) => ({
      challenge,
      index: groupIndex * 5 + itemIndex,
    })),
  }));

  return (
    <div className="mt-16 space-y-10">
      {groups.map((group) => (
        <section key={group.title} className="scroll-mt-24">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className={`text-sm font-semibold uppercase tracking-wide ${accentClass}`}>{group.title}</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">Retos {group.range}</h2>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">5 retos por bloque</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {group.items.map(({ challenge, index }) => (
              <article key={challenge.title} id={`challenge-${index + 1}`} className="rounded-lg bg-white p-6 shadow">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className={`text-sm font-semibold uppercase tracking-wide ${accentClass}`}>Reto {index + 1}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-gray-900">{challenge.title.replace(/^Reto\s+\d+:\s*/i, '')}</h3>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {group.title}
                  </span>
                </div>
                <p className="mt-3 text-gray-600">{challenge.description}</p>
                <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-gray-600">
                  {challenge.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <pre className="mt-4 whitespace-pre-wrap rounded-md bg-gray-950 p-4 text-sm text-green-200">{challenge.sample}</pre>
                <div className="mt-5">
                  <ProgressButton course={course} activity={challenge.title} score={100} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
