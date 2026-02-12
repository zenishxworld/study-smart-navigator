-- Seed data for universities

INSERT INTO universities (name, country, city, ranking, tuition_fee, living_cost, minimum_cgpa, required_ielts, estimated_salary, visa_risk_level, scholarship_available, employment_rate, description) VALUES

-- USA Universities
('Massachusetts Institute of Technology', 'USA', 'Cambridge', 1, 53790, 20000, 3.7, 7.0, 95000, 'medium', true, 95.5, 'World-renowned for engineering, computer science, and innovation.'),
('Stanford University', 'USA', 'Stanford', 2, 56169, 22000, 3.8, 7.0, 98000, 'medium', true, 96.2, 'Leading institution for technology, business, and entrepreneurship.'),
('Harvard University', 'USA', 'Cambridge', 3, 54002, 21000, 3.9, 7.5, 92000, 'medium', true, 94.8, 'Prestigious Ivy League university with excellence across all fields.'),
('University of California Berkeley', 'USA', 'Berkeley', 4, 44007, 18000, 3.5, 6.5, 88000, 'medium', true, 93.1, 'Top public university known for research and innovation.'),
('Carnegie Mellon University', 'USA', 'Pittsburgh', 6, 59864, 16000, 3.6, 7.0, 94000, 'medium', true, 95.0, 'Excellence in computer science, AI, and robotics.'),

-- UK Universities
('University of Oxford', 'UK', 'Oxford', 4, 35000, 15000, 3.7, 7.0, 55000, 'low', true, 94.5, 'One of the oldest and most prestigious universities globally.'),
('University of Cambridge', 'UK', 'Cambridge', 5, 34650, 15500, 3.8, 7.5, 56000, 'low', true, 95.0, 'Historic university with world-class research and teaching.'),
('Imperial College London', 'UK', 'London', 8, 36500, 18000, 3.5, 6.5, 58000, 'low', true, 93.8, 'Specialized in science, engineering, medicine, and business.'),
('University College London', 'UK', 'London', 9, 31000, 17500, 3.4, 6.5, 54000, 'low', true, 92.5, 'Diverse research university in the heart of London.'),
('University of Edinburgh', 'UK', 'Edinburgh', 16, 28000, 13000, 3.3, 6.5, 48000, 'low', true, 90.2, 'Historic Scottish university with strong research programs.'),

-- Canada Universities
('University of Toronto', 'Canada', 'Toronto', 21, 45690, 15000, 3.5, 6.5, 68000, 'low', true, 92.0, 'Canada\'s leading research university.'),
('University of British Columbia', 'Canada', 'Vancouver', 34, 42000, 16000, 3.4, 6.5, 65000, 'low', true, 91.5, 'Beautiful campus with strong programs in science and business.'),
('McGill University', 'Canada', 'Montreal', 27, 38000, 13000, 3.5, 6.5, 62000, 'low', true, 90.8, 'Top Canadian university with international reputation.'),
('University of Waterloo', 'Canada', 'Waterloo', 149, 35000, 12000, 3.3, 6.5, 72000, 'low', true, 94.2, 'Excellence in engineering and co-op programs.'),

-- Australia Universities
('Australian National University', 'Australia', 'Canberra', 30, 38000, 18000, 3.4, 6.5, 62000, 'low', true, 89.5, 'Australia\'s national research university.'),
('University of Melbourne', 'Australia', 'Melbourne', 33, 40000, 20000, 3.5, 6.5, 65000, 'low', true, 91.0, 'Leading Australian university with strong global connections.'),
('University of Sydney', 'Australia', 'Sydney', 38, 42000, 22000, 3.4, 6.5, 64000, 'low', true, 90.3, 'Historic sandstone university with comprehensive programs.'),

-- Germany Universities
('Technical University of Munich', 'Germany', 'Munich', 50, 0, 11000, 3.2, 6.0, 52000, 'low', true, 93.0, 'Top technical university with free tuition.'),
('Ludwig Maximilian University', 'Germany', 'Munich', 59, 0, 10500, 3.2, 6.0, 48000, 'low', true, 91.5, 'Research excellence with no tuition fees.'),
('Heidelberg University', 'Germany', 'Heidelberg', 64, 0, 9500, 3.1, 6.0, 47000, 'low', true, 90.0, 'Oldest university in Germany, strong in natural sciences.'),

-- Singapore
('National University of Singapore', 'Singapore', 'Singapore', 11, 28000, 14000, 3.6, 6.5, 58000, 'low', true, 95.5, 'Asia\'s top university with global excellence.'),
('Nanyang Technological University', 'Singapore', 'Singapore', 26, 27000, 14000, 3.5, 6.5, 56000, 'low', true, 94.8, 'Strong in engineering and technology.'),

-- Netherlands
('University of Amsterdam', 'Netherlands', 'Amsterdam', 53, 12000, 14000, 3.3, 6.5, 42000, 'low', true, 88.5, 'Leading Dutch university with international focus.'),
('Delft University of Technology', 'Netherlands', 'Delft', 47, 15000, 12000, 3.4, 6.5, 48000, 'low', true, 92.0, 'Top technical university in Europe.'),

-- Ireland
('Trinity College Dublin', 'Ireland', 'Dublin', 98, 18000, 13000, 3.2, 6.5, 45000, 'low', true, 87.5, 'Ireland\'s oldest university with strong research.'),

-- New Zealand
('University of Auckland', 'New Zealand', 'Auckland', 68, 28000, 15000, 3.2, 6.0, 52000, 'low', true, 89.0, 'New Zealand\'s top-ranked university.');

-- Seed programs for some universities
INSERT INTO programs (university_id, name, degree_type, duration_months, specialization) VALUES
-- MIT programs
(1, 'Master of Science in Computer Science', 'Masters', 24, 'Computer Science'),
(1, 'Master of Engineering in Electrical Engineering', 'Masters', 24, 'Electrical Engineering'),
(1, 'MBA', 'Masters', 24, 'Business Administration'),

-- Stanford programs
(2, 'MS in Computer Science', 'Masters', 24, 'Computer Science'),
(2, 'MS in Data Science', 'Masters', 24, 'Data Science'),
(2, 'MBA', 'Masters', 24, 'Business Administration'),

-- Oxford programs
(6, 'MSc in Computer Science', 'Masters', 12, 'Computer Science'),
(6, 'MBA', 'Masters', 12, 'Business Administration'),
(6, 'MSc in Engineering Science', 'Masters', 12, 'Engineering'),

-- Add more programs for other universities
(11, 'MScAc in Accounting', 'Masters', 12, 'Accounting'),
(11, 'MEng in Computer Engineering', 'Masters', 16, 'Computer Engineering'),
(12, 'Master of Data Science', 'Masters', 16, 'Data Science'),
(14, 'Master of Engineering', 'Masters', 24, 'Software Engineering'),
(21, 'MSc in Artificial Intelligence', 'Masters', 12, 'Artificial Intelligence'),
(22, 'MSc in Computer Science', 'Masters', 12, 'Computer Science');
