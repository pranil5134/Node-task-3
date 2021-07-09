const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
console.log("hello")

app.use(express.json());

let Mentor = []
let Student = []
app.get("/Mentor", (req, res) => {

    res.send(Mentor)

})

app.get("/Mentor/:id", (req, res) => {
    let mentor_present = 0
    for (let current_mentor = 0; current_mentor < Mentor.length; current_mentor++) {
        console.log(Mentor[current_mentor].Mentor_id, req.params.id)
        if (Mentor[current_mentor].Mentor_id == req.params.id) {
            res.send(Mentor[current_mentor]);
            mentor_present = 1
            break;
        }
        else {
            mentor_present = 0
            continue;
        }
    }
    if (mentor_present + 1 == 1) {
        res.send("Message : 'Mentor is not present in list")
    }


})

app.get("/Student", (req, res) => {

    res.send(Student)

})

app.get("/Student/:id", (req, res) => {

    res.send(Student)

})

app.post("/Mentor", (req, res) => {
    let Duplicate_mentor = 1
    for (let current_mentor = 0; current_mentor < Mentor.length; current_mentor++) {
        if (Mentor[current_mentor].Mentor_name == req.body.Mentor_name) {
            Duplicate_mentor = 1
            break;
        }
        else {
            Duplicate_mentor = 0
            continue;
        }
    }
    if (!Duplicate_mentor || Mentor.length == 0) {
        Mentor.push({
            Mentor_name: req.body.Mentor_name,
            metee: [],
            Mentor_id: Mentor.length + 1
        })

        res.send("Message : 'Mentor has been created'")
    }
    else {
        res.send("Message : 'Mentor already present in list'")
    }

})

app.post("/Student", (req, res) => {
    let Duplicate_student = 1
    for (let current_student = 0; current_student < Student.length; current_student++) {
        if (Student[current_student].Student_Registration_ID == req.body.Student_Registration_ID) {
            Duplicate_student = 1
            break;
        }
        else {
            Duplicate_student = 0
            continue;
        }
    }
    if (!Duplicate_student || Student.length == 0) {
        Student.push({
            Student_name: req.body.Student_name,
            Mentor_name: req.body.Mentor_name,
            Student_Registration_ID: req.body.Student_Registration_ID,
            Student_id: Student.length + 1
        })

        res.send("Message : 'Student has been created'")
    }
    else {
        res.send("Message : 'Student already present in list'")
    }

})

app.put("/Student/:id", (req, res) => {
    let Mentor_absent = 1
    for(let current_mentor=0;current_mentor<Mentor.length;current_mentor++)
    {
        
        if(Mentor[current_mentor].Mentor_name==req.body.Mentor_name)
        {
                Mentor_absent=0
                Student[req.params.id-1].Mentor_name=req.body.Mentor_name
                res.send("mentor has been assign")
            
        }
    }
    if(Mentor_absent)
    {
        res.send("Mentor is not present in the list")
    }
})

app.put("/Mentor/:id", (req, res) => {
    let mentor_present = 0
    let list_student = req.body.metee
    let Student_absent = 1
    let Student_duplicate = 1
    for (let current_student = 0; current_student < list_student.length; current_student++) {
        for (let this_student = 0; this_student < Student.length; this_student++) {
            if (Student[this_student].Student_name == (list_student[current_student])) {

                Student_absent = 0
                break;
            }
            else {
                Student_absent = 1
            }
        }
        if (Student_absent) {
            break;
        }
        else {
            continue;
        }
    }
    if (Student_absent) {

        res.send("Student is not present in list")

    }
    else {
        for (let current_mentor = 0; current_mentor < Mentor.length; current_mentor++) {
            console.log(Mentor[current_mentor].Mentor_id, req.params.id)
            if (Mentor[current_mentor].Mentor_id == req.params.id) {
                for (let current_student = 0; current_student < list_student.length; current_student++) {
                    console.log(!Mentor[current_mentor].metee.includes(list_student[current_student]))
                    if (!Mentor[current_mentor].metee.includes(list_student[current_student])) {

                        Student_duplicate = 0;
                        console.log("if", Student_absent);
                        continue;
                    }
                    else {
                        Student_duplicate = 1
                        console.log("else", Student_absent)
                        break;
                    }
                }
                if (Student_duplicate) {
                    mentor_present = 1
                    res.send("student already present in list");
                    break;
                }
                else {
                    Mentor[current_mentor].metee.push(...req.body.metee)
                    res.send("data updated sucessfully");
                    mentor_present = 1
                    break;
                }

            }
            else {
                mentor_present = 0
                continue;
            }
        }
        if (mentor_present + 1 == 1) {

            res.send("Message : 'Mentor is not present in list")
        }
    }


})

app.listen(port, () => {

    console.log(`server is running on ${port}`)
})