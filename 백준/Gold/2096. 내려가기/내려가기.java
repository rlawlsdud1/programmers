import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());

        int[][] info = new int[N][3];
        for (int i = 0; i < N; i++) {
            String[] tokens = br.readLine().split(" ");
            for (int j = 0; j < 3; j++) {
                info[i][j] = Integer.parseInt(tokens[j]);
            }
        }

        int[] curMax = Arrays.copyOf(info[0], 3);
        int[] curMin = Arrays.copyOf(info[0], 3);

        for (int i = 1; i < N; i++) {
            int[] nextMax = Arrays.copyOf(info[i], 3);
            int[] nextMin = Arrays.copyOf(info[i], 3);

            for (int j = 0; j < 3; j++) {
                int maxVal = 0;
                int minVal = Integer.MAX_VALUE;

                for (int k = Math.max(0, j - 1); k <= Math.min(2, j + 1); k++) {
                    maxVal = Math.max(maxVal, curMax[k]);
                    minVal = Math.min(minVal, curMin[k]);
                }

                nextMax[j] += maxVal;
                nextMin[j] += minVal;
            }

            curMax = nextMax;
            curMin = nextMin;
        }

        int maxAnswer = Arrays.stream(curMax).max().getAsInt();
        int minAnswer = Arrays.stream(curMin).min().getAsInt();
        System.out.println(maxAnswer + " " + minAnswer);
    }
}
