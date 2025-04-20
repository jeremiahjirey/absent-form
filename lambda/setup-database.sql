
CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  photoUrl VARCHAR(255) NOT NULL,
  status ENUM('PRESENT', 'EXCUSED', 'ABSENT') NOT NULL DEFAULT 'PRESENT'
);

-- Insert some sample data
INSERT INTO students (id, name, photoUrl, status)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'John Doe', 'https://randomuser.me/api/portraits/men/1.jpg', 'PRESENT'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Jane Smith', 'https://randomuser.me/api/portraits/women/2.jpg', 'EXCUSED'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Peter Parker', 'https://randomuser.me/api/portraits/men/3.jpg', 'ABSENT');
