-- ============================================
-- STUDY ABROAD PLATFORM - SUPABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    cgpa DECIMAL(3,2),
    ielts DECIMAL(3,1),
    budget DECIMAL(12,2),
    preferred_countries TEXT[],
    preferred_programs TEXT[],
    work_experience_years INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Universities table
CREATE TABLE IF NOT EXISTS universities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    ranking INTEGER,
    tuition_fee DECIMAL(12,2) NOT NULL,
    living_cost DECIMAL(12,2) NOT NULL,
    average_salary DECIMAL(12,2),
    minimum_cgpa DECIMAL(3,2),
    required_ielts DECIMAL(3,1),
    acceptance_rate DECIMAL(5,2),
    scholarship_available BOOLEAN DEFAULT FALSE,
    visa_difficulty TEXT DEFAULT 'medium' CHECK (visa_difficulty IN ('low', 'medium', 'high')),
    website TEXT,
    description TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Programs table
CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    degree_level TEXT DEFAULT 'masters' CHECK (degree_level IN ('bachelors', 'masters', 'phd')),
    duration_years DECIMAL(3,1) DEFAULT 2,
    tuition_fee DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Applications table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'under_review', 'interview', 'admitted', 'rejected', 'withdrawn')),
    deadline DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Admits table
CREATE TABLE IF NOT EXISTS admits (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    program TEXT,
    admit_type TEXT DEFAULT 'admit' CHECK (admit_type IN ('admit', 'reject', 'waitlist')),
    cgpa DECIMAL(3,2),
    ielts DECIMAL(3,1),
    gre INTEGER,
    work_experience INTEGER DEFAULT 0,
    year INTEGER,
    verified BOOLEAN DEFAULT FALSE,
    document_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Saved comparisons table
CREATE TABLE IF NOT EXISTS saved_comparisons (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    university_ids INTEGER[] NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_universities_country ON universities(country);
CREATE INDEX IF NOT EXISTS idx_universities_ranking ON universities(ranking);
CREATE INDEX IF NOT EXISTS idx_applications_user ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_admits_university ON admits(university_id);
CREATE INDEX IF NOT EXISTS idx_admits_verified ON admits(verified);
CREATE INDEX IF NOT EXISTS idx_programs_university ON programs(university_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Public profiles for service role" ON profiles
    FOR ALL USING (true);

-- Universities (public read)
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Universities are public" ON universities
    FOR SELECT USING (true);
CREATE POLICY "Admins can manage universities" ON universities
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Programs (public read)
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Programs are public" ON programs
    FOR SELECT USING (true);

-- Applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own applications" ON applications
    FOR ALL USING (auth.uid() = user_id);

-- Admits
ALTER TABLE admits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Verified admits are public" ON admits
    FOR SELECT USING (verified = true OR auth.uid() = user_id);
CREATE POLICY "Users can create admits" ON admits
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Saved comparisons
ALTER TABLE saved_comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own comparisons" ON saved_comparisons
    FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_universities_updated_at
    BEFORE UPDATE ON universities FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, full_name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SEED DATA
-- ============================================

INSERT INTO universities (name, country, city, ranking, tuition_fee, living_cost, average_salary, minimum_cgpa, required_ielts, acceptance_rate, scholarship_available, visa_difficulty, description) VALUES
('Massachusetts Institute of Technology', 'USA', 'Cambridge', 1, 58240, 25000, 95000, 3.5, 7.0, 3.96, true, 'medium', 'MIT is a world-renowned institute of technology known for its cutting-edge research and innovation.'),
('Stanford University', 'USA', 'Stanford', 2, 56169, 24000, 92000, 3.5, 7.0, 4.34, true, 'medium', 'Stanford is a leading research university known for its entrepreneurial character and proximity to Silicon Valley.'),
('Harvard University', 'USA', 'Cambridge', 3, 54768, 25000, 88000, 3.6, 7.5, 3.19, true, 'medium', 'Harvard is the oldest institution of higher education in the US, known for academic excellence.'),
('University of Oxford', 'UK', 'Oxford', 4, 39000, 18000, 65000, 3.7, 7.0, 17.5, true, 'medium', 'Oxford is one of the oldest and most prestigious universities in the world.'),
('University of Cambridge', 'UK', 'Cambridge', 5, 38000, 17000, 63000, 3.7, 7.5, 21.0, true, 'medium', 'Cambridge is a world-leading university with an outstanding reputation for academic achievement.'),
('Imperial College London', 'UK', 'London', 8, 42000, 22000, 60000, 3.5, 7.0, 14.3, true, 'medium', 'Imperial is a science-based institution known for its research and innovation.'),
('University College London', 'UK', 'London', 10, 35000, 22000, 55000, 3.3, 6.5, 16.0, true, 'medium', 'UCL is a diverse and connected university with a commitment to engaging with real-world problems.'),
('University of Edinburgh', 'UK', 'Edinburgh', 15, 28000, 15000, 48000, 3.2, 6.5, 40.0, true, 'medium', 'Edinburgh is one of the top universities in the UK, known for its research and historic campus.'),
('UC Berkeley', 'USA', 'Berkeley', 12, 44000, 22000, 82000, 3.3, 6.5, 11.4, true, 'medium', 'UC Berkeley is known for its rigorous academic programs and vibrant campus life.'),
('Carnegie Mellon University', 'USA', 'Pittsburgh', 22, 57000, 18000, 90000, 3.4, 7.0, 13.7, true, 'medium', 'CMU is a global leader in computer science and engineering education.'),
('University of Toronto', 'Canada', 'Toronto', 18, 45000, 16000, 55000, 3.3, 6.5, 43.0, true, 'low', 'U of T is Canada''s top university, known for its research excellence and diverse community.'),
('University of British Columbia', 'Canada', 'Vancouver', 34, 38000, 15000, 52000, 3.2, 6.5, 52.6, true, 'low', 'UBC is a global center for teaching, learning, and research, consistently ranked among the best.'),
('McGill University', 'Canada', 'Montreal', 30, 25000, 12000, 48000, 3.2, 6.5, 46.3, true, 'low', 'McGill is one of Canada''s best-known institutions, with the highest percentage of PhD students.'),
('University of Waterloo', 'Canada', 'Waterloo', 112, 32000, 12000, 58000, 3.3, 6.5, 53.0, true, 'low', 'Waterloo is known for its co-op programs and strong connections with industry.'),
('Australian National University', 'Australia', 'Canberra', 27, 35000, 16000, 50000, 3.0, 6.5, 35.0, true, 'low', 'ANU is Australia''s national university, known for its research and policy influence.'),
('University of Melbourne', 'Australia', 'Melbourne', 14, 38000, 18000, 52000, 3.2, 6.5, 70.0, true, 'low', 'Melbourne is consistently ranked as Australia''s best university for teaching and research.'),
('University of Sydney', 'Australia', 'Sydney', 19, 40000, 20000, 50000, 3.0, 6.5, 30.0, true, 'low', 'Sydney is one of the most respected universities in the Asia-Pacific region.'),
('TU Munich', 'Germany', 'Munich', 37, 500, 12000, 52000, 3.0, 6.5, 8.0, true, 'medium', 'TUM is the top technical university in Germany with minimal tuition fees.'),
('LMU Munich', 'Germany', 'Munich', 32, 500, 12000, 48000, 2.8, 6.5, 15.0, false, 'medium', 'LMU is one of Germany''s oldest and most prestigious universities.'),
('Heidelberg University', 'Germany', 'Heidelberg', 42, 500, 10000, 45000, 2.8, 6.5, 20.0, false, 'medium', 'Heidelberg is Germany''s oldest university and a member of the League of European Research Universities.'),
('National University of Singapore', 'Singapore', 'Singapore', 11, 38000, 14000, 55000, 3.4, 6.5, 10.0, true, 'low', 'NUS is Asia''s leading university known for its global approach to education and research.'),
('Nanyang Technological University', 'Singapore', 'Singapore', 26, 35000, 14000, 52000, 3.2, 6.5, 12.0, true, 'low', 'NTU is a young and research-intensive university with global ambitions.'),
('University of Amsterdam', 'Netherlands', 'Amsterdam', 53, 15000, 14000, 45000, 3.0, 6.5, 30.0, false, 'medium', 'UvA is the largest university in the Netherlands with a rich academic heritage.'),
('Delft University of Technology', 'Netherlands', 'Delft', 47, 16000, 12000, 48000, 3.0, 6.5, 25.0, true, 'medium', 'TU Delft is the largest and oldest public technological university in the Netherlands.'),
('Trinity College Dublin', 'Ireland', 'Dublin', 81, 22000, 14000, 42000, 3.0, 6.5, 30.0, true, 'low', 'Trinity is Ireland''s top university and one of the oldest in the English-speaking world.');

-- Sample programs
INSERT INTO programs (university_id, name, degree_level, duration_years, tuition_fee) VALUES
(1, 'MS Computer Science', 'masters', 2, 58240),
(1, 'MS Electrical Engineering', 'masters', 2, 58240),
(2, 'MS Computer Science', 'masters', 2, 56169),
(4, 'MSc Computer Science', 'masters', 1, 39000),
(5, 'MPhil Advanced Computer Science', 'masters', 1, 38000),
(9, 'MS EECS', 'masters', 2, 44000),
(10, 'MS Computer Science', 'masters', 2, 57000),
(11, 'MSc Computer Science', 'masters', 2, 45000),
(18, 'MS Informatics', 'masters', 2, 500),
(21, 'MSc Computing', 'masters', 2, 38000);
