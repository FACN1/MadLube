BEGIN;

DROP TABLE IF EXISTS users, posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  dish VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  description TEXT,
  chef_name VARCHAR(255) NOT NULL,
  background_color VARCHAR(25) NOT NULL,
  date_published TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, name) VALUES
('username', 'name'),
('username2', 'Test Name');

INSERT INTO posts (dish, user_id, description, chef_name, background_color) VALUES
('mohamed''s meat balls', 1, 'Mohamed came round and brought some meatballs and rice that his Mum made for us and it was AMAZING! And we ate it all and then we watched the matrix and everyone was really tired because it was like 2 hours long but it didn''t matter cos it was database week', 'mohamed''s Mum', 'blue'),
('Eoin''s Ratatouille', 1, 'Eoin and Shireen made  a load of Ratatouille and rice and some other stuff and Shireen played some really funny music and then we had an early one because it had been a long day. The ratatouille was great!', 'Eoin', 'green'),
('Lubes'' Lasagne', 2, 'Lubes doesnt even eat meat! Why did he bother making lasagne when he doesnt eat meat!? Everyone laughed. HAHAHAHAHA. Also Emily likes eating socks. Wierd.', 'Lubes', 'purple');

COMMIT;
