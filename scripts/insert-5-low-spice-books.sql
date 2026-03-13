-- ============================================================
-- 5 本低辣度新书 SQL 插入脚本
-- 补充 Level 0 (Clean) 和 Level 1 (Fade to Black) 空缺
-- ============================================================

-- 1. Pride and Prejudice - Jane Austen (Level 0 - Clean)
-- 经典中的经典，enemies-to-lovers 鼻祖，搜索量极高
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'pride-and-prejudice',
  'Pride and Prejudice',
  'Jane Austen',
  'When Elizabeth Bennet first meets eligible bachelor Fitzwilliam Darcy, she thinks him arrogant and conceited; he is indifferent to her good looks and lively mind. When she later discovers that Darcy has involved himself in the troubled relationship between his friend Bingley and her beloved sister Jane, she is determined to dislike him more than ever. In the sparkling comedy of manners that follows, Jane Austen shows the folly of judging by first impressions and celebrates the forgiving nature of true love.',
  'https://images-na.ssl-images-amazon.com/images/P/0141439513.01._SCLZZZZZZZ_SX500_.jpg',
  0,
  432, 1813, '9780141439518',
  'https://www.amazon.com/dp/0141439513?tag=chessanalys05-20',
  'No spice whatsoever. This is a clean romance focused entirely on witty dialogue, social commentary, and the slow-burn tension between Elizabeth and Darcy. The romance is conveyed through longing glances, letters, and sharp conversation.',
  'The original enemies-to-lovers. Over 200 years later, Pride and Prejudice remains the gold standard for romantic tension built on misunderstanding, pride, and the slow realization of love. If you want to understand where every modern romance trope began, start here. Austen''s wit is timeless.',
  0,
  'Third Person', 'No Spice',
  'Rosamund Pike',
  NULL, NULL, NULL,
  '["Classic Literature","Historical Romance","Regency Romance"]',
  '[]',
  '["the-duke-and-i","devil-in-winter","secrets-of-a-summer-night"]',
  '["Fans of Bridgerton who want the original inspiration","Readers who love witty banter and slow-burn tension","Anyone looking for a clean, timeless love story"]',
  '["You want explicit spice — this has none","You prefer fast-paced modern romance"]',
  '["Witty","Romantic","Classic","Feel-good"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('pride-and-prejudice', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('pride-and-prejudice', 'slow-burn');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('pride-and-prejudice', 'historical-romance');


-- 2. To All the Boys I've Loved Before - Jenny Han (Level 0 - Clean)
-- Netflix 影视化大热，YA clean romance 代表作，搜索量极高
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'to-all-the-boys-ive-loved-before',
  'To All the Boys I''ve Loved Before',
  'Jenny Han',
  'Lara Jean Song keeps her love letters in a hatbox her mother gave her. They aren''t love letters that anyone else wrote for her — these are ones she''s written. One for every boy she''s ever loved, five in all. When she writes, she pours out her heart and soul and says all the things she would never say in real life. The letters are for her eyes only. Until the day her secret letters are mailed, and suddenly Lara Jean''s love life goes from imaginary to out of control.',
  'https://images-na.ssl-images-amazon.com/images/P/1442426713.01._SCLZZZZZZZ_SX500_.jpg',
  0,
  355, 2014, '9781442426719',
  'https://www.amazon.com/dp/1442426713?tag=chessanalys05-20',
  'Completely clean. This is a sweet YA romance with no intimate scenes. The romance is built on butterflies, hand-holding, and the excitement of first love.',
  'To All the Boys is the ultimate feel-good romance. Jenny Han captures the giddiness and anxiety of first love perfectly. The fake-dating setup between Lara Jean and Peter Kavinsky is adorable, and the Korean-American family dynamics add warmth and depth. A perfect gateway into romance for readers of any age.',
  0,
  'First Person', 'No Spice',
  'Laura Knight Keating',
  'To All the Boys I''ve Loved Before', 1, 3,
  '["Young Adult","Contemporary Romance","Romantic Comedy"]',
  '["Loss of a parent (backstory)"]',
  '["pride-and-prejudice","the-love-hypothesis"]',
  '["Fans of sweet, clean romance with zero spice","Readers who loved the Netflix movies","Anyone looking for a heartwarming first-love story"]',
  '["You want any level of spice — this is completely clean","You prefer adult romance with mature themes"]',
  '["Sweet","Heartwarming","Funny","Feel-good"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('to-all-the-boys-ive-loved-before', 'fake-dating');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('to-all-the-boys-ive-loved-before', 'secret-identity');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('to-all-the-boys-ive-loved-before', 'love-triangle');


-- 3. The Notebook - Nicholas Sparks (Level 1 - Fade to Black)
-- 经典爱情小说，影视化大热，搜索量极高，fade to black 代表作
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'the-notebook',
  'The Notebook',
  'Nicholas Sparks',
  'Every so often a love story captures our hearts and becomes more than just a story — it becomes an experience to treasure and to share. The Notebook is such a book. It is a celebration of a passion both timeless and overwhelming, a tale of laughter and tears, and makes us believe in true love all over again. Set amid the austere beauty of the North Carolina coast, The Notebook begins with the story of Noah Calhoun, a rural Southerner recently returned from World War II. Noah is restoring a plantation home to its former glory, and he is haunted by images of the beautiful girl he met years earlier.',
  'https://images-na.ssl-images-amazon.com/images/P/1455582883.01._SCLZZZZZZZ_SX500_.jpg',
  1,
  214, 1996, '9781455582884',
  'https://www.amazon.com/dp/1455582883?tag=chessanalys05-20',
  'Mild spice with fade-to-black intimacy. The romance is deeply emotional and passionate, but intimate scenes are implied rather than described. The focus is on the enduring power of love across decades.',
  'The Notebook is the love story that made the world cry. Nicholas Sparks crafts a tale of devotion that spans a lifetime, and the dual timeline — young love and elderly love — hits differently depending on where you are in life. If you want a romance that''s about the depth of commitment rather than heat, this is it.',
  0,
  'Third Person', 'Mild',
  'Kate Nelligan',
  NULL, NULL, NULL,
  '["Contemporary Romance","Literary Fiction","Historical Romance"]',
  '["Alzheimer''s/dementia themes","War references","Emotional content"]',
  '["pride-and-prejudice","it-ends-with-us"]',
  '["Readers who want emotional depth over spice","Fans of the movie who want the original story","Anyone who loves sweeping, timeless love stories"]',
  '["You want explicit or steamy content","You prefer fast-paced or action-driven romance"]',
  '["Emotional","Romantic","Bittersweet","Heartwarming"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-notebook', 'second-chance');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-notebook', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-notebook', 'slow-burn');


-- 4. The Cruel Prince - Holly Black (Level 0 - Clean)
-- YA Fantasy romance 经典，enemies-to-lovers，BookTok 热门，搜索量极高
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'the-cruel-prince',
  'The Cruel Prince',
  'Holly Black',
  'Jude was seven years old when her parents were murdered and she and her two sisters were stolen away to live in the treacherous High Court of Faerie. Ten years later, Jude wants nothing more than to belong there, despite her mortality. But many of the fey despise humans. Especially Prince Cardan, the youngest and wickedest son of the High King. To win a place in the Court, she must defy him — and face the consequences. In doing so, she becomes embroiled in palace intrigues and deceptions, discovering her own capacity for bloodshed.',
  'https://images-na.ssl-images-amazon.com/images/P/0316310271.01._SCLZZZZZZZ_SX500_.jpg',
  0,
  370, 2018, '9780316310277',
  'https://www.amazon.com/dp/0316310271?tag=chessanalys05-20',
  'No spice. This is a YA fantasy with intense romantic tension but no intimate scenes on page. The chemistry between Jude and Cardan is built on power plays, hatred, and reluctant fascination — all conveyed through tension rather than physical scenes.',
  'The Cruel Prince is enemies-to-lovers perfected. Holly Black creates a Faerie court that is beautiful and brutal in equal measure, and the dynamic between mortal Jude and cruel Prince Cardan is one of the most compelling in YA fantasy. The political intrigue is sharp, the twists are genuinely surprising, and the slow-burn romance will destroy you in the best way.',
  0,
  'First Person', 'No Spice',
  'Caitlin Kelly',
  'The Folk of the Air', 1, 3,
  '["Young Adult","Fantasy Romance","Dark Fantasy"]',
  '["Violence","Murder","Bullying","Parental death"]',
  '["a-court-of-thorns-and-roses","powerless","zodiac-academy-the-awakening"]',
  '["Fans of Fae romance who want zero spice","Readers who love morally grey characters and court intrigue","Anyone who enjoyed ACOTAR but wants a clean version"]',
  '["You want any level of spice","You prefer contemporary settings"]',
  '["Dark","Intense","Addictive","Dramatic"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-cruel-prince', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-cruel-prince', 'forbidden-love');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('the-cruel-prince', 'slow-burn');


-- 5. Beach Read - Emily Henry (Level 1 - Fade to Black)
-- BookTok 超级热门，Emily Henry 成名作，rom-com 经典
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'beach-read',
  'Beach Read',
  'Emily Henry',
  'Augustus Everett is an acclaimed author of literary fiction. January Andrews writes bestselling romance. When she pens a happily ever after, he kills off his entire cast. They''re polar opposites. In fact, the only thing they have in common is that for the next three months, they''re living in neighboring beach houses, broke, and bogged down with writer''s block. Until, on a whim, they strike a deal: Augustus will write something happy, and January will pen the next Great American Novel. They''ll swap genres and see who can finish first. The game is on — but the stakes might be higher than either of them planned.',
  'https://images-na.ssl-images-amazon.com/images/P/1984806734.01._SCLZZZZZZZ_SX500_.jpg',
  1,
  361, 2020, '9781984806734',
  'https://www.amazon.com/dp/1984806734?tag=chessanalys05-20',
  'Mild spice with one fade-to-black scene. The romance is built on witty banter, emotional vulnerability, and the tension of two writers challenging each other. The focus is firmly on the emotional connection rather than physical intimacy.',
  'Beach Read put Emily Henry on the map and launched a thousand BookTok videos. It''s a rom-com with surprising emotional depth — beneath the banter and the beach-house setting, there''s a real story about grief, disillusionment, and finding your way back to believing in love. Smart, funny, and genuinely moving.',
  1,
  'First Person', 'Mild',
  'Julia Whelan',
  NULL, NULL, NULL,
  '["Contemporary Romance","Romantic Comedy","Literary Fiction"]',
  '["Grief and loss","Infidelity (parental, backstory)","Emotional content"]',
  '["the-love-hypothesis","the-hating-game","boyfriend-material"]',
  '["Readers who want romance with literary depth","Fans of witty banter and rivals-to-lovers","Anyone looking for a beach read that''s actually about something"]',
  '["You want high spice — this is very mild","You prefer fantasy or paranormal settings"]',
  '["Funny","Romantic","Bittersweet","Feel-good"]'
);

INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('beach-read', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('beach-read', 'forced-proximity');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('beach-read', 'grumpy-sunshine');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('beach-read', 'slow-burn');
