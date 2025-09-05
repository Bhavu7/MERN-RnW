#include <stdio.h>

int main() {
    int i, n;
    int arr[n];

    // Get array size from the user
    printf("Enter the array size : ");
    scanf("%d", &n);

    // Get array elements from the user
    printf("Enter %d elements for the array:\n", n);
    for (i = 0; i < n; i++) {
        printf("Enter element %d: ", i + 1);
        scanf("%d", &arr[i]);
    }

    // print negative elements
    printf("\nNegative elements in the array are : ");
    int neg = 0;

    // check each element of array
    for (i = 0; i < n; i++) {
        if (arr[i] < 0) {
        	// Print the negative element
            printf("%d ", arr[i]);
            neg = 1;
        }
    }

    // If no negative numbers found
    if (neg == 0) {
        printf("None");
    }

    printf("\n");

    return 0;
}
