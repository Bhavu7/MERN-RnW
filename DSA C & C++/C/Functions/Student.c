#include <stdio.h>
#include <windows.h> // for Sleep() in milliseconds

// Function Declarations
void inputStudent(char name[], int *roll, float marks[]);
float calculateAvg(float marks[]);
char calculateGrade(float avg);
void displayStudents(char name[], int roll, float marks[], float avg, char grade);
void loadingAnimation();

int main() {
    char name[50];
    int roll;
    float marks[3];
    float avg;
    char grade;

    system("cls"); // clear console
    printf("===========================================\n");
    printf("         STUDENT REPORT GENERATOR   \n");
    printf("===========================================\n\n");

    loadingAnimation();

    inputStudent(name, &roll, marks);
    avg = calculateAvg(marks);
    grade = calculateGrade(avg);
    displayStudents(name, roll, marks, avg, grade);

    return 0;
}

// Simulated loading animation
void loadingAnimation() {
	int i;
    printf("Loading");
    for ( i = 0; i < 5; i++) { 
        Sleep(300); // delay 300 ms
        printf(".");
    }
    printf("\n\n");
}

// Input student details
void inputStudent(char name[], int *roll, float marks[]) {
    int i;
    printf("Enter the student name: ");
    scanf("%s", name);

    printf("Enter the roll number: ");
    scanf("%d", roll);

    for (i = 0; i < 3; i++) {
        printf("Enter marks for subject %d: ", i + 1);
        scanf("%f", &marks[i]);
    }
}

// Calculate average of marks
float calculateAvg(float marks[]) {
	int i;
    float sum = 0;
    for (i = 0; i < 3; i++) {
        sum += marks[i];
    }
    return sum / 3;
}

// Calculate grade based on average
char calculateGrade(float avg) {
    if (avg >= 90) return 'A';
    else if (avg >= 75) return 'B';
    else if (avg >= 60) return 'C';
    else if (avg >= 55) return 'D';
    else return 'F';
}

// Display student report with formatting
void displayStudents(char name[], int roll, float marks[], float avg, char grade) {
    system("cls");
    printf("\n\n?? Generating Student Report ??\n\n");
    Sleep(800);  // short delay for animation effect

    printf("===========================================\n");
    printf("|               STUDENT REPORT            |\n");
    printf("===========================================\n");
    printf("| Name      : %-28s |\n", name);
    printf("| Roll No.  : %-28d |\n", roll);
    printf("| Marks     : %-6.2f %-6.2f %-6.2f         |\n", marks[0], marks[1], marks[2]);
    printf("| Average   : %-28.2f |\n", avg);
    printf("| Grade     : %-28c |\n", grade);
    printf("===========================================\n");

    if (grade == 'F') {
        printf("\n Status: Better Luck Next Time!\n");
    } else {
        printf("\n Status: Passed Successfully!\n");
    }

    printf("===========================================\n\n");
}
