const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'https://9da1aec4946d46408d71c5af0b5db4e0.centralindia.azure.elastic-cloud.com:9243',
    auth: {
        apiKey: 'WGhiRTBZNEJEbzlxSXFsWkFIc2s6aGo3ckRtZWRSWWVlRnVPOGkyMC1vZw'
    }
});

const solve = async () => {
    
    const resp = await client.info();

    console.log(resp);

    const dataset = [
        { "index": { "_id": "1" } },
        { "image-vector": [1, 5, -20], "title-vector": [12, 50, -10, 0, 1], "title": "moose family", "file-type": "jpg" },
        { "index": { "_id": "2" } },
        { "image-vector": [42, 8, -15], "title-vector": [25, 1, 4, -12, 2], "title": "alpine lake", "file-type": "png" },
        { "index": { "_id": "3" } },
        { "image-vector": [15, 11, 23], "title-vector": [1, 5, 25, 50, 20], "title": "full moon", "file-type": "jpg" },
    ];

    const result = await client.helpers.bulk({
        datasource: dataset,
        pipeline: "ent-search-generic-ingestion",
        onDocument: (doc) => ({ index: { _index: 'images' }}),
    });

    console.log(result);

}

const search = async () => {
    const res = await client.search({
        "knn": {
          "field": "image-vector",
          "query_vector": [-5, 9, -12],
          "k": 1,
          "num_candidates": 100
        },
        "fields": [ "title", "file-type" ]
    })

    console.log(res.hits.hits)
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
//   solve();
  search();
});
