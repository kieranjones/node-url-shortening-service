--
-- Table structure for 'shorturls'
--

CREATE TABLE shorturls (
  id int primary key NOT NULL,
  long_url varchar(255) unique NOT NULL,
  created_date int NOT NULL,
  creator_ip char(15) NOT NULL,
  created_by int NOT NULL,
  referrals int NOT NULL default '0'
);