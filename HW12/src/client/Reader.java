package client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

public class Reader extends Thread
{
    BufferedReader stream;
    Socket socket;
    String name;
    Reader(Socket client, String name) throws IOException
    {
        this.name = name;
        this.socket = client;
        this.stream = new BufferedReader(new InputStreamReader(client.getInputStream()));
    }

    @Override
    public void run()
    {
        while (true)
        {
            try { System.out.println(this.stream.readLine()); } catch(IOException err) { }
        }
    }
}
