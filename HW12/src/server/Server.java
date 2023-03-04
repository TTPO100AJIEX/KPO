package server;

import java.io.IOException;
import java.net.ServerSocket;

public class Server
{
    public static void main(String[] args) throws IOException
    {
        final ServerSocket server = new ServerSocket(80);
        final ClientsHolder clients = new ClientsHolder();
        while (true)
        {
            new Client(server.accept(), clients).start();
        }
    }
}
