// src/models/student.js

class Student {
    constructor({id = null, name, lastName, address, email, gender, dateOfBirth, phone, group, dni}) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.phone = phone;
        this.group = group;
        this.dni = dni;
    }

    // Method to get the full name of the student
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Method to get the student's age
    getAge() {
        const today = new Date();
        const birthDate = new Date(this.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDay() < birthDate.getDay())) {
            age--;
        }
        return age;
    }


}

export default Student;