package server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.CopyOnWriteArrayList;

public class ClientsHolder
{
    // private CopyOnWriteArrayList<Client> clients = new CopyOnWriteArrayList<Client>();
    private ArrayList<Client> clients = new ArrayList<Client>();
    public synchronized void add(Client client)
    {
        this.clients.add(client);
    }
    private synchronized void remove(Client client)
    {
        client.interrupt();
        this.clients.remove(client);
    }

    public synchronized void send(String message)
    {
        for (Client client : this.clients)
        //for (int i = 0; i < this.clients.size(); i++)
        {
            // Client client = this.clients.get(i);
            try
            {
                client.send(message);
            }
            catch(IOException err)
            {
                this.remove(client);
                //i--;
            }
        }
    }
}
