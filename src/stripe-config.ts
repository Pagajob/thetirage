export const stripeProducts = {
  bronze: {
    id: 'prod_T7WDb53qljK0sI',
    priceId: 'price_1SBHBREWa5JpT2nEQSe5Jx3e',
    name: 'Ticket Bronze – 1 participation',
    description: '🎟️ Le ticket découverte ! Tu obtiens 1 chance unique de repartir avec l\'iPhone 17 Pro Max de ce mois. 👉 Une chance peut suffire à tout changer.',
    price: 5.99,
    mode: 'payment' as const,
    participations: 1
  },
  silver: {
    id: 'prod_T7WFaIguZQzKlb',
    priceId: 'price_1SBHCeEWa5JpT2nEJrt20BIh',
    name: 'Ticket Silver – 2 participations',
    description: '⚡ Double tes chances pour un petit prix ! Tu obtiens ici 2 participations au tirage de l\'iPhone 17 Pro Max. Deux fois plus de chances, c\'est aussi deux fois plus d\'adrénaline. 👉 Le choix malin pour maximiser tes probabilités de gagner.',
    price: 9.99,
    mode: 'payment' as const,
    participations: 2
  },
  gold: {
    id: 'prod_T7WHHGyaI6RhBB',
    priceId: 'price_1SBHEeEWa5JpT2nEg1K6tDSs',
    name: 'Ticket Gold – 4 participations + bonus',
    description: '🏆 Le ticket des gagnants. Tu obtiens ici 4 participations au tirage de l\'iPhone 17 Pro Max + une participation pour gagner une carte cadeau de 100€ chez boulanger. Ton nom a 4 fois plus de chances d\'être tiré, et tu fais partie du cercle VIP. 👉 Celui qui rapproche vraiment de la victoire.',
    price: 15.99,
    mode: 'payment' as const,
    participations: 4,
    bonus: 'Carte cadeau Boulanger 100€'
  }
} as const;

export type ProductKey = keyof typeof stripeProducts;