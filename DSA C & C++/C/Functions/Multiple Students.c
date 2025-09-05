#include <stdio.h>

// Function Declarations
void inputStudent(char name[], int *roll, float marks[], int subjects);
float calculateAvg(float marks[], int subjects);
char calculateGrade(float avg);
void displayStudents(char name[], int roll, float marks[], int subjects, float avg, char grade);

int main() {
    int totalStudents, subjects, i;

    printf("===========================================\n");
    printf("         STUDENT REPORT GENERATOR   \n");
    printf("===========================================\n\n");

    printf("Enter number of students: ");
    scanf("%d", &totalStudents);

    printf("Enter number of subjects: ");
    scanf("%d", &subjects);

    // Declare dynamic-sized arrays based on input
    char names[totalStudents][50];
    int rolls[totalStudents];
    float marks[totalStudents][subjects];
    float averages[totalStudents];
    char grades[totalStudents];

    // Input for each student
    for (i = 0; i < totalStudents; i++) {
        printf("\n--- Entering details for Student %d ---\n", i + 1);
        inputStudent(names[i], &rolls[i], marks[i], subjects);
        averages[i] = calculateAvg(marks[i], subjects);
        grades[i] = calculateGrade(averages[i]);
    }

    // Display each student's report
	for (i = 0; i < totalStudents; i++) {
    	displayStudents(names[i], rolls[i], marks[i], subjects, averages[i], grades[i]);

    	// separator between reports
    	if (i < totalStudents - 1) {
//        	// small pause between reports
//        	Sleep(1000);
    	}
	}
    return 0;
}

// Input student details
void inputStudent(char name[], int *roll, float marks[], int subjects) {
	int i;
    printf("Enter the student name: ");
    scanf("%s", name);

    printf("Enter the roll number: ");
    scanf("%d", roll);

    for (i = 0; i < subjects; i++) {
        printf("Enter marks for subject %d: ", i + 1);
        scanf("%f", &marks[i]);
    }
}

// Calculate average of marks
float calculateAvg(float marks[], int subjects) {
	int i;
    float sum = 0;
    for (i = 0; i < subjects; i++) {
        sum += marks[i];
    }
    return sum / subjects;
}

// Grade logic
char calculateGrade(float avg) {
    if (avg >= 90) return 'A';
    else if (avg >= 75) return 'B';
    else if (avg >= 60) return 'C';
    else if (avg >= 55) return 'D';
    else return 'F';
}

// Display student report
void displayStudents(char name[], int roll, float marks[], int subjects, float avg, char grade) {
	int i;
    printf("\n\n   Generating Student Report   \n\n");
    Sleep(800);

    printf("===========================================\n");
    printf("|               STUDENT REPORT            |\n");
    printf("===========================================\n");
    printf("| Name      : %-28s|\n", name);
    printf("| Roll No.  : %-28d|\n", roll);
    printf("| Marks     : ");
    for (i = 0; i < subjects; i++) {
        printf("%-6.2f ", marks[i]);
    }
    printf("|\n");
    printf("| Average   : %-28.2f|\n", avg);
    printf("| Grade     : %-28c|\n", grade);
    printf("===========================================\n");

    if (grade == 'F') {
        printf("\n  Status: Better Luck Next Time!\n");
    } else {
        printf("\n  Status: Passed Successfully!\n");
    }

    printf("===========================================\n\n");
}
