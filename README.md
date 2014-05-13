# RSS Demo

A simple code-less RSS viewer application


# Dependencies
All dependencies are checked into the application's node_modules directory.
The `ng-rss` dependency probably needs to be installed manaually by unpacking
a copy of it into the node_modules directory; npm install will run out of memory
if told to install it.

NOTE when updating montage, there is a patch that has bene manually applied to
FRB for the time being, you will need to cherry pick
7afab51e1a11fed7008f83807c4828678df16dd7
after updating montage.