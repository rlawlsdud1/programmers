import sys
import math

def is_prime(number):
    if number == 1:
        return False
    if number == 2:
        return True
    for i in range(2, int(math.sqrt(number)) + 1):
        if number % i == 0:
            return False
    return True

N = int(sys.stdin.readline())

def BT(num, count):
    if count == N:
        print(num)
        return
    
    for i in range(1, 10, 2): 
        temp = num * 10 + i
        if is_prime(temp):
            BT(temp, count + 1)

BT(2, 1)
BT(3, 1)
BT(5, 1)
BT(7, 1)