package client;

import java.io.DataOutput;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.util.Scanner;

public class Writer extends Thread
{
    DataOutput stream;
    Socket socket;
    String name;
    Writer(Socket client, String name) throws IOException
    {
        this.name = name;
        this.socket = client;
        this.stream = new DataOutputStream(client.getOutputStream());
    }

    @Override
    public void run()
    {
        try { this.stream.writeBytes(this.name + "\n"); } catch(IOException err) { }
        Scanner scanner = new Scanner(System.in);
        while (true)
        {
            try { this.stream.writeBytes(scanner.nextLine() + "\n"); } catch(IOException err) { }
        }
    }
}
