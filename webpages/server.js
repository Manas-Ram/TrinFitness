const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
let slotRequests = [];  
let wellnessRequests = [{ name: 'Thierry Lawrence', date: '2024-03-12' },
{ name: 'Robbie Levine', date: '2024-03-11' }]
let suggestions = [];
let loggedInUser = {
    name: 'Manas Ramesh',
    role: 'Admin'
}
let menuOptions = {
    'February 26th - March 1st': [
        { name: "Grilled Chicken Salad", calories: 350, protein: "40g", carbs: "10g", fat: "15g" },
        { name: "Vegan Bean Salad", calories: 300, protein: "15g", carbs: "40g", fat: "10g" }
    ],
    'March 4th - March 8th': [
        { name: "Beef Stir Fry", calories: 400, protein: "50g", carbs: "20g", fat: "20g" },
        { name: "Tempeh Stir Fry", calories: 350, protein: "30g", carbs: "35g", fat: "15g" }
    ]
};
let weeklyCalendar = {
    'Monday': { '8:55 - 9:45': null, '9:45 - 10:35': null },
    'Tuesday': { '8:55 - 9:45': null, '9:45 - 10:35': null },
    'Wednesday': { '8:55 - 9:45': null, '9:45 - 10:35': null },
    'Thursday': { '8:55 - 9:45': null, '9:45 - 10:35': null },
    'Friday': { '8:55 - 9:45': null, '9:45 - 10:35': null }
};
let calendarArray = Object.keys(weeklyCalendar).map(day => ({
    name: day,
    timeSlots: Object.keys(weeklyCalendar[day]).map(time => ({
        time: time,
        status: weeklyCalendar[day][time]
    }))
}));
app.set('view engine', 'ejs');
// app.use(require('./controllers/auth'))

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("",function(request, response){
//     response.redirect('/error?code=400');
// });


app.post('/handle-request', (req, res) => {
    const { requestId, action } = req.body;
    if (requestId < slotRequests.length) {
        slotRequests[requestId].status = action === 'accept' ? 'accepted' : 'denied';
        if (action === 'deny') {
            const { day, time } = slotRequests[requestId];
            if (weeklyCalendar[day][time] === 'requested') {
                weeklyCalendar[day][time] = 'denied';
            }
        }
        res.json({ success: true, message: 'Request updated successfully.' });
    } else {
        res.status(404).json({ success: false, message: 'Request not found.' });
    }
});

// let weeklyCalendar = {
//     'Monday': { '8:55 - 9:45': null, '9:45 - 10:35': null },
//     'Tuesday': { '8:55 - 9:45': null, '9:45 - 10:35': null },

// };
app.get('/', (req, res) => {
    res.render('login.ejs', {errorMessage: ''});
});
app.post('/request-slot', (req, res) => {
    const { day, time, user } = req.body;
    if (weeklyCalendar[day] && weeklyCalendar[day].hasOwnProperty(time)) {
        if (weeklyCalendar[day][time] === null) {
            weeklyCalendar[day][time] = 'requested';
            const newRequest = { day, time, user, status: 'pending' };
            slotRequests.push(newRequest);
            res.json({ success: true, message: 'Slot requested successfully.', requestId: slotRequests.length - 1 });
        } else {
            res.status(400).json({ success: false, message: 'Slot is already taken or requested.' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Invalid day or time slot.' });
    }
});


app.get('/teacherdashboard', (req, res) => {

    const calendarArray = Object.keys(weeklyCalendar).map(day => ({
        name: day,
        timeSlots: Object.keys(weeklyCalendar[day]).map(time => ({
            time: time,
            status: weeklyCalendar[day][time]
        }))
    }));

    res.render('teacherdashboard', {
        slotRequests: slotRequests,  
        weeklyCalendar: calendarArray  
    });
});

app.get('/adminstatus', (req, res) => {
    res.render('adminstatus', {
        loggedInUser: loggedInUser,
        wellnessRequests: wellnessRequests,
        weeklyCalendar: weeklyCalendar,
        slotRequests: slotRequests  
        
    });
});


app.get('/calendar', (req, res) => {
    console.log('Rendering calendar with currentWeek:', 'February 26th - March 1st');
    
    res.render('calendar', {
        currentWeek: 'February 26th - March 1st',
        weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        weeks: ['February 26th - March 1st', 'March 4th - March 8th'],
        weeklyCalendar: weeklyCalendar
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
            { value: 'high_protein', display: 'High Protein' },
            { value: 'high_fat', display: 'High Fat' }

        ],
        dietaryRestrictions: [
            { id: 'none', name: 'none', value: 'None', label: 'No Restriction' },
            { id: 'vegan', name: 'vegan', value: 'Vegan', label: 'Vegan' },
            { id: 'vegetarian', name: 'vegetarian', value: 'Vegetarian', label: 'Vegetarian' }

        ],
        suggestions: suggestions
    });
});
app.get('/machine', (req, res) => {
    res.redirect('/machine/bench-press'); 
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
    let weeks = Object.keys(menuOptions);
    res.render('menu', {
        weeks: weeks,
        menuOptions: menuOptions
    });
});





app.post('/lunchplan', (req, res) => {
    const { mealType, dietaryRestriction } = req.body;
    let filteredOptions = [];


    Object.values(menuOptions).flat().forEach(menuItem => {
        let meetsCriteria = true;

        // Filter logic (simplified for brevity)
        if (mealType === 'high_protein' && parseInt(menuItem.protein) < 30) meetsCriteria = false;
        if (mealType === 'high_fat' && parseInt(menuItem.fat) < 15) meetsCriteria = false;
        if (dietaryRestriction !== 'none' && !menuItem.name.toLowerCase().includes(dietaryRestriction.toLowerCase())) {
            meetsCriteria = false;
        }

        if (meetsCriteria) {
            filteredOptions.push(menuItem);
        }
    });

    res.render('lunchplan', {
        mealTypes: [
            { value: 'high_protein', display: 'High Protein' },
            { value: 'high_fat', display: 'High Fat' }
        ],
        dietaryRestrictions: [
            { id: 'none', name: 'none', value: 'None', label: 'No Restriction' },
            { id: 'vegan', name: 'vegan', value: 'Vegan', label: 'Vegan' },
            { id: 'vegetarian', name: 'vegetarian', value: 'Vegetarian', label: 'Vegetarian' }
        ],
        suggestions: filteredOptions
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})  