-- Fix cover URLs: switch from Google Books to Open Library (more reliable)
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg' WHERE slug = 'fourth-wing';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781649374172-L.jpg' WHERE slug = 'iron-flame';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781635575569-L.jpg' WHERE slug = 'a-court-of-thorns-and-roses';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781635575583-L.jpg' WHERE slug = 'a-court-of-mist-and-fury';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781728274867-L.jpg' WHERE slug = 'twisted-love';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781476753188-L.jpg' WHERE slug = 'ugly-love';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg' WHERE slug = 'it-ends-with-us';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781952457760-L.jpg' WHERE slug = 'from-blood-and-ash';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781728289724-L.jpg' WHERE slug = 'king-of-wrath';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9780593336823-L.jpg' WHERE slug = 'the-love-hypothesis';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781665954884-L.jpg' WHERE slug = 'powerless';
UPDATE books SET cover_url = 'https://covers.openlibrary.org/b/isbn/9781728276113-L.jpg' WHERE slug = 'things-we-never-got-over';
