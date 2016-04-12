[![NPM](https://nodei.co/npm/json-db-node-red.png?downloads=true)](https://nodei.co/npm/json-db-node-red/)

json-db-node-red
================

Node-RED Node to store/retrieve easily information stored into .json file. A Lazy-caching is implemented to only load the collection when needed. Moreover it's possible to configure the collection to only write in the json file when Node-RED is stopped or a flow is redeployed.
Nodes
------
###DataIn
The DataIn node is used to store information into the chosen collection. You select which collection you want to use and the path to the object. The path can be overridden with the msg.datapath. The msg.payload will contain the data you want to store.

###DataOut
The DataOut node is used to retrieve the information from the chosen collection. As for the DataIn node you configure which collection you want to use and the path where the data you need are stored. The path can also be overridden with msg.datapath. The msg.payload will be the object representing the stored datas.

####Always send the message
In case you want a message to still be processed in case of error, you can activate this in the DataOut node.
The Message won't be changed, and a **msg.error** will be added containing the error. 
If you activate the Status, you'll also see the error message.

## Examples
Node-RED should import in the library the example flow that looks like this:

[![Example Flow](http://i.imgur.com/nRqAS6I.jpg)]
