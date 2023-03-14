// Multiple copies may exist
class Visitor
{
    constructor() { }
    start() { }

    get_menu() { } // Asks the manager for the menu, waits for the response and calls choose_from_menu
    choose_from_menu() { } // Takes some time to read the menu and choose one or more items from it. When done, calls place_order
    place_order() { } // Calls the manager to create an order
};