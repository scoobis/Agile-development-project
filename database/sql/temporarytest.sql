-- USER --
CREATE TABLE User (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  full_name VARCHAR(40) NOT NULL,
  role VARCHAR(20) NOT NULL,
  address_id INT(7),
  PRIMARY KEY (id)
);

INSERT INTO User (email, password, full_name, role) 
VALUES
  ('admin@mail.com', 'admin', 'Admin Adminsson', 'ADMIN'),
  ('producenten@mail.com', 'producenten', 'Produ Centen', 'PRODUCENT');

-- POSTCODE --
CREATE TABLE Postcode (
  code INT(5) NOT NULL,
  city VARCHAR(50) NOT NULL,
  PRIMARY KEY (code)
);

INSERT INTO Postcode (code, city) 
VALUES
  ('11111', 'Vaxsjo'),
  ('11112', 'Vaxsjo');

-- ADDRESS --
CREATE TABLE Address (
  id INT NOT NULL AUTO_INCREMENT,
  street_name VARCHAR(50) NOT NULL,
  street_no VARCHAR(15),
  postcode INT(5) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (postcode) REFERENCES Postcode(code),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

INSERT INTO Address (street_name, street_no, postcode, user_id)
VALUES
  ('Adminsgatan', 1, 11111, 1),
  ('Producentbacken', 2, 11112, 2);
