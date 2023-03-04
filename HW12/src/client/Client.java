package client;

import java.io.IOException;
import java.net.Socket;

public class Client
{
    public static void main(String[] args) throws IOException, InterruptedException
    {
        final Socket client = new Socket("localhost", 80);
        Reader reader = new Reader(client, args[0]);
        Writer writer = new Writer(client, args[0]);
        reader.start(); writer.start();
        reader.join(); writer.join();
    }
}
