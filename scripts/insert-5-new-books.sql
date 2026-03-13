-- ============================================================
-- 5 本新书 SQL 插入脚本
-- 覆盖关键词：spicy romance 2025, spicy fiction, enemies to lovers,
--   spicy mm books, spicy dark romance, boss romance
-- ============================================================

-- 1. The Deal - Elle Kennedy
-- 覆盖：spicy romance books, spicy books to read, enemies to lovers, fake dating
-- Off-Campus 系列开篇，BookTok 经典大学体育 romance
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'the-deal',
  'The Deal',
  'Elle Kennedy',
  'Hannah Wells has finally found someone who turns her on. But while she might be confident in every other area of her life, she carries baggage when it comes to sex and seduction. If she wants to get her crush''s attention, she''ll have to step out of her comfort zone and make him take notice. Enter Garrett Graham, captain of the hockey team and a total heartthrob. But Garrett has his own problems — he''s failing a class and needs a tutor. Hannah is smart enough to help, and Garrett is charming enough to coach her in the art of seduction. The deal is simple: she''ll tutor him, he''ll help her land her crush. But as their arrangement unfolds, the line between fake and real starts to blur.',
  'https://images-na.ssl-images-amazon.com/images/P/1508706255.01._SCLZZZZZZZ_SX500_.jpg',
  3,
  336, 2015, '9781508706250',
  'https://www.amazon.com/dp/1508706255?tag=chessanalys05-20',
  'Moderate spice with well-built tension. The intimate scenes develop naturally from the characters'' growing connection and are steamy without being overly explicit. The slow burn makes the payoff satisfying.',
  'The Deal is the gold standard for college sports romance. Elle Kennedy nails the fake-dating-to-real-feelings arc with sharp banter, genuine chemistry, and characters you actually root for. Garrett Graham is the hockey hero of your dreams — cocky but kind, and completely smitten once he falls.',
  3,
  'Dual POV', 'Steamy',
  'Lorelei Avalon',
  'Off-Campus', 1, 5,
  '["New Adult","College Romance","Sports Romance"]',
  '["Explicit sexual content","References to past trauma","Alcohol use"]',
  '["icebreaker","the-love-hypothesis","beautiful-player"]',
  '["Fans of college sports romance","Readers who love witty banter and slow burn","Anyone looking for a fun fake-dating story"]',
  '["You prefer high fantasy settings","You want very explicit spice (this is moderate)"]',
  '["Funny","Steamy","Feel-good","Romantic"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-deal', 'fake-dating');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-deal', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-deal', 'grumpy-sunshine');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-deal', 'sports-romance');


-- 2. Zodiac Academy: The Awakening - Caroline Peckham & Susanne Valenti
-- 覆盖：spicy romance books 2025, spicy fiction books, spicy books to read
-- BookTok 现象级 romantasy 系列，9 本系列开篇
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'zodiac-academy-the-awakening',
  'Zodiac Academy: The Awakening',
  'Caroline Peckham & Susanne Valenti',
  'Twin sisters Tory and Darcy Vega are thrust into a world of magic when they discover they are Fae and heirs to a powerful throne. Enrolled at Zodiac Academy, they must navigate a brutal social hierarchy where the four Celestial Heirs — including the infuriatingly arrogant Seth, Max, Caleb, and Darius — will stop at nothing to keep them from claiming their birthright. In a school where your star sign determines your power and bullying is practically curriculum, the twins must learn to fight back or be crushed.',
  'https://images-na.ssl-images-amazon.com/images/P/1916926258.01._SCLZZZZZZZ_SX500_.jpg',
  3,
  502, 2019, '9781916926257',
  'https://www.amazon.com/dp/1916926258?tag=chessanalys05-20',
  'The first book starts at a moderate spice level with strong romantic tension and some steamy moments. The series progressively gets spicier as relationships develop — later books reach scorching levels.',
  'Zodiac Academy is a BookTok phenomenon for good reason. Think Harry Potter meets ACOTAR with a bully romance twist. The worldbuilding is addictive, the magic system based on zodiac signs is creative, and the slow-burn romances will have you devouring all nine books. Fair warning: the bullying is intense in book one, but the payoff across the series is worth it.',
  2,
  'Dual POV', 'Steamy',
  'Bridget Bordeaux',
  'Zodiac Academy', 1, 9,
  '["Romantasy","New Adult","Paranormal Romance"]',
  '["Bullying","Explicit sexual content (increases in later books)","Violence","Blood"]',
  '["a-court-of-thorns-and-roses","fourth-wing","powerless"]',
  '["Fans of bully romance and academy settings","Readers who love long series with epic worldbuilding","Anyone who enjoyed ACOTAR and wants more Fae drama"]',
  '["You cannot handle bully romance tropes","You want a standalone — this is a 9-book commitment","You prefer clean romance"]',
  '["Intense","Dramatic","Addictive","Steamy"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('zodiac-academy-the-awakening', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('zodiac-academy-the-awakening', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('zodiac-academy-the-awakening', 'romantasy');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('zodiac-academy-the-awakening', 'found-family');


-- 3. A Touch of Darkness - Scarlett St. Clair
-- 覆盖：spicy dark romance, very spicy books, enemies to lovers, spicy fiction
-- Hades x Persephone 重述，和 Neon Gods 互补，Reddit/BookTok 高频推荐
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'a-touch-of-darkness',
  'A Touch of Darkness',
  'Scarlett St. Clair',
  'Persephone is a goddess of spring by title only. Since she can remember, flowers have only wilted at her touch. After striking a deal with Hades, God of the Dead, to improve her failing powers, Persephone finds herself drawn to the dark god despite her better judgment. As she navigates the Underworld and the treacherous politics of the Olympians, she discovers that Hades is nothing like the myths suggest — and that their connection runs deeper than any bargain.',
  'https://images-na.ssl-images-amazon.com/images/P/1728258456.01._SCLZZZZZZZ_SX500_.jpg',
  4,
  352, 2019, '9781728258454',
  'https://www.amazon.com/dp/1728258456?tag=chessanalys05-20',
  'Explicit and frequent intimate scenes with strong chemistry between the leads. The spice builds throughout the book and reaches very steamy levels. Hades is possessive and commanding, and the power dynamic adds extra heat.',
  'If you loved Neon Gods, A Touch of Darkness offers another irresistible take on the Hades and Persephone myth. Scarlett St. Clair creates a modern Olympus where gods walk among mortals, and the tension between Persephone''s independence and Hades'' dark allure is magnetic. The worldbuilding is rich, the romance is scorching, and the series only gets better.',
  6,
  'Dual POV', 'Scorching',
  'Meg Sylvan',
  'Hades x Persephone', 1, 3,
  '["Dark Romance","Paranormal Romance","Mythology Retelling"]',
  '["Explicit sexual content","Violence","Dubious consent elements","Power imbalance"]',
  '["neon-gods","from-blood-and-ash","a-court-of-mist-and-fury"]',
  '["Fans of Greek mythology retellings","Readers who love possessive dark heroes","Anyone who enjoyed Neon Gods and wants more Hades/Persephone"]',
  '["You prefer sweet or clean romance","You dislike power imbalance in relationships"]',
  '["Dark","Steamy","Intense","Romantic"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('a-touch-of-darkness', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('a-touch-of-darkness', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('a-touch-of-darkness', 'dark-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('a-touch-of-darkness', 'forced-proximity');


-- 4. Boyfriend Material - Alexis Hall
-- 覆盖：really spicy mm books, spicy romance books, fake dating
-- 最受欢迎的 MM fake-dating romance 之一，补充 MM 品类深度
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'boyfriend-material',
  'Boyfriend Material',
  'Alexis Hall',
  'Luc O''Donnell is tangentially — and reluctantly — famous. His rock star parents split when he was young, and the father he''s never met spent the next twenty years cruising in and out of rehab. Now that his dad''s making a comeback, Luc''s back in the public eye, and one compromising photo could ruin everything. His solution: find a nice, normal, fake boyfriend. Enter Oliver Blackwood, a barrister who is prim, proper, and utterly wrong for Luc in every way. But as their staged relationship unfolds, the line between pretend and real becomes impossibly blurred.',
  'https://images-na.ssl-images-amazon.com/images/P/1728206146.01._SCLZZZZZZZ_SX500_.jpg',
  2,
  432, 2020, '9781728206141',
  'https://www.amazon.com/dp/1728206146?tag=chessanalys05-20',
  'Warm and tender rather than scorching. The intimate scenes are present but handled with emotional depth rather than explicit detail. The focus is on the emotional connection and vulnerability between the characters.',
  'Boyfriend Material is the rom-com your heart needs. Alexis Hall writes with razor-sharp British wit, and the opposites-attract dynamic between chaotic Luc and buttoned-up Oliver is pure gold. It''s funny, heartfelt, and refreshingly real about what it means to be worthy of love. A must-read for anyone who loves fake-dating done right.',
  2,
  'First Person (Luc)', 'Warm',
  'Joe Jameson',
  'London Calling', 1, 2,
  '["MM Romance","Contemporary Romance","Romantic Comedy"]',
  '["References to parental neglect","Alcohol and drug use (discussed)","Anxiety"]',
  '["red-white-and-royal-blue","heated-rivalry","the-love-hypothesis"]',
  '["Fans of fake-dating and opposites attract","Readers who love British humor and witty dialogue","Anyone looking for heartfelt MM romance"]',
  '["You want very high spice — this is warm, not scorching","You prefer fantasy or paranormal settings"]',
  '["Funny","Heartwarming","Romantic","Feel-good"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('boyfriend-material', 'fake-dating');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('boyfriend-material', 'grumpy-sunshine');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('boyfriend-material', 'slow-burn');


-- 5. The Sweetest Oblivion - Danielle Lori
-- 覆盖：spicy dark romance, very spicy books, reddit spicy romance
-- Made 系列开篇，mafia dark romance 经典，BookTok/Reddit 高频推荐
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'the-sweetest-oblivion',
  'The Sweetest Oblivion',
  'Danielle Lori',
  'Nicknamed Sweet Abelli for her docile nature, Elena smiles on cue and has a charming response for everything. She''s the favored daughter, the perfect mafia principessa — or was. Now all she can see in the mirror''s reflection is blood staining her hands like crimson paint. She''s a romantic at heart living in the most unromantic of worlds. When her father betroths her to Nicolas Russo, the most dangerous Made Man in New York, Elena must navigate a world of violence, loyalty, and forbidden desire. Nico is everything she should fear — cold, calculating, and utterly magnetic.',
  'https://images-na.ssl-images-amazon.com/images/P/1721284443.01._SCLZZZZZZZ_SX500_.jpg',
  4,
  390, 2018, '9781721284443',
  'https://www.amazon.com/dp/1721284443?tag=chessanalys05-20',
  'Very spicy with explicit and intense intimate scenes. The chemistry between Elena and Nico is electric, and the power dynamics of the mafia setting add an extra layer of heat. Multiple steamy encounters that are detailed and passionate.',
  'The Sweetest Oblivion is the mafia romance that set the standard. Danielle Lori creates a world where danger and desire are inseparable, and the slow-burn tension between sweet Elena and ruthless Nico is absolutely addictive. If you loved Brutal Prince, this is the next book on your list. The Made series is a must for dark romance fans.',
  6,
  'Dual POV', 'Scorching',
  'Stacy Gonzalez, Evan Rowan',
  'Made', 1, 3,
  '["Dark Romance","Mafia Romance","Contemporary Romance"]',
  '["Explicit sexual content","Violence","Arranged marriage","Possessive hero","References to death and crime"]',
  '["brutal-prince","haunting-adeline","twisted-love"]',
  '["Fans of mafia and dark romance","Readers who love possessive alpha heroes","Anyone who enjoyed Brutal Prince and wants more organized crime romance"]',
  '["You dislike arranged marriage or possessive heroes","You prefer sweet or clean romance","You are uncomfortable with mafia/crime settings"]',
  '["Dark","Intense","Steamy","Addictive"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-sweetest-oblivion', 'arranged-marriage');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-sweetest-oblivion', 'dark-romance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-sweetest-oblivion', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-sweetest-oblivion', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-sweetest-oblivion', 'slow-burn');
