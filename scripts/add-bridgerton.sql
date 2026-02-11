-- Bridgerton Series by Julia Quinn (8 books)
-- Generated for SpicyBooks D1 database

-- New tropes needed
INSERT OR REPLACE INTO tropes (slug, name, description, emoji) VALUES ('historical-romance', 'Historical Romance', 'Romance set in a historical period, often Regency era', '🏛️');
INSERT OR REPLACE INTO tropes (slug, name, description, emoji) VALUES ('marriage-of-convenience', 'Marriage of Convenience', 'A practical marriage that unexpectedly turns into love', '💒');
INSERT OR REPLACE INTO tropes (slug, name, description, emoji) VALUES ('rake-reformed', 'Rake Reformed', 'A notorious playboy who changes his ways for love', '🎩');
INSERT OR REPLACE INTO tropes (slug, name, description, emoji) VALUES ('secret-identity', 'Secret Identity', 'A character hiding their true identity from their love interest', '🎭');
INSERT OR REPLACE INTO tropes (slug, name, description, emoji) VALUES ('cinderella-retelling', 'Cinderella Retelling', 'A rags-to-riches romance inspired by the classic fairy tale', '👠');
INSERT OR REPLACE INTO tropes (slug, name, description, emoji) VALUES ('pen-pals-to-lovers', 'Pen Pals to Lovers', 'Characters who fall in love through written correspondence', '✉️');
INSERT OR REPLACE INTO tropes (slug, name, description, emoji) VALUES ('unrequited-love', 'Unrequited Love', 'One-sided love that eventually becomes mutual', '💔');

-- Book 1: The Duke and I
INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (
  'the-duke-and-i',
  'The Duke and I',
  'Julia Quinn',
  'Daphne Bridgerton has always been a wallflower. When the Duke of Hastings, Simon Basset, proposes a fake courtship to keep the matchmaking mamas at bay, neither expects their pretend romance to ignite real passion.',
  'https://covers.openlibrary.org/b/isbn/9780380800827-L.jpg',
  3,
  384,
  2000,
  '9780380800827',
  'https://www.amazon.com/dp/0380800829?tag=chessanalys05-20',
  'The Duke and I features several intimate scenes between Daphne and Simon that are moderately explicit. The tension builds through their fake courtship, and the physical scenes arrive after their marriage. There are approximately 3-4 intimate scenes. The book contains a controversial scene where Daphne takes advantage of Simon while he is intoxicated, which many readers consider non-consensual. This scene is important to be aware of before reading.',
  'The Duke and I launched the Bridgerton phenomenon long before Netflix made it a household name. Julia Quinn''s Regency romance introduces us to the sprawling Bridgerton family through Daphne, the fourth child who is beautiful, witty, and utterly overlooked by eligible bachelors. Enter Simon Basset, the brooding Duke of Hastings, who has sworn never to marry or have children due to a vow against his cruel father. Their fake courtship is a classic setup executed with Quinn''s signature wit and charm. The banter is sharp, the Regency setting is lush without being stuffy, and Lady Whistledown''s gossip columns add delightful flavor. The romance builds naturally from pretense to genuine feeling, and the spicy scenes are satisfying. However, readers should be aware of a controversial consent scene that has sparked significant discussion. Despite this, the book remains a beloved entry point into historical romance.',
  4,
  'Third person (multiple POV)',
  'Moderate to explicit',
  'Rosalyn Landor',
  'Bridgerton',
  1,
  8,
  '["Historical Romance","Regency Romance"]',
  '["Non-consensual scene (controversial)","Explicit sexual content","Emotional manipulation","Parental abuse (backstory)","Pregnancy themes"]',
  '["the-viscount-who-loved-me","a-court-of-thorns-and-roses","an-offer-from-a-gentleman"]',
  '["Fans of the Netflix Bridgerton series wanting the source material","Readers who love fake dating tropes in historical settings","Those who enjoy witty Regency romance with strong family dynamics","Anyone looking for a gateway into historical romance"]',
  '["The controversial consent scene is a dealbreaker for you","You want very high spice — this is moderate","You prefer contemporary settings","You dislike Regency-era social rules as plot devices"]',
  '["Witty","Romantic","Charming","Dramatic","Feel-good"]'
);

-- Book 2: The Viscount Who Loved Me
INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (
  'the-viscount-who-loved-me',
  'The Viscount Who Loved Me',
  'Julia Quinn',
  'Anthony Bridgerton, the eldest son and head of the family, has decided it is time to marry. But his intended bride''s older sister Kate Sheffield is determined to stop the match, leading to a battle of wits and an unexpected attraction.',
  'https://covers.openlibrary.org/b/isbn/9780380815579-L.jpg',
  3,
  352,
  2000,
  '9780380815579',
  'https://www.amazon.com/dp/0380815575?tag=chessanalys05-20',
  'The Viscount Who Loved Me is a slow burn with moderate spice. The tension between Anthony and Kate builds over the entire book through their verbal sparring and reluctant attraction. The intimate scenes arrive later in the book and are written with warmth and passion but are not as explicit as some modern romance. Expect 2-3 steamy scenes that feel earned after all that delicious tension.',
  'Widely considered the best book in the Bridgerton series, The Viscount Who Loved Me is enemies-to-lovers perfection. Anthony Bridgerton is determined to marry for duty, not love, after witnessing his father''s death and developing a deep fear of his own mortality. Kate Sheffield is equally stubborn, fiercely protective of her younger sister, and absolutely not going to let a known rake marry into her family. Their verbal sparring is electric, the pall-mall scene is iconic, and Quinn masterfully peels back Anthony''s bravado to reveal genuine vulnerability. The romance builds slowly and satisfyingly, with every stolen glance and accidental touch carrying weight. This is the book that made BookTok fall in love with the enemies-to-lovers trope in historical romance. Season 2 of the Netflix show is based on this book, and many fans argue the book is even better.',
  3,
  'Third person (multiple POV)',
  'Moderate with excellent buildup',
  'Rosalyn Landor',
  'Bridgerton',
  2,
  8,
  '["Historical Romance","Regency Romance"]',
  '["Death of a parent (backstory)","Anxiety and panic attacks","Explicit sexual content","Fear of death","Bee sting allergy (life-threatening)"]',
  '["the-duke-and-i","an-offer-from-a-gentleman","romancing-mister-bridgerton"]',
  '["Enemies-to-lovers fans — this is peak execution","Readers who loved Bridgerton Season 2","Those who enjoy slow burn with witty banter","Fans of strong-willed heroines who don''t back down","Anyone who wants historical romance with emotional depth"]',
  '["You want high spice from the start","Slow burn frustrates you","You prefer contemporary settings","You want a standalone — this works best as part of the series"]',
  '["Witty","Swoony","Tension-filled","Emotional","Charming"]'
);

-- Book 3: An Offer From a Gentleman
INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (
  'an-offer-from-a-gentleman',
  'An Offer From a Gentleman',
  'Julia Quinn',
  'Benedict Bridgerton meets a mysterious woman at a masquerade ball and is captivated. When he discovers her true identity as Sophie Beckett, a nobleman''s illegitimate daughter working as a servant, their different stations threaten to keep them apart.',
  'https://covers.openlibrary.org/b/isbn/9780380815586-L.jpg',
  3,
  384,
  2001,
  '9780380815586',
  'https://www.amazon.com/dp/0380815583?tag=chessanalys05-20',
  'An Offer From a Gentleman has moderate spice with 2-3 intimate scenes. The physical relationship develops after significant emotional buildup, and the scenes are tender and passionate. The class difference between Benedict and Sophie adds an extra layer of tension to their intimate moments. Quinn writes these scenes with warmth rather than raw heat.',
  'An Offer From a Gentleman is Julia Quinn''s Cinderella retelling, and it''s one of the most emotionally compelling books in the Bridgerton series. Sophie Beckett is the illegitimate daughter of an earl, treated cruelly by her stepmother and forced into servitude. When she sneaks into a masquerade ball and meets Benedict Bridgerton, it''s magic — but the clock strikes midnight and she vanishes. Years later, their paths cross again under very different circumstances. The class dynamics create real stakes that feel more grounded than typical Regency romance. Sophie is a heroine you root for fiercely, and Benedict''s struggle between societal expectations and his heart is genuinely moving. The Bridgerton family warmth shines through, especially in how they ultimately embrace Sophie. It''s a fairy tale with teeth.',
  3,
  'Third person (multiple POV)',
  'Moderate with emotional depth',
  'Rosalyn Landor',
  'Bridgerton',
  3,
  8,
  '["Historical Romance","Regency Romance"]',
  '["Class discrimination","Verbal and emotional abuse","Illegitimacy stigma","Sexual content","Attempted sexual assault","Servitude"]',
  '["the-duke-and-i","the-viscount-who-loved-me","romancing-mister-bridgerton"]',
  '["Cinderella retelling fans","Readers who love class-crossing romance","Those who enjoy masquerade ball meet-cutes","Fans of emotionally rich historical romance","Anyone who roots for the underdog heroine"]',
  '["Abuse and class cruelty are triggering for you","You want high spice levels","You prefer enemies-to-lovers over Cinderella dynamics","You dislike stories with significant power imbalances"]',
  '["Fairy tale","Emotional","Romantic","Heartwarming","Bittersweet"]'
);

-- Book 4: Romancing Mister Bridgerton
INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (
  'romancing-mister-bridgerton',
  'Romancing Mister Bridgerton',
  'Julia Quinn',
  'Penelope Featherington has been in love with Colin Bridgerton for years, but he has never seen her as more than a friend. When Colin finally notices the woman Penelope has become, secrets threaten to tear them apart — including the biggest secret in all of London.',
  'https://covers.openlibrary.org/b/isbn/9780380820849-L.jpg',
  3,
  370,
  2002,
  '9780380820849',
  'https://www.amazon.com/dp/0380820854?tag=chessanalys05-20',
  'Romancing Mister Bridgerton has moderate spice with 2-3 intimate scenes. The physical relationship develops after Colin finally recognizes his feelings for Penelope, and the scenes are sweet and passionate. The emotional connection between the characters makes the intimate moments feel particularly satisfying. This is more about the emotional payoff than raw heat.',
  'Romancing Mister Bridgerton is the fan-favorite that inspired Bridgerton Season 3, and for good reason. Penelope Featherington has been quietly in love with Colin Bridgerton since she was a teenager, watching from the sidelines as he charmed his way through London society. But Penelope has a secret — she is Lady Whistledown, the anonymous gossip columnist who has been skewering the ton for years. When Colin finally sees Penelope as more than his sister''s friend, their romance is sweet, funny, and deeply satisfying. But the Lady Whistledown reveal creates genuine stakes. Quinn handles the friends-to-lovers transition beautifully, and the moment Colin realizes what Penelope means to him is one of the best scenes in the entire series. This is the book for readers who love a slow-building romance where the heroine has been there all along.',
  3,
  'Third person (multiple POV)',
  'Moderate, emotionally driven',
  'Rosalyn Landor',
  'Bridgerton',
  4,
  8,
  '["Historical Romance","Regency Romance"]',
  '["Secret identity reveal","Public humiliation","Explicit sexual content","Betrayal of trust","Social ostracism"]',
  '["the-viscount-who-loved-me","to-sir-phillip-with-love","the-duke-and-i"]',
  '["Fans of Bridgerton Season 3 (Polin)","Friends-to-lovers enthusiasts","Readers who love secret identity reveals","Those who root for the wallflower heroine","Anyone who enjoys witty, character-driven romance"]',
  '["You want high spice — this is moderate","Secret-keeping as a plot device frustrates you","You haven''t read the earlier books — some context helps","You prefer action-heavy romance over character studies"]',
  '["Swoony","Witty","Heartwarming","Satisfying","Charming"]'
);

-- Book 5: To Sir Phillip, With Love
INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (
  'to-sir-phillip-with-love',
  'To Sir Phillip, With Love',
  'Julia Quinn',
  'After years of exchanging letters with Sir Phillip Crane, a brooding botanist and widower, Eloise Bridgerton impulsively travels to his estate. What she finds is a man nothing like his letters — gruff, awkward, and struggling to raise his two unruly children alone.',
  'https://covers.openlibrary.org/b/isbn/9780380820856-L.jpg',
  3,
  370,
  2003,
  '9780380820856',
  'https://www.amazon.com/dp/006053208X?tag=chessanalys05-20',
  'To Sir Phillip, With Love has moderate spice with 2-3 intimate scenes. The physical chemistry between Eloise and Phillip is grounded in their growing emotional connection. Phillip is physically large and somewhat awkward, which Quinn uses to create endearing intimate moments. The scenes are warm and passionate without being overly explicit.',
  'To Sir Phillip, With Love is the most unique book in the Bridgerton series. Instead of London ballrooms, it''s set in the countryside, and instead of a dashing rake, the hero is a grieving widower who is terrible with words but wonderful with plants. Eloise Bridgerton — the most independent and outspoken of the siblings — finds herself drawn to Phillip through their correspondence, only to discover the real man is far more complicated than his letters suggested. The grumpy/sunshine dynamic works beautifully here, and the addition of Phillip''s two wild children adds warmth and humor. Quinn explores themes of grief, depression, and finding love after loss with surprising sensitivity. This is the Bridgerton book for readers who want something quieter and more emotionally complex.',
  3,
  'Third person (multiple POV)',
  'Moderate with tenderness',
  'Rosalyn Landor',
  'Bridgerton',
  5,
  8,
  '["Historical Romance","Regency Romance"]',
  '["Depression","Suicide (off-page, backstory)","Grief","Explicit sexual content","Difficult children","Emotional neglect"]',
  '["romancing-mister-bridgerton","when-he-was-wicked","the-viscount-who-loved-me"]',
  '["Grumpy/sunshine fans","Readers who love pen pals to lovers","Those who enjoy single parent romance","Fans of countryside settings over London ballrooms","Anyone who appreciates romance with themes of healing"]',
  '["Suicide as a backstory element is triggering","You want a fast-paced London society romance","You prefer very high spice levels","You dislike children as significant characters in romance"]',
  '["Tender","Healing","Quiet","Emotional","Heartwarming"]'
);

-- Book 6: When He Was Wicked
INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (
  'when-he-was-wicked',
  'When He Was Wicked',
  'Julia Quinn',
  'Michael Stirling has been in love with Francesca Bridgerton since the moment he met her — but she married his cousin. After her husband''s death, Michael struggles with guilt and desire as he and Francesca navigate grief, friendship, and an attraction neither can deny.',
  'https://covers.openlibrary.org/b/isbn/9780060531232-L.jpg',
  4,
  384,
  2004,
  '9780060531232',
  'https://www.amazon.com/dp/0060531231?tag=chessanalys05-20',
  'When He Was Wicked is the spiciest book in the Bridgerton series. The years of suppressed desire between Michael and Francesca explode into several explicit scenes once they finally come together. There are approximately 4-5 steamy scenes that are more detailed than the other Bridgerton books. The guilt and longing that precede the physical relationship make the intimate moments feel incredibly charged.',
  'When He Was Wicked is the darkest and most emotionally complex book in the Bridgerton series, and many readers consider it Quinn''s finest work. Michael Stirling''s unrequited love for his cousin''s wife is agonizing — he loves Francesca desperately but is a good enough man to never act on it. When John dies unexpectedly, Michael is consumed by guilt: grief for his cousin, relief that Francesca is free, and self-loathing for feeling that relief. The years-long slow burn is unlike anything else in the series. When Michael and Francesca finally come together, the payoff is extraordinary. This is also the spiciest Bridgerton book by a significant margin. Quinn tackles grief, survivor''s guilt, and the question of whether it''s possible to love again with remarkable maturity. This is not a light, witty romp — it''s a deeply felt love story.',
  5,
  'Third person (multiple POV)',
  'Explicit with intense emotional charge',
  'Rosalyn Landor',
  'Bridgerton',
  6,
  8,
  '["Historical Romance","Regency Romance"]',
  '["Death of a spouse","Grief and mourning","Survivor''s guilt","Explicit sexual content","Unrequited love","Infertility themes","Self-destructive behavior"]',
  '["to-sir-phillip-with-love","the-viscount-who-loved-me","the-duke-and-i"]',
  '["Readers who want the spiciest Bridgerton book","Fans of unrequited love finally fulfilled","Those who appreciate emotionally heavy romance","Readers who love tortured heroes","Anyone who wants romance that deals honestly with grief"]',
  '["Grief and death themes are triggering","You want a light, fun read","You prefer the witty banter of earlier books","Infertility as a plot point bothers you"]',
  '["Angsty","Intense","Passionate","Emotional","Dark"]'
);

-- Book 7: It's In His Kiss
INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (
  'its-in-his-kiss',
  'It''s In His Kiss',
  'Julia Quinn',
  'Hyacinth Bridgerton is sharp-tongued, opinionated, and not everyone''s cup of tea. Gareth St. Clair needs help translating his late grandmother''s Italian diary and reluctantly turns to Hyacinth. What starts as a practical arrangement turns into something neither expected.',
  'https://covers.openlibrary.org/b/isbn/9780060531249-L.jpg',
  3,
  384,
  2005,
  '9780060531249',
  'https://www.amazon.com/dp/006053124X?tag=chessanalys05-20',
  'It''s In His Kiss has moderate spice with 2-3 intimate scenes. The chemistry between Hyacinth and Gareth builds through their verbal sparring and shared adventure of translating the diary. The intimate scenes are passionate and well-written, with Hyacinth''s bold personality carrying into the bedroom. Moderate heat that serves the story well.',
  'It''s In His Kiss gives us Hyacinth, the youngest Bridgerton daughter and arguably the most entertaining character in the series. She''s loud, bossy, brilliant, and completely unapologetic about it. Gareth St. Clair is her perfect match — equally stubborn, with a complicated family history and a mysterious grandmother''s diary that needs translating. The treasure hunt element adds a fun adventure layer to the romance, and the banter between Hyacinth and Gareth is some of Quinn''s sharpest writing. The book also deals with Gareth''s difficult relationship with his father, adding emotional weight. This is a lighter, more fun entry in the series after the emotional intensity of When He Was Wicked, and Hyacinth''s irrepressible personality makes it a joy to read.',
  3,
  'Third person (multiple POV)',
  'Moderate with playful energy',
  'Rosalyn Landor',
  'Bridgerton',
  7,
  8,
  '["Historical Romance","Regency Romance"]',
  '["Parental rejection","Family estrangement","Explicit sexual content","Emotional abuse (backstory)","Illegitimacy themes"]',
  '["romancing-mister-bridgerton","on-the-way-to-the-wedding","the-viscount-who-loved-me"]',
  '["Fans of bold, outspoken heroines","Readers who enjoy adventure mixed with romance","Those who love witty banter and verbal sparring","Fans of treasure hunt storylines","Anyone who wants a fun, lighter historical romance"]',
  '["You prefer quiet, demure heroines","You want very high spice","You dislike subplot-heavy romance","Family drama as a theme bothers you"]',
  '["Fun","Witty","Adventurous","Charming","Light-hearted"]'
);

-- Book 8: On the Way to the Wedding
INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (
  'on-the-way-to-the-wedding',
  'On the Way to the Wedding',
  'Julia Quinn',
  'Gregory Bridgerton believes in love at first sight, and when he sees Hermione Watson, he''s sure she''s the one. But it''s her best friend Lucy Abernathy who captures his attention in unexpected ways, even as Lucy is being forced into an unwanted engagement.',
  'https://covers.openlibrary.org/b/isbn/9780060531256-L.jpg',
  3,
  384,
  2006,
  '9780060531256',
  'https://www.amazon.com/dp/0060531258?tag=chessanalys05-20',
  'On the Way to the Wedding has moderate spice with 2-3 intimate scenes. The romance between Gregory and Lucy builds through their growing friendship and shared predicament. The intimate scenes are sweet and passionate, reflecting the genuine emotional connection between the characters. Similar spice level to most of the series.',
  'On the Way to the Wedding closes out the Bridgerton series with Gregory, the second-youngest sibling and the most romantic of the bunch. Gregory believes wholeheartedly in love at first sight — a belief that leads him astray when he falls for the wrong woman. Lucy Abernathy, practical and overlooked, is the one who truly understands him, but she''s trapped in an engagement she doesn''t want. Quinn plays with the idea of what love really looks like versus what we think it should look like. The book won the Romance Writers of America RITA Award in 2007, and it''s a fitting conclusion to the series — warm, funny, and ultimately about finding love where you least expect it. The Bridgerton family dynamics are at their best here, with all the siblings making appearances.',
  3,
  'Third person (multiple POV)',
  'Moderate with romantic sweetness',
  'Rosalyn Landor',
  'Bridgerton',
  8,
  8,
  '["Historical Romance","Regency Romance"]',
  '["Forced engagement","Explicit sexual content","Manipulation by a villain","Physical danger","Emotional pressure"]',
  '["its-in-his-kiss","the-duke-and-i","romancing-mister-bridgerton"]',
  '["Readers who want to complete the Bridgerton series","Fans of wrong-person-to-right-person romance","Those who enjoy sweet, optimistic heroes","RITA Award-winning romance readers","Anyone who loves a satisfying series conclusion"]',
  '["You want high spice — this is moderate","Love triangles (even mild ones) bother you","You prefer dark, angsty romance","You haven''t read the earlier books — start from the beginning"]',
  '["Romantic","Sweet","Charming","Feel-good","Satisfying"]'
);

-- Book-Trope relations for all 8 Bridgerton books

-- The Duke and I
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-duke-and-i', 'fake-dating');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-duke-and-i', 'rake-reformed');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-duke-and-i', 'historical-romance');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-duke-and-i', 'he-falls-first');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-duke-and-i', 'marriage-of-convenience');

-- The Viscount Who Loved Me
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-viscount-who-loved-me', 'enemies-to-lovers');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-viscount-who-loved-me', 'slow-burn');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-viscount-who-loved-me', 'historical-romance');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-viscount-who-loved-me', 'grumpy-sunshine');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('the-viscount-who-loved-me', 'forbidden-love');

-- An Offer From a Gentleman
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('an-offer-from-a-gentleman', 'cinderella-retelling');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('an-offer-from-a-gentleman', 'historical-romance');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('an-offer-from-a-gentleman', 'secret-identity');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('an-offer-from-a-gentleman', 'forbidden-love');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('an-offer-from-a-gentleman', 'he-falls-first');

-- Romancing Mister Bridgerton
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('romancing-mister-bridgerton', 'friends-to-lovers');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('romancing-mister-bridgerton', 'secret-identity');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('romancing-mister-bridgerton', 'historical-romance');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('romancing-mister-bridgerton', 'slow-burn');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('romancing-mister-bridgerton', 'he-falls-first');

-- To Sir Phillip, With Love
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('to-sir-phillip-with-love', 'pen-pals-to-lovers');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('to-sir-phillip-with-love', 'grumpy-sunshine');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('to-sir-phillip-with-love', 'historical-romance');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('to-sir-phillip-with-love', 'forced-proximity');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('to-sir-phillip-with-love', 'second-chance');

-- When He Was Wicked
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('when-he-was-wicked', 'unrequited-love');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('when-he-was-wicked', 'slow-burn');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('when-he-was-wicked', 'historical-romance');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('when-he-was-wicked', 'forbidden-love');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('when-he-was-wicked', 'second-chance');

-- It's In His Kiss
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('its-in-his-kiss', 'enemies-to-lovers');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('its-in-his-kiss', 'historical-romance');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('its-in-his-kiss', 'forced-proximity');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('its-in-his-kiss', 'he-falls-first');

-- On the Way to the Wedding
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('on-the-way-to-the-wedding', 'friends-to-lovers');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('on-the-way-to-the-wedding', 'historical-romance');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('on-the-way-to-the-wedding', 'arranged-marriage');
INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES ('on-the-way-to-the-wedding', 'he-falls-first');
