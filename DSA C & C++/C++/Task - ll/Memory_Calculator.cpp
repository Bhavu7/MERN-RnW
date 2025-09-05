#include <iostream>
#include <vector>
#include <string>
using namespace std;

template <typename T>
class MemoryCalculate {

private:
    T id;
    string name;

public:
    // student with ID and Name
    MemoryCalculate(T id, string name) {
        this->id = id;
        this->name = name;
    }

    // Getter for ID
    T getId() const {
        return id;
    }

    // Display details of the student
    void display() const {
        cout << "ID: " << id << " | Name: " << name << endl;
    }
};


class StudentManagementSystem {
private:
	// Store all students in a vector(Dynamic Memory)
    vector<MemoryCalculate<int>> students;

public:
    // Add student to the list
    void addStudent(int id, string name) {
        students.push_back(MemoryCalculate<int>(id, name));
        cout << "Student added successfully.\n";
    }

    // Display all students
    void displayAllStudents() const {
        if (students.empty()) {
            cout << "No students available.\n";
            return;
        }

        cout << "\n--- Student List ---\n";
        for (const auto& student : students) {
            student.display();
        }
    }

    // Remove student by ID
    void removeStudentById(int id) {
        for (auto it = students.begin(); it != students.end(); ++it) {
            if (it->getId() == id) {
            	// Remove the student from vector
                students.erase(it);
                cout << "Student with ID " << id << " removed.\n";
                return;
            }
        }
        cout << "Student with ID " << id << " not found.\n";
    }

    // Search student by ID
    void searchStudentById(int id) const {
        for (const auto& student : students) {
            if (student.getId() == id) {
                cout << "Student found: ";
                student.display();
                return;
            }
        }
        cout << "Student with ID " << id << " not found.\n";
    }
};


int main() {
    StudentManagementSystem sms;
    int choice, id;
    string name;

    while (true) {
        // Menu for user choice
        cout << "\n===== Student Management Menu =====\n";
        cout << "1. Add Student\n";
        cout << "2. Display All Students\n";
        cout << "3. Remove Student by ID\n";
        cout << "4. Search Student by ID\n";
        cout << "5. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
        case 1:
        	// Get input from user
            cout << "Enter Student ID: ";
            cin >> id;
            cin.ignore(); // Clear buffer before getline
            cout << "Enter Student Name: ";
            getline(cin, name);
            sms.addStudent(id, name);
            break;

        case 2:
        	// Display Total Students
            sms.displayAllStudents();
            break;

        case 3:
        	// Remove Student Using Specific ID
            cout << "Enter Student ID to remove: ";
            cin >> id;
            sms.removeStudentById(id);
            break;

        case 4:
        	// Search Student Using Specific ID
            cout << "Enter Student ID to search: ";
            cin >> id;
            sms.searchStudentById(id);
            break;

        case 5:
        	// Exit The Program
            cout << "Exiting program. Goodbye!\n";
            return 0;

        default:
        	// Validation For User Choice
            cout << "Invalid choice. Please try again.\n";
        }
    }
}
