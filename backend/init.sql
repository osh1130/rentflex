-- 等待FastAPI应用创建表结构后，再插入示例数据

-- 插入额外服务数据
INSERT INTO extras (name, description, fee, active) VALUES
('GPS Navigation', 'Full GPS navigation system', 50.00, true),
('Child Seat', 'Safety seat suitable for children aged 3-12', 30.00, true),
('Additional Driver', 'Add one more authorized driver', 100.00, true),
('Full Insurance', 'Comprehensive vehicle insurance coverage', 200.00, true);

-- 插入用户账户
-- 密码为: admin123!
INSERT INTO users (email, hashed_password, name, role, blocked) VALUES
('admin@rentflex.com', '$2b$12$QiXF5e673kbWZ4WxOx.7XeVqf9/svND/AZqqR9J.M82iYkUVORMqS', 'System Admin', 'admin', false),
('customer@example.com', '$2b$12$QiXF5e673kbWZ4WxOx.7XeVqf9/svND/AZqqR9J.M82iYkUVORMqS', 'Test Customer', 'customer', false);

-- 插入示例车辆
INSERT INTO vehicles (make, model, year, mileage, available_now, minimum_rent_period, maximum_rent_period, seats, price_per_day, image_url) VALUES
('Toyota', 'Camry', 2023, 5000, true, 1, 30, 5, 300.00, 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500'),
('Honda', 'Accord', 2022, 8000, true, 1, 30, 5, 280.00, 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500'),
('Tesla', 'Model 3', 2023, 3000, true, 2, 20, 5, 500.00, 'https://images.unsplash.com/photo-1619722087489-f0b1a6d2e62f?w=500'),
('Mercedes', 'E-Class', 2022, 6000, true, 3, 30, 5, 600.00, 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=500'),
('BMW', '5 Series', 2023, 4500, true, 2, 25, 5, 550.00, 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=500'),
('Audi', 'A6', 2022, 7000, true, 2, 30, 5, 520.00, 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=500'),
('Volkswagen', 'Passat', 2023, 5500, true, 1, 30, 5, 260.00, 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500');

-- 创建示例预订
INSERT INTO bookings (user_id, vehicle_id, start_date, end_date, status, total_fee) VALUES
(2, 1, '2023-06-10', '2023-06-15', 'approved', 1500.00),
(2, 3, '2023-07-05', '2023-07-10', 'pending', 2500.00);

-- 为预订添加额外服务
INSERT INTO booking_extras (booking_id, extra_id, fee) VALUES
(1, 1, 50.00),
(1, 2, 30.00),
(2, 4, 200.00); 