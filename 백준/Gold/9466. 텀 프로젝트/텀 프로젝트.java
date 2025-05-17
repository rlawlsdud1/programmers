import java.io.*;
import java.util.*;

public class Main {
    static Map<Integer, Integer> adjacantList;
    static Set<Integer> visited;
    static Set<Integer> cycle;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int T = Integer.parseInt(br.readLine());
        List<String> info = new ArrayList<>();

        for (int i = 0; i < 2 * T; i++) {
            info.add(br.readLine().trim());
        }

        int idx = 0;
        for (int t = 0; t < T; t++) {
            int n = Integer.parseInt(info.get(idx++));
            String[] relationStr = info.get(idx++).split(" ");
            int[] relations = new int[n];
            for (int i = 0; i < n; i++) {
                relations[i] = Integer.parseInt(relationStr[i]);
            }

            adjacantList = new HashMap<>();
            for (int i = 0; i < n; i++) {
                adjacantList.put(i + 1, relations[i]);
            }

            visited = new HashSet<>();
            cycle = new HashSet<>();

            for (int j = 1; j <= n; j++) {
                if (!visited.contains(j)) {
                    List<Integer> path = new ArrayList<>();
                    visited.add(j);
                    dfs(j, path);
                }
            }

            System.out.println(n - cycle.size());
        }
    }

    static void dfs(int node, List<Integer> path) {
        path.add(node);
        int next = adjacantList.get(node);

        if (!visited.contains(next)) {
            visited.add(next);
            dfs(next, path);
        } else {
            if (path.contains(next)) {
                int idx = path.indexOf(next);
                List<Integer> nodeOfCycle = path.subList(idx, path.size());
                cycle.addAll(nodeOfCycle);
            }
        }
    }
}
