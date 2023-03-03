package multithreading;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Test {
    
    private static List<String> data = Arrays.asList(
            "aa", "bbb", "c", "d", "aa", "bbb", "c", "d", "aa", "bbb", "c", "d", "aa", "bbb", "c", "d",
            "aa", "bbb", "c", "d", "aa", "bbb", "c", "d", "aa", "bbb", "c", "d", "aa", "bbb", "c", "d",
            "aa", "bbb", "c", "d", "aa", "bbb", "c", "d", "aa", "bbb", "c", "d", "aa", "bbb", "c", "d",
            "aa", "bbb", "c", "d", "aa", "bbb", "c", "d", "aa", "bbb", "c", "d", "aa", "bbb", "c", "d");

    public static void main(String[] args)
    {
        System.out.println(doParallelWork(data));
        ArrayList<String> test = new ArrayList<>();
        for (int i = 0; i < 1e8; i++)
        {
            test.add("abc");
        }
        System.out.println(doParallelWork(test));
    }
    

    static class Solver extends Thread
    {
        private Integer answer;
        private Integer _start, _end;
        private List<String> _data;
        public Solver(List<String> data, Integer start, Integer end)
        {
            this.answer = 0;
            this._data = data;
            this._start = start;
            this._end = end;
        }

        @Override
        public void run()
        {
            for (Integer i = this._start; i < this._end; i++) this.answer += this._data.get(i).length();
        }

        public Integer getAnswer() { return this.answer; }
    };
    public static Integer doParallelWork(List<String> data)
    {
        int numThreads = 3;
        ArrayList<Solver> solvers = new ArrayList<Solver>();
        for (int i = 0; i < numThreads; i++)
        {
            solvers.add(new Solver(data, i * data.size() / numThreads, (i + 1) * data.size() / numThreads));
            solvers.get(solvers.size() - 1).start();
        }
        Integer ans = 0;
        try
        {
            for (int i = 0; i < numThreads; i++)
            {
                solvers.get(i).join();
                ans += solvers.get(i).getAnswer();
            }
        } catch(Exception err) { return 0; }
        return ans;
    }
}