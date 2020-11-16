-- USER --
CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  full_name VARCHAR(40) NOT NULL,
  role VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO user (email, password, full_name, role) 
VALUES
  ('admin@mail.com', 'admin', 'Admin Adminsson', 'ADMIN'),
  ('producenten@mail.com', 'producenten', 'Produ Centen', 'PRODUCENT');
