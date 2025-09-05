#include <stdio.h>

int main() {
    int x = 5, y = 10;
    
    int *p = &x;
    int *q = &y;
    
    printf("%d\n",*p);
    printf("%d\n",*q);

    printf("Before swap: x = %d, y = %d\n", x, y);

    // Swap using arithmetic
    *p = *p + *q;
    *q = *p - *q;
    *p = *p - *q;

    printf("After swap: x = %d, y = %d\n", x, y);

    return 0;
}
