DROP DATABASE clothestar IF EXISTS;

CREATE DATABASE clothestar;

use clothestar

CREATE TABLE admin (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pseudo VARCHAR(255) NULL,
    password VARCHAR(255) NULL
);

CREATE TABLE image (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    base mediumtext NULL
);

CREATE TABLE dress (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    star_id INT NULL,
    image_id INT NULL
);

CREATE TABLE star (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NULL,
    image_id INT NULL
);

CREATE TABLE product (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NULL,
    description text(1200) NULL,
    promo_price VARCHAR(255) NULL,
    price VARCHAR(255) NULL,
    image_id INT NULL,
    image_id_2 INT NULL,
    image_id_3 INT NULL,
    date_delivery VARCHAR(255) NULL,
    dress_id INT NULL,
    size1 VARCHAR(20) NULL,
    size2 VARCHAR(20) NULL,
    size3 VARCHAR(20) NULL,
    size4 VARCHAR(20) NULL,
    size5 VARCHAR(20) NULL,
    size6 VARCHAR(20) NULL,
    size7 VARCHAR(20) NULL,
    size8 VARCHAR(20) NULL,
    stock INT NULL
);

CREATE TABLE promoCode (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NULL,
    percent VARCHAR(255) NULL
);

CREATE TABLE advice (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    rate VARCHAR(255) NULL,
    comment VARCHAR(255) NULL,
    person VARCHAR(255) NULL,
    product_id INT NULL
);