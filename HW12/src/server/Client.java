package server;

import java.io.BufferedReader;
import java.io.DataOutput;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

public class Client extends Thread
{
    private Socket socket;
    private ClientsHolder clients;
    private String name = "Unknown";
    private BufferedReader in;
    private DataOutput out;
    public Client(Socket client, ClientsHolder clients)
    {
        try
        {
            this.clients = clients;
            this.socket = client;
            this.in = new BufferedReader(new InputStreamReader(this.socket.getInputStream()));
            this.out = new DataOutputStream(client.getOutputStream());
            this.clients.add(this);
        } catch(IOException err) { }
    }
    public boolean isOpened() { return !this.socket.isInputShutdown(); }
    
    @Override
    public void run()
    {
        try
        {
            this.name = this.in.readLine();
            this.clients.send(this.name + " joined");
            while (true)
            {
                String message = this.in.readLine();
                if (message == null) break;
                this.clients.send(this.name + ": " + message);
                try { Thread.sleep(1000); } catch(Exception e) { }
            }
        } catch(IOException err) { }
    }

    public void send(String message) throws IOException
    {
        this.out.writeBytes(message + "\n");
    }
}
