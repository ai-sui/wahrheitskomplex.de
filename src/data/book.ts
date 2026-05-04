export type Book = {
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  publicationDate: string;
  isbn?: string;
  blurb: string;
  authorBio: string;
  buyUrl?: string;
};

export const book: Book = {
  title: 'Der Wahrheitskomplex',
  subtitle: 'Wie NGOs im Staatsauftrag unerwünschte Meinungen bekämpfen',
  author: 'Norbert Häring',
  publisher: 'Westend Verlag',
  publicationDate: 'Erschienen Mai 2026',
  blurb:
    'Norbert Häring zeichnet nach, wie ein Geflecht aus Behörden, Stiftungen, Think Tanks und NGOs entstanden ist, das den westlichen Mediendiskurs strukturiert — von der Wissenschaftskommunikation über Klima-Berichterstattung bis zu Plattform-Regulierung. Mit einer Fülle an Belegen, Geldspuren und Personalverflechtungen.',
  authorBio:
    'Norbert Häring ist Wirtschaftsjournalist und Autor mehrerer Bestseller (u.a. „Die Abschaffung des Bargelds“). Auf norberthaering.de recherchiert er seit 2014 zu Geldsystem, Macht und Medien.',
  buyUrl: 'https://www.westendverlag.de/',
};
