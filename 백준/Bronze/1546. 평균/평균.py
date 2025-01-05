import sys
N = int(sys.stdin.readline())
scores = [int(i) for i in sys.stdin.readline().split()]

max_score = max(scores)
# print(max_score)
sum = 0
for i in scores:
    sum += i
    
print((sum * 100) / (N*max_score))