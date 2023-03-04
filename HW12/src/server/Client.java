package server;

import java.io.BufferedReader;
import java.io.DataOutput;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

public class Client extends Thread
{
    private Socket client;
    private ClientsHolder clients;
    private String name = "Unknown";
    private BufferedReader in;
    private DataOutput out;
    public Client(Socket client, ClientsHolder clients)
    {
        try
        {
            this.clients = clients;
            this.client = client;
            this.in = new BufferedReader(new InputStreamReader(this.client.getInputStream()));
            this.out = new DataOutputStream(client.getOutputStream());
            this.clients.add(this);
        } catch(IOException err) { }
    }
    
    @Override
    public void run()
    {
        try
        {
            this.name = this.in.readLine();
            this.clients.send(this.name + " joined");
            while (true) this.clients.send(this.name + ": " + this.in.readLine());
        } catch(IOException err) { }
    }

    public void send(String message) throws IOException
    {
        this.out.writeBytes(message + "\n");
    }
}
