// Only one copy may exist
class Menu
{
    constructor() { }
    start() { }

    update() { } // Calls the storage to get the list of available products and removes unavailable items from the list
    give() { } // Updates the menu if needed and responds with a list of dishes
};