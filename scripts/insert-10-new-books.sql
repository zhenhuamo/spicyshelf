-- ============================================
-- SpicyBooks: 添加 10 本新书
-- 覆盖关键词: dark romance, vampire, boss/office, MM, brothers best friend, enemies-to-lovers
-- ============================================

-- ============================================
-- 第一部分：添加新 Tropes
-- ============================================

INSERT OR IGNORE INTO tropes (slug, name, description, emoji) VALUES
  ('brothers-best-friend', 'Brother''s Best Friend', 'The forbidden allure of falling for someone who is off-limits because of their close bond with your sibling', '🚫'),
  ('office-romance', 'Office Romance', 'Love blooms in the workplace between colleagues, boss and employee, or professional rivals', '💼'),
  ('stalker-romance', 'Stalker Romance', 'An obsessive pursuer whose dark fixation blurs the line between danger and desire', '👁️'),
  ('mythology-retelling', 'Mythology Retelling', 'Classic myths reimagined with modern twists and romantic storylines', '⚡'),
  ('age-gap', 'Age Gap', 'A significant age difference between the romantic leads adds tension and forbidden appeal', '🔞'),
  ('college-romance', 'College Romance', 'Young love set against the backdrop of university life with all its drama and discovery', '🎓'),
  ('mafia-romance', 'Mafia Romance', 'Dangerous love entangled with organized crime, power, and loyalty', '🔫');

-- ============================================
-- 第二部分：插入 10 本新书
-- ============================================

-- 1. Haunting Adeline - H.D. Carlton (Dark Romance #1)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'haunting-adeline',
  'Haunting Adeline',
  'H.D. Carlton',
  'Adeline inherits her grandmother''s old Victorian mansion, only to discover she has a stalker who watches her every move. As she unravels the mystery of her grandmother''s diary and a decades-old murder, the line between fear and desire becomes dangerously blurred.',
  'https://images-na.ssl-images-amazon.com/images/P/1957635002.01._SCLZZZZZZZ_SX500_.jpg',
  5,
  506, 2022, '9781957635002',
  'https://www.amazon.com/dp/1957635002?tag=chessanalys05-20',
  'Extremely explicit scenes with dark, obsessive themes. The stalker dynamic creates intense power play and dubious consent scenarios throughout. Not for the faint of heart.',
  'The BookTok phenomenon that redefined dark romance. Haunting Adeline is unapologetically intense, blending gothic atmosphere with a stalker love story that will either captivate or shock you. H.D. Carlton crafts a world where obsession meets genuine connection, wrapped in a murder mystery that keeps pages turning.',
  8,
  'Dual POV', 'Scorching', 'Teddy Hamilton, Michele Sparks',
  'Cat and Mouse Duet', 1, 2,
  '["Dark Romance","Gothic Romance","Romantic Suspense"]',
  '["Stalking","Dubious consent","Sexual assault","Sex trafficking themes","Graphic violence","Murder"]',
  '["twisted-love","from-blood-and-ash"]',
  '["Fans of morally grey heroes","Readers who love dark, obsessive love stories","Those who enjoy gothic atmosphere with modern settings"]',
  '["You prefer sweet or clean romance","Dubious consent is a hard no","You are sensitive to stalking themes"]',
  '["Dark","Intense","Suspenseful","Gothic"]'
);

-- 2. The Hating Game - Sally Thorne (Boss/Office Romance)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'the-hating-game',
  'The Hating Game',
  'Sally Thorne',
  'Lucy Hutton and Joshua Templeman hate each other. Not dislike. Not begrudgingly tolerate. Hate. As executive assistants to co-CEOs of a publishing company, they sit across from each other every day, engaged in an escalating series of passive-aggressive games. But when a promotion pits them against each other, their rivalry takes an unexpected turn.',
  'https://images-na.ssl-images-amazon.com/images/P/0062439596.01._SCLZZZZZZZ_SX500_.jpg',
  3,
  365, 2016, '9780062439598',
  'https://www.amazon.com/dp/0062439596?tag=chessanalys05-20',
  'Moderate spice with well-built tension. The slow burn pays off with satisfying intimate scenes that feel earned after chapters of witty banter and unresolved tension.',
  'The gold standard of office romance. Sally Thorne delivers razor-sharp banter, a perfectly paced enemies-to-lovers arc, and a hero who will make you swoon despite his grumpy exterior. Now a movie starring Lucy Hale, this is the book that launched a thousand BookTok recommendations.',
  3,
  'First Person (Lucy)', 'Steamy', 'Katie Schorr',
  NULL, NULL, NULL,
  '["Contemporary Romance","Romantic Comedy","Office Romance"]',
  '["Workplace power dynamics","Mild language"]',
  '["the-love-hypothesis","king-of-wrath"]',
  '["Fans of enemies-to-lovers with witty banter","Readers who love office romance","Those who enjoy slow-burn tension that explodes"]',
  '["You want high spice from page one","You prefer fantasy or paranormal settings"]',
  '["Funny","Witty","Steamy","Feel-good"]'
);

-- 3. Icebreaker - Hannah Grace (College Sports Romance)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'icebreaker',
  'Icebreaker',
  'Hannah Grace',
  'Anastasia Allen has worked her entire life for a shot at Team USA figure skating. When a facilities mishap forces her to share a rink with the hockey team, she clashes with their captain, Nate Hawkins. But forced proximity has a way of melting even the coldest rivalries.',
  'https://images-na.ssl-images-amazon.com/images/P/1668026031.01._SCLZZZZZZZ_SX500_.jpg',
  3,
  447, 2022, '9781668026038',
  'https://www.amazon.com/dp/1668026031?tag=chessanalys05-20',
  'Medium spice with sweet buildup. The intimate scenes are steamy and well-written, balanced with genuine emotional connection. Perfect for readers who want heat with heart.',
  'The BookTok sensation that took the romance world by storm. Hannah Grace delivers a swoony college sports romance with a figure skater and hockey captain who have undeniable chemistry. Sweet, funny, and steamy in all the right places.',
  4,
  'Dual POV', 'Steamy', 'Elizabeth Louise, Tim Paige',
  'Maple Hills', 1, 3,
  '["Contemporary Romance","Sports Romance","New Adult"]',
  '["Eating disorder themes","Toxic friendships","Mental health","Death of a parent (past)"]',
  '["the-love-hypothesis","things-we-never-got-over"]',
  '["Fans of college romance","Hockey romance lovers","Readers who enjoy forced proximity with slow-burn tension"]',
  '["You prefer dark or angsty romance","You want high fantasy settings"]',
  '["Sweet","Funny","Steamy","Feel-good"]'
);


-- 4. A Hunger Like No Other - Kresley Cole (Vampire Romance)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'a-hunger-like-no-other',
  'A Hunger Like No Other',
  'Kresley Cole',
  'After 150 years of torture by vampires, Lachlain MacRieve, king of the Lykae, escapes his prison beneath Paris when he scents his fated mate on the streets above. But Emmaline Troy is half vampire, half Valkyrie — the very creature he despises. Their explosive connection defies everything he believes.',
  'https://images-na.ssl-images-amazon.com/images/P/1416509879.01._SCLZZZZZZZ_SX500_.jpg',
  4,
  368, 2006, '9781416509875',
  'https://www.amazon.com/dp/1416509879?tag=chessanalys05-20',
  'Very spicy with primal, possessive energy. The fated mates dynamic creates intense physical chemistry, and Cole does not shy away from explicit scenes with a dominant alpha hero.',
  'The book that launched one of paranormal romance''s most beloved series. Kresley Cole''s Immortals After Dark world is rich, addictive, and packed with scorching chemistry. Lachlain and Emmaline''s forbidden connection across enemy lines is the perfect entry point into vampire romance.',
  6,
  'Dual POV', 'Very Steamy', 'Robert Petkoff',
  'Immortals After Dark', 2, 20,
  '["Paranormal Romance","Vampire Romance","Fantasy Romance"]',
  '["Graphic violence","Captivity themes","Explicit sexual content","Torture (past)"]',
  '["from-blood-and-ash","a-court-of-thorns-and-roses"]',
  '["Fans of vampire and paranormal romance","Readers who love possessive alpha heroes","Those looking for a long series to binge"]',
  '["You prefer contemporary settings","Possessive heroes are not your thing","You want clean romance"]',
  '["Dark","Passionate","Action-packed","Addictive"]'
);

-- 5. Dark Lover - J.R. Ward (Vampire Romance)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'dark-lover',
  'Dark Lover',
  'J.R. Ward',
  'In the shadows of Caldwell, New York, a deadly turf war rages between vampires and their slayers. Wrath, the last purebred vampire and leader of the Black Dagger Brotherhood, wants nothing to do with the half-breed daughter of a fallen warrior. But duty demands he help Beth Randall through her transition — and desire has its own demands.',
  'https://images-na.ssl-images-amazon.com/images/P/0451468104.01._SCLZZZZZZZ_SX500_.jpg',
  4,
  416, 2005, '9780451468109',
  'https://www.amazon.com/dp/0451468104?tag=chessanalys05-20',
  'Very spicy with intense, passionate scenes. Ward writes alpha heroes with raw physicality, and the intimate moments are explicit and emotionally charged.',
  'The book that started a phenomenon. J.R. Ward''s Black Dagger Brotherhood redefined vampire romance with its gritty urban setting, complex warrior heroes, and scorching love stories. Wrath and Beth''s story is the perfect gateway into this addictive world.',
  5,
  'Multiple POV', 'Very Steamy', 'Jim Frangione',
  'Black Dagger Brotherhood', 1, 21,
  '["Paranormal Romance","Vampire Romance","Urban Fantasy"]',
  '["Graphic violence","Explicit sexual content","Drug references","Abuse themes"]',
  '["a-hunger-like-no-other","from-blood-and-ash"]',
  '["Vampire romance fans","Readers who love warrior heroes","Those looking for a massive series with interconnected stories"]',
  '["You prefer light, funny romance","Contemporary settings only","You want clean romance"]',
  '["Dark","Intense","Action-packed","Passionate"]'
);

-- 6. Red, White & Royal Blue - Casey McQuiston (MM Romance)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'red-white-and-royal-blue',
  'Red, White & Royal Blue',
  'Casey McQuiston',
  'When America''s First Son, Alex Claremont-Diaz, and Prince Henry of Wales have a public altercation, their PR teams force them into a fake friendship. But what starts as a political strategy evolves into something real — a secret romance that could shake two nations.',
  'https://images-na.ssl-images-amazon.com/images/P/1250316774.01._SCLZZZZZZZ_SX500_.jpg',
  3,
  432, 2019, '9781250316776',
  'https://www.amazon.com/dp/1250316774?tag=chessanalys05-20',
  'Moderate spice with tender, passionate scenes between the two leads. The intimate moments feel genuine and emotionally significant, building naturally from their evolving relationship.',
  'A joyful, swoony romance that became a cultural phenomenon and a movie. Casey McQuiston delivers sharp political wit, genuine emotional depth, and a love story that feels both epic and intimate. Essential reading for anyone who loves romance.',
  4,
  'First Person (Alex)', 'Steamy', 'Ramon de Ocampo',
  NULL, NULL, NULL,
  '["Contemporary Romance","LGBTQ+ Romance","Romantic Comedy"]',
  '["Homophobia themes","Political themes","Coming out","Mild language"]',
  '["the-love-hypothesis","icebreaker"]',
  '["Fans of LGBTQ+ romance","Readers who love fake-dating-to-real-feelings","Those who enjoy political settings with humor"]',
  '["You prefer dark or angsty romance","You want fantasy or paranormal settings"]',
  '["Funny","Swoony","Heartwarming","Witty"]'
);


-- 7. Butcher & Blackbird - Brynne Weaver (Dark Romance)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'butcher-and-blackbird',
  'Butcher & Blackbird',
  'Brynne Weaver',
  'Sloane and Rowan are rival serial killers who only target other serial killers. After a chance encounter, they strike up an unlikely friendship and an annual murder competition. But as the years pass, their bond deepens into something neither expected — love between two beautifully unhinged souls.',
  'https://images-na.ssl-images-amazon.com/images/P/1638931739.01._SCLZZZZZZZ_SX500_.jpg',
  4,
  336, 2023, '9781638931737',
  'https://www.amazon.com/dp/1638931739?tag=chessanalys05-20',
  'Very spicy with a playful edge. The chemistry between two morally bankrupt characters creates uniquely fun and explicit scenes. Dark humor meets genuine heat.',
  'A dark romantic comedy unlike anything else. Brynne Weaver somehow makes you root for two serial killers falling in love, delivering laugh-out-loud humor alongside genuinely touching moments. The BookTok viral sensation that proves love can bloom in the most unexpected places.',
  5,
  'Dual POV', 'Very Steamy', 'Joe Arden, Lucy Rivers',
  'The Ruinous Love Trilogy', 1, 3,
  '["Dark Romance","Romantic Comedy","Thriller Romance"]',
  '["Graphic violence","Murder","Serial killers","Explicit sexual content","Dark humor about death"]',
  '["haunting-adeline","twisted-love"]',
  '["Fans of dark romance with humor","Readers who love morally grey characters","Those who enjoy Dexter-meets-rom-com vibes"]',
  '["You prefer sweet or wholesome romance","Graphic violence is a hard no","You want realistic settings"]',
  '["Dark","Funny","Twisted","Steamy"]'
);

-- 8. Neon Gods - Katee Robert (Very Spicy / Mythology)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'neon-gods',
  'Neon Gods',
  'Katee Robert',
  'Society darling Persephone Dimitriou plans to flee the ultra-modern city of Olympus. But when her mother ambushes her with an engagement to Zeus, she runs across the River Styx and into the arms of Hades — a man who was supposed to be a myth. Their arrangement is simple: a fake relationship to keep her safe. But nothing about their chemistry is fake.',
  'https://images-na.ssl-images-amazon.com/images/P/1728231736.01._SCLZZZZZZZ_SX500_.jpg',
  5,
  384, 2021, '9781728231730',
  'https://www.amazon.com/dp/1728231736?tag=chessanalys05-20',
  'Scorching hot with frequent, explicit scenes. Katee Robert holds nothing back — this is a 5-pepper read with creative, boundary-pushing intimate moments that are integral to the power dynamics of the story.',
  'A sinfully delicious Hades and Persephone retelling set in a modern city of gods and power. Katee Robert delivers maximum spice with a surprisingly tender love story underneath. If you want a book that is unapologetically steamy with great worldbuilding, this is it.',
  8,
  'Dual POV', 'Scorching', 'Zara Hampton-Brown, Alex Moorcock',
  'Dark Olympus', 1, 6,
  '["Contemporary Romance","Mythology Retelling","Dark Romance"]',
  '["Explicit sexual content","Exhibitionism","Abuse themes","Power dynamics","Assault (attempted)"]',
  '["haunting-adeline","a-court-of-mist-and-fury"]',
  '["Readers who want maximum spice","Fans of mythology retellings","Those who love fake-dating with real feelings"]',
  '["You prefer clean or fade-to-black romance","You want slow-burn tension","Explicit content is not your thing"]',
  '["Steamy","Dark","Romantic","Addictive"]'
);

-- 9. Beautiful Player - Christina Lauren (Brother's Best Friend)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'beautiful-player',
  'Beautiful Player',
  'Christina Lauren',
  'When Hanna Bergstrom receives a lecture from her overprotective brother about neglecting her social life, she decides to get help from the most unlikely source: her brother''s gorgeous best friend, Will Sumner. The venture capitalist and unapologetic playboy agrees to be her wingman, but their lessons in seduction quickly become very personal.',
  'https://images-na.ssl-images-amazon.com/images/P/1476751404.01._SCLZZZZZZZ_SX500_.jpg',
  4,
  320, 2013, '9781476751405',
  'https://www.amazon.com/dp/1476751404?tag=chessanalys05-20',
  'Very spicy with playful, fun energy. The intimate scenes are frequent and well-written, with great chemistry between a bookish woman discovering her confidence and a reformed playboy who can''t resist her.',
  'Christina Lauren at their steamiest. Beautiful Player is the quintessential brother''s best friend romance — forbidden, funny, and scorching hot. Hanna and Will''s journey from awkward wingman arrangement to genuine love is irresistible.',
  6,
  'Dual POV', 'Very Steamy', 'Grace Grant, Sebastian York',
  'Beautiful', 5, 10,
  '["Contemporary Romance","Romantic Comedy"]',
  '["Explicit sexual content","Mild language"]',
  '["the-love-hypothesis","ugly-love","things-we-never-got-over"]',
  '["Fans of brother''s best friend trope","Readers who love playful, steamy banter","Those who enjoy smart heroines coming into their own"]',
  '["You prefer dark or angsty romance","You want fantasy settings"]',
  '["Funny","Steamy","Feel-good","Flirty"]'
);

-- 10. Heated Rivalry - Rachel Reid (MM Hockey Romance)
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'heated-rivalry',
  'Heated Rivalry',
  'Rachel Reid',
  'Shane Hollander and Ilya Rozanov are the biggest rivals in professional hockey. Publicly, they can''t stand each other. Privately, they''ve been having a secret affair for years. As their careers and feelings collide, they must decide if they''re willing to risk everything for a love that could destroy their reputations.',
  'https://images-na.ssl-images-amazon.com/images/P/1335468439.01._SCLZZZZZZZ_SX500_.jpg',
  4,
  371, 2019, '9781335468437',
  'https://www.amazon.com/dp/1335468439?tag=chessanalys05-20',
  'Very spicy with emotionally charged intimate scenes. The secret nature of their relationship adds intensity, and Reid writes M/M love scenes with both heat and tenderness.',
  'The MM hockey romance that took the genre by storm and became an HBO series. Rachel Reid delivers a secret relationship story with incredible emotional depth, sizzling chemistry, and a love story that will wreck you in the best way. Essential reading for sports romance fans.',
  6,
  'Dual POV', 'Very Steamy', 'Cornell Collins',
  'Game Changers', 2, 7,
  '["LGBTQ+ Romance","Sports Romance","Contemporary Romance"]',
  '["Homophobia themes","Closeted relationship","Explicit sexual content","Professional pressure"]',
  '["red-white-and-royal-blue","icebreaker"]',
  '["Fans of MM romance","Hockey romance lovers","Readers who love secret relationships and rivals-to-lovers"]',
  '["You prefer M/F romance only","You want fantasy or paranormal settings"]',
  '["Angsty","Passionate","Steamy","Emotional"]'
);


-- ============================================
-- 第三部分：插入 book_tropes 关联
-- ============================================

-- Haunting Adeline
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('haunting-adeline', 'dark-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('haunting-adeline', 'stalker-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('haunting-adeline', 'touch-her-and-die');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('haunting-adeline', 'who-did-this-to-you');

-- The Hating Game
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-hating-game', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-hating-game', 'office-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-hating-game', 'grumpy-sunshine');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-hating-game', 'slow-burn');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-hating-game', 'forced-proximity');

-- Icebreaker
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('icebreaker', 'forced-proximity');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('icebreaker', 'sports-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('icebreaker', 'college-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('icebreaker', 'grumpy-sunshine');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('icebreaker', 'he-falls-first');

-- A Hunger Like No Other
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('a-hunger-like-no-other', 'fated-mates');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('a-hunger-like-no-other', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('a-hunger-like-no-other', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('a-hunger-like-no-other', 'touch-her-and-die');

-- Dark Lover
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('dark-lover', 'fated-mates');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('dark-lover', 'dark-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('dark-lover', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('dark-lover', 'found-family');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('dark-lover', 'touch-her-and-die');

-- Red, White & Royal Blue
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('red-white-and-royal-blue', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('red-white-and-royal-blue', 'fake-dating');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('red-white-and-royal-blue', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('red-white-and-royal-blue', 'secret-identity');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('red-white-and-royal-blue', 'slow-burn');

-- Butcher & Blackbird
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('butcher-and-blackbird', 'dark-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('butcher-and-blackbird', 'friends-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('butcher-and-blackbird', 'forced-proximity');

-- Neon Gods
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('neon-gods', 'mythology-retelling');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('neon-gods', 'fake-dating');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('neon-gods', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('neon-gods', 'dark-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('neon-gods', 'age-gap');

-- Beautiful Player
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('beautiful-player', 'brothers-best-friend');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('beautiful-player', 'friends-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('beautiful-player', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('beautiful-player', 'he-falls-first');

-- Heated Rivalry
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('heated-rivalry', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('heated-rivalry', 'sports-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('heated-rivalry', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('heated-rivalry', 'slow-burn');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('heated-rivalry', 'secret-identity');
