#include <stdio.h>

int main() {
    int i, j, rows, cols, targetRow, targetCol;

    // Get Array's Rows and Columns
    printf("Enter the array's row size: ");
    scanf("%d", &rows);
    printf("Enter the array's column size: ");
    scanf("%d", &cols);

    // Declare Array 
    int arr[rows][cols];

    // Populate Array
    printf("Enter array's elements:\n");
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            printf("a[%d][%d]: ", i, j);
            scanf("%d", &arr[i][j]);
        }
    }

    // Get Row Number
    printf("\nEnter row number (0 to %d): ", rows - 1);
    scanf("%d", &targetRow);

    // Calculate and Print Row Sum
    int rowSum = 0;
    printf("Elements of row %d: ", targetRow);
    for (j = 0; j < cols; j++) {
        printf("%d", arr[targetRow][j]);
        rowSum += arr[targetRow][j];
        if (j < cols - 1) {
            printf(", ");
        }
    }
    printf("\nThe sum of row %d: %d\n", targetRow, rowSum);

    // Get Column Number
    printf("\nEnter column number (0 to %d): ", cols - 1);
    scanf("%d", &targetCol);

    // Calculate and Print Column Sum
    int colSum = 0;
    printf("Elements of column %d: ", targetCol);
    for (i = 0; i < rows; i++) {
        printf("%d", arr[i][targetCol]);
        colSum += arr[i][targetCol];
        if (i < rows - 1) {
            printf(", ");
        }
    }
    printf("\nThe sum of column %d: %d\n", targetCol, colSum);

    return 0;
}
