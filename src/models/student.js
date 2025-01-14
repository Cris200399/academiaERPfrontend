class Student {
    constructor(data) {
        if (data._id) {
            // Constructor for receiving JSON from backend
            this.id = data._id;
            this.name = data.name;
            this.lastName = data.lastName;
            this.address = data.address;
            this.email = data.email;
            this.gender = data.gender;
            this.dateOfBirth = this.formatDateOfBirth(data.dateOfBirth);
            this.phone = data.phone;
            this.group = data.group.name;
            this.dni = data.dni;
            this.guardian = data.guardian;
            this.age = this.calculateAge(data.dateOfBirth);
            this.profileImageId = data.profileImageId;
        } else {
            // Constructor for sending student to an endpoint
            this.name = data.name;
            this.lastName = data.lastName;
            this.address = data.address;
            this.email = data.email;
            this.gender = data.gender;
            this.dateOfBirth = data.dateOfBirth;
            this.phone = data.phone;
            this.group = data.group;
            this.dni = data.dni;
            this.guardian = data.guardian;
            this.profileImageId = data.profileImageId;
        }
    }

    // Method to get the full name of the student
    getFullName() {
        return `${this.name} ${this.lastName}`;
    }

    // Method to calculate the student's age
    calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    formatDateOfBirth(dateOfBirth) {
        return new Date(dateOfBirth).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
}

export default Student;