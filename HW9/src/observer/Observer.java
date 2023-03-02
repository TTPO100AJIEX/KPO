package observer;

public class Observer
{
    public static void main(String[] args)
    {
        Console console = new Console();

        Player[] players = { new Player("Player 1"), new Player("Player 2"), new Player("Player 3") };
        Journalist[] journalists = { new Journalist("Journalist 1"), new Journalist("Journalist 2"), new Journalist("Journalist 3") };
        Developer[] developers = { new Developer("Developer 1"), new Developer("Developer 2"), new Developer("Developer 3") };

        for (Player player : players) player.observe(console);
    }
}