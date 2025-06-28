-- Red Line (L1)
INSERT INTO lines (line_name, line_code, color) VALUES ('Red Line', 'L1', 'red');

INSERT INTO stations (station_name, line_id, station_number, distance_from_previous_station, is_interchange)
VALUES 
('Miyapur', 1, 1, 0, false),
('KPHB', 1, 2, 2.5, false),
('Ameerpet', 1, 3, 2.5, true),
('Begumpet', 1, 4, 2.5, true),
('LB Nagar', 1, 5, 4.0, false);


-- Blue Line (L3)
INSERT INTO lines (line_name, line_code, color) VALUES ('Blue Line', 'L3', 'blue');

INSERT INTO stations (station_name, line_id, station_number, distance_from_previous_station, is_interchange)
VALUES 
('Nagole', 2, 1, 0, false),
('Ameerpet', 2, 2, 6.0, true),
('Begumpet', 2, 3, 2.5, true),
('Raidurg', 2, 4, 3.0, false);

-- Green Line (L2)
INSERT INTO lines (line_name, line_code, color) VALUES ('Green Line', 'L2', 'green');

INSERT INTO stations (station_name, line_id, station_number, distance_from_previous_station, is_interchange)
VALUES 
('JBS Parade Ground', 3, 1, 0, false),
('Secunderabad', 3, 2, 3.5, true),
('MGBS', 3, 3, 2.5, false);