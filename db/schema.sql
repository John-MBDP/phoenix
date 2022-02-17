DROP TABLE IF EXISTS lawyer_favourites CASCADE;

DROP TABLE IF EXISTS lawfirm_favourites CASCADE;

DROP TABLE IF EXISTS article_favourites CASCADE;

DROP TABLE IF EXISTS lawfirm_members CASCADE;

DROP TABLE IF EXISTS messages CASCADE;

DROP TABLE IF EXISTS articles CASCADE;

DROP TABLE IF EXISTS lawyers CASCADE;

DROP TABLE IF EXISTS lawfirms CASCADE;

DROP TABLE IF EXISTS clients CASCADE;

create table articles (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	body TEXT NOT NULL,
	date DATE NOT NULL,
	author VARCHAR(50) NOT NULL,
	image VARCHAR(100)
);

create table lawyers (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(255),
	description TEXT,
	location VARCHAR(50),
	education TEXT,
	views INT,
	likes INT,
	date_certified DATE,
	phone_number VARCHAR(50),
	address VARCHAR(100),
	rating INT,
	profile_pic VARCHAR(100)
);

create table lawfirms (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	description TEXT NOT NULL,
	views INT NOT NULL,
	location VARCHAR(50) NOT NULL,
	registration_date DATE NOT NULL,
	phone_number VARCHAR(50) NOT NULL,
	address VARCHAR(100) NOT NULL,
	rating INT NOT NULL,
	profile_pic VARCHAR(100) NOT NULL
);

create table clients (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	phone_number VARCHAR(50),
	address VARCHAR(100)
);

create table messages (
	id SERIAL PRIMARY KEY,
	client_id INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
	lawyer_id INT REFERENCES lawyers(id) ON DELETE CASCADE,
	law_firm_id INT REFERENCES lawfirms(id) ON DELETE CASCADE,
	body TEXT NOT NULL,
	date_sent TIMESTAMPTZ NOT NULL,
	from_client BOOLEAN
);