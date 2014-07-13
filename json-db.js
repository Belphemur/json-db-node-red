/**
 * Copyright 2014 Antoine Aflalo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function (RED) {
    "use strict";
    var fs = require("fs");
    var JsonDB = require("node-json-db");

    function JsonDBCollection(n) {
        RED.nodes.createNode(this, n);
        this.db = new JsonDB("JsonDB_" + n.collection, n.save);

        this.on("close", function () {
            this.db.save(true);
        });
    }

    RED.nodes.registerType("json-db-collection", JsonDBCollection);

    function DataIn(n) {
        RED.nodes.createNode(this, n);
        /**
         * @var JsonDB
         */
        this.collection = RED.nodes.getNode(n.collection);
        this.dataPath = n.path;
        this.override = !n.update;
        var node = this;

        this.on("input", function (msg) {
            var path = msg.datapath || node.dataPath;
            try {
                node.collection.db.push(path, msg.payload, node.override);
            } catch (error) {
                node.error(error);
            }
        });

    }

    RED.nodes.registerType("DataIn", DataIn);


    function DataOut(n) {
        RED.nodes.createNode(this, n);
        /**
         * @var JsonDB
         */
        this.collection = RED.nodes.getNode(n.collection);
        this.dataPath = n.path;
        this.sendError = n.error;
        var node = this;

        this.on("input", function (msg) {
            var path = msg.datapath || node.dataPath;
            try {
                var data = node.collection.db.getData(path);
                msg.payload = data;
                node.send(msg);
            } catch (error) {
                node.error(error);
                if (node.sendError) {
                    msg.error = error;
                    node.send(msg);
                }
            }
        });

    }

    RED.nodes.registerType("DataOut", DataOut);

}

