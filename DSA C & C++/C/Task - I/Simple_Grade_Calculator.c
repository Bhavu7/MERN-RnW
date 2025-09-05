#include <stdio.h>

int main() {
    int score;
    char grade;
    
    // Input score from user
    printf("Enter your score : ");
    scanf("%d", &score);
    
    // Determine grade based on score using ternary operators
    grade = (score >= 90) ? 'A' :
            (score >= 80) ? 'B' :
            (score >= 70) ? 'C' :
            (score >= 60) ? 'D' :
            (score >= 50) ? 'E' : 'F';
    
    // Print the calculated grade
    printf("Your Grade is %c. ", grade);
    
    // Printing comments using switch statement based on grade
    switch(grade) {
    	
    	// Top score
        case 'A':
            printf("Excellent Work!\n");
            break;
            
        // Very good score
        case 'B':
            printf("Well Done.\n");
            break;
            
        // Good Job
        case 'C':
            printf("Good Job.\n");
            break;
            
        // Needs Improvement
        case 'D':
            printf("Needs Improvement.\n");
            break;
            
		// Need Hard Work        
        case 'E':
            printf("You Passed, But You Could Do Better.\n");
            break;
        
         // Fail case
        case 'F':
            printf("Sorry, You Failed.\n");
    }
    
    // Check eligibility for next level based on grade
    if(grade == 'A' || grade == 'B' || grade == 'C' || grade == 'D') {
        printf("Congratulations! You are eligible for the next level.");
    } else {
        printf("Please try again next time.");
    }
}

