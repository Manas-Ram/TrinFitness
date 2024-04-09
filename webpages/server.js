const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.post('/handle-request', (req, res) => {
    const { requestId, action } = req.body;
    // update it, then do a deny statement so calendar would be red and struckthrough

    res.json({ success: true });
});

app.post('/request-slot', (req, res) => {
    const { day, time } = req.body;
    // havent set up database to do this 

    res.json({ success: true });
});



app.get('/teacherdashboard', (req, res) => {
    res.render('teacherdashboard', {
        wellnessRequests: [
            { time: '10:00 AM', student: 'Student A' },
            { time: '11:45 AM', student: 'Student B' }
        ],
        weeklyCalendar: [
            { name: 'Monday', timeSlots: ['8:55 - 9:45', '9:45 - 10:35'] },
            { name: 'Tuesday', timeSlots: ['8:55 - 9:45', '9:45 - 10:35'] },
        ]
    });
});



app.get('/adminstatus', (req, res) => {
    res.render('adminstatus', {
        loggedInUser: { name: 'Manas Ramesh', role: 'Admin' },
        wellnessRequests: [
            { name: 'Thierry Lawrence', date: '2024-03-12' },
            { name: 'Robbie Levine', date: '2024-03-11' }
        ]
    });
});

app.get('/calendar', (req, res) => {
    res.render('calendar', {
        currentWeek: 'February 26th - March 1st',
        weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    });
});




app.get('/demos', (req, res) => {
    res.render('demos', {
        //put random things idk if this page wll really change
    });
});


app.get('/login', (req, res) => {
    res.render('login', {
        username: req.query.username, // put username keep login error
        errorMessage: req.query.error // error message
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const success = true;
    if (success){
        res.redirect('/calendar');
    }
    else {
        res.redirect('/login?error=Invalid credentials&username=' + encodeURIComponent(username));
    }

});



app.get('/lunchplan', (req, res) => {
    res.render('lunchplan', {
        mealTypes: [
            { value: 'protein', display: 'High Protein' },
            { value: 'fat', display: 'High Fat' },

        ],
        dietaryRestrictions: [
            { id: 'vegan', name: 'vegan', value: 'Vegan', label: 'Vegan' },
            { id: 'vegetarian', name: 'vegetarian', value: 'Vegetarian', label: 'Vegetarian' },

        ]
    });
});


app.get('/machine/bench-press', (req, res) => {
    res.render('machine', {
        exerciseName: 'Bench Press',
        demonstratorName: 'Manas Ramesh',
        descriptionTips: [
            'This exercise strengthens triceps, pectorals, and delts',
            'Keep your chest up',
            'Tightly grip the bar with equal spacing'
        ]
    });
});




app.get('/menu', (req, res) => {
    res.render('menu', {
        weeks: [
            'February 26th - March 1st',
            'March 4th - March 8th',
            //do rest
        ],
        menuOptions: [
            [
                { name: 'Option #1', calories: 'XYZ', protein: 'XYZ', carbs: 'XYZ', fat: 'XYZ' },
                // add whatever
            ],
            // do the rest later
        ]
    });
});





app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})