#include <stdio.h>

int main() {
    int rows, cols, i, j;

    // Get input from the user
    printf("Enter the number of rows : ");
    scanf("%d", &rows);
    printf("Enter the number of columns : ");
    scanf("%d", &cols);

    // original matrix
    int original[rows][cols];

    // Get elements of the matrix from the user
    printf("\nEnter elements of the original matrix:\n");
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            printf("Enter element at position [%d][%d]: ", i, j);
            scanf("%d", &original[i][j]);
        }
    }

    // transpose matrix
    int transpose[cols][rows];

    // Calculate the transpose
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            transpose[j][i] = original[i][j];
        }
    }

    // Print the transposed matrix
    printf("\nTranspose Matrix:\n");
    // Loop through rows
    for (i = 0; i < cols; i++) {
    	// Loop through columns
        for (j = 0; j < rows; j++) {
            printf("%d\t", transpose[i][j]);
        }
        printf("\n");
    }

    return 0;
}
