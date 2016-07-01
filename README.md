Movie Search with Solr
-------------------------

## Prerequisites

1. Solr 5.5.0
2. NodeJS

## Run

1. Install [Solr](http://www.apache.org/dyn/closer.lua/lucene/solr/6.1.0)
2. Create a core - `bin/solr create -c movies`
3. Upload the data to Solr - `bin/post -c movies movies.json`
4. Change schema file with the one in this repo - [managed-schema](https://github.com/mertkahyaoglu/movie-search/blob/master/managed-schema)
5. Start solr - `bin/solr start`
6. Start NodeJS development server - `npm run dev`
