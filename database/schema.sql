
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    cgpa DECIMAL(3, 2),
    ielts_score DECIMAL(2, 1),
    budget INTEGER,
    preferred_countries TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Universities table
CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    ranking INTEGER,
    tuition_fee INTEGER NOT NULL,
    living_cost INTEGER NOT NULL,
    minimum_cgpa DECIMAL(3, 2) NOT NULL,
    required_ielts DECIMAL(2, 1) NOT NULL,
    estimated_salary INTEGER NOT NULL,
    visa_risk_level VARCHAR(20) CHECK (visa_risk_level IN ('low', 'medium', 'high')),
    scholarship_available BOOLEAN DEFAULT false,
    employment_rate DECIMAL(5, 2),
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Programs table
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    degree_type VARCHAR(50) NOT NULL,
    duration_months INTEGER NOT NULL,
    specialization VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved comparisons table
CREATE TABLE saved_comparisons (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    university_id_1 INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    university_id_2 INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Application tracking table
CREATE TABLE application_tracking (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id) ON DELETE SET NULL,
    status VARCHAR(50) CHECK (status IN ('applied', 'under_review', 'interview', 'admitted', 'rejected')),
    deadline DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admit data table (verified uploads)
CREATE TABLE admit_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id) ON DELETE SET NULL,
    admit_type VARCHAR(20) CHECK (admit_type IN ('admit', 'reject')),
    file_path VARCHAR(500) NOT NULL,
    cgpa DECIMAL(3, 2),
    ielts_score DECIMAL(2, 1),
    is_verified BOOLEAN DEFAULT false,
    verified_at TIMESTAMP,
    verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    country VARCHAR(100),
    course VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_universities_country ON universities(country);
CREATE INDEX idx_universities_ranking ON universities(ranking);
CREATE INDEX idx_programs_university ON programs(university_id);
CREATE INDEX idx_application_tracking_user ON application_tracking(user_id);
CREATE INDEX idx_admit_data_university ON admit_data(university_id);
CREATE INDEX idx_admit_data_verified ON admit_data(is_verified);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON universities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_application_tracking_updated_at BEFORE UPDATE ON application_tracking
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
