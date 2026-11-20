import { useMemo, useState } from 'react';
import AnimationCard from '../components/AnimationCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { ANIMATIONS, COLLECTIONS } from '../data/animations.js';

/* Default page. One card per collection, sorted as defined in data/animations.js. */
export default function AllAnimations() {
  const [query, setQuery] = useState('');

  const cards = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COLLECTIONS.map((collection) => {
      const items = ANIMATIONS.filter((a) => a.collectionId === collection.id);
      return { collection, items, first: items[0] };
    })
      .filter((card) => card.first)
      .filter((card) => {
        if (!q) return true;
        return (
          card.collection.title.toLowerCase().includes(q) ||
          card.items.some((item) => item.title.toLowerCase().includes(q))
        );
      });
  }, [query]);

  return (
    <section className="page page-library" aria-labelledby="library-title">
      <header className="page-head">
        <h1 id="library-title">ALL ANIMATIONS</h1>
      </header>

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {cards.length > 0 ? (
        <div className="grid">
          {cards.map((card, index) => (
            <AnimationCard
              key={card.collection.id}
              to={`/animation/${card.first.id}`}
              title={card.collection.title}
              video={card.first.video}
              poster={card.first.poster}
              mode="autoplay"
              index={index}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No animations match "${query.trim()}"`}
          text="Check the spelling or try a shorter name."
          onReset={() => setQuery('')}
        />
      )}
    </section>
  );
}
