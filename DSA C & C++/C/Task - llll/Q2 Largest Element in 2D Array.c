#include <stdio.h>

int main() {
    int i, j, rows, cols;

    // Get array size from the user
    printf("Enter the number of rows : ");
    scanf("%d", &rows);
    printf("Enter the number of columns : ");
    scanf("%d", &cols);

    int arr[rows][cols];

    // Get array elements from the user
    printf("\nEnter elements of the array:\n");
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            printf("Enter element at position [%d][%d]: ", i, j);
            scanf("%d", &arr[i][j]);
        }
    }

    // Find the largest element
    if (rows <= 0 || cols <= 0) {
        printf("\nCannot find largest element in an array.\n");
        // error or no largest element
        return 1;
    }

    int largest = arr[0][0];

    // Loop to find the largest element
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            if (arr[i][j] > largest) {
            	// Update 'largest' if a bigger element is found
                largest = arr[i][j];
            }
        }
    }

    // Print the largest element
    printf("\nThe largest element in the array is: %d\n", largest);

    return 0;
}
