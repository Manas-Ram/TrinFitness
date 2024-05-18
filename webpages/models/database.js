const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, role TEXT, isAdmin BOOLEAN)");
    db.run("CREATE TABLE slot_requests (id INTEGER PRIMARY KEY, week TEXT, day TEXT, time TEXT, user TEXT, status TEXT)");
    db.run("CREATE TABLE wellness_requests (id INTEGER PRIMARY KEY, name TEXT, date TEXT)");
    db.run("CREATE TABLE menu_options (id INTEGER PRIMARY KEY, week TEXT, name TEXT, calories INTEGER, protein INTEGER, carbs INTEGER, fat INTEGER, day TEXT, dietary TEXT)");
    db.run("CREATE TABLE weekly_calendar (id INTEGER PRIMARY KEY, week TEXT, day TEXT, time TEXT, status TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY, user_email TEXT, activity_type TEXT, timestamp TEXT)");
    
    
    db.run("INSERT INTO users (email, role, isAdmin) VALUES ('manas.ramesh24@trinityschoolnyc.org', 'Admin' , '1')");
    db.run("INSERT INTO wellness_requests (name, date) VALUES ('Thierry Lawrence', '2024-03-12')");
    db.run("INSERT INTO wellness_requests (name, date) VALUES ('Robbie Levine', '2024-03-11')");
    
    const times = ['8:55 - 9:45', '9:45 - 10:40', '10:40 - 11:15', '11:15 - 12:05', '12:05 - 1:00', '1:00 - 1:40', '1:40 - 2:35', '2:35 - 3:25'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const week = 'February 26th - March 1st';




    days.forEach(day => {
        times.forEach(time => {
            db.run("INSERT INTO weekly_calendar (week, day, time, status) VALUES (?, ?, ?, ?)", [week, day, time, 'Open']);
        });
    });

    const menuOptions = [
        { week: 'February 26th - March 1st', name: 'Grilled Chicken Salad', calories: 350, protein: 40, carbs: 10, fat: 15, day: 'Monday', dietary: 'none' },
        { week: 'February 26th - March 1st', name: 'Beef Steak', calories: 500, protein: 55, carbs: 0, fat: 30, day: 'Tuesday', dietary: 'none' },
        { week: 'February 26th - March 1st', name: 'Tuna Salad', calories: 300, protein: 35, carbs: 5, fat: 20, day: 'Wednesday', dietary: 'none' },
        { week: 'February 26th - March 1st', name: 'Avocado Salad', calories: 400, protein: 5, carbs: 20, fat: 35, day: 'Thursday', dietary: 'vegetarian' },
        { week: 'February 26th - March 1st', name: 'Keto Burger', calories: 600, protein: 25, carbs: 10, fat: 50, day: 'Friday', dietary: 'none' },
        { week: 'February 26th - March 1st', name: 'Cheese Platter', calories: 450, protein: 20, carbs: 5, fat: 40, day: 'Monday', dietary: 'vegetarian' },
        { week: 'February 26th - March 1st', name: 'Vegan Bean Salad', calories: 300, protein: 15, carbs: 40, fat: 10, day: 'Tuesday', dietary: 'vegan' },
        { week: 'February 26th - March 1st', name: 'Quinoa and Veggies', calories: 350, protein: 12, carbs: 50, fat: 8, day: 'Wednesday', dietary: 'vegan' },
        { week: 'February 26th - March 1st', name: 'Vegan Tofu Stir Fry', calories: 400, protein: 20, carbs: 30, fat: 15, day: 'Thursday', dietary: 'vegan' },
        { week: 'February 26th - March 1st', name: 'Vegetarian Pizza', calories: 500, protein: 20, carbs: 60, fat: 20, day: 'Friday', dietary: 'vegetarian' },
        { week: 'February 26th - March 1st', name: 'Vegetarian Pasta', calories: 450, protein: 15, carbs: 70, fat: 10, day: 'Monday', dietary: 'vegetarian' },
        { week: 'February 26th - March 1st', name: 'Eggplant Parmesan', calories: 400, protein: 18, carbs: 40, fat: 20, day: 'Tuesday', dietary: 'vegetarian' },
        { week: 'February 26th - March 1st', name: 'Salmon Salad', calories: 450, protein: 30, carbs: 10, fat: 30, day: 'Wednesday', dietary: 'none' },
        { week: 'February 26th - March 1st', name: 'Pork Chops', calories: 550, protein: 35, carbs: 5, fat: 40, day: 'Thursday', dietary: 'none' },
        { week: 'February 26th - March 1st', name: 'Chicken Alfredo', calories: 600, protein: 40, carbs: 50, fat: 30, day: 'Friday', dietary: 'none' },
        { week: 'February 26th - March 1st', name: 'Lentil Soup', calories: 350, protein: 25, carbs: 40, fat: 5, day: 'Monday', dietary: 'vegan' },
        { week: 'February 26th - March 1st', name: 'Vegan Protein Shake', calories: 200, protein: 30, carbs: 15, fat: 5, day: 'Tuesday', dietary: 'vegan' },
        { week: 'February 26th - March 1st', name: 'Chickpea Salad', calories: 300, protein: 20, carbs: 35, fat: 10, day: 'Wednesday', dietary: 'vegan' },
        { week: 'February 26th - March 1st', name: 'Greek Yogurt Parfait', calories: 250, protein: 20, carbs: 30, fat: 8, day: 'Thursday', dietary: 'vegetarian' },
        { week: 'February 26th - March 1st', name: 'Paneer Tikka', calories: 400, protein: 30, carbs: 20, fat: 25, day: 'Friday', dietary: 'vegetarian' },
        { week: 'February 26th - March 1st', name: 'Vegetarian Chili', calories: 350, protein: 22, carbs: 40, fat: 15, day: 'Monday', dietary: 'vegetarian' }
    ];

    menuOptions.forEach(option => {
        db.run("INSERT INTO menu_options (week, name, calories, protein, carbs, fat, day, dietary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
            [option.week, option.name, option.calories, option.protein, option.carbs, option.fat, option.day, option.dietary]);
    });
});

module.exports = db;
